<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary"> {{ad.title}}</h1>
            <p>{{ad.description}}.</p>

            </v-card-text>
          <v-card-actions>
            <v-spacer />
            <EditAdModal :ad="ad" v-if="isOwner"/>
            <v-btn class="success"> Buy </v-btn>
          </v-card-actions>
        </v-card>
        <div v-else>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
  props: ['id'],
  components: {
    EditAdModal
  },
  computed: {
    ad () {
      return this.$store.getters.adById(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user
    }
  }
}
</script>
