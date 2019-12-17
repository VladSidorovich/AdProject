<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="link in links" :key="link.title" link :to="link.url">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon left>
           exit_to_app
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="'Logout'" />
      </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          Ad application
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down" v-for="link in links" :key="link.url" >
        <v-btn text :to="link.url">
         <v-icon left>
           {{link.icon}}
         </v-icon>
          {{link.title}}
        </v-btn>

      </v-toolbar-items>
      <v-toolbar-items v-if="isUserLoggedIn" class="hidden-sm-and-down">
        <v-btn text @click="onLogout">
          <v-icon left>
           exit_to_app
         </v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
      {{error}}
        <v-btn text dark @click="closeError">Close
        </v-btn>
      </v-snackbar>
    </template>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      if (this.$route.path !== '/') this.$router.push('/')
    }
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.name
    },
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
          { title: 'New ad', icon: 'note_add', url: '/new' },
          { title: 'My ads', icon: 'link', url: '/list' }
        ]
      } else {
        return [
          { title: 'Login', icon: 'lock', url: '/login' },
          { title: 'Registration', icon: 'face', url: '/registration' }
        ]
      }
    }
  },
  watch: {
    size (val) {
      if (val === 'lg') {
        setTimeout(() => {
          this.drawer = false
        }, 0)
      }
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer
  }
</style>
