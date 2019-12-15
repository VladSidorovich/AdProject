<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3"> Create new ad </h1>
        <v-form ref="form" v-model="valid" validation>
          <v-text-field
            label="Add title"
            name="title"
            :rules="[v => !!v || 'Title is required']"
            v-model="title"
            type="text" />
          <v-textarea
            label="Add description"
            name="description"
            :rules="[v => !!v || 'Description is required']"
            v-model="description"
            type="text"
            multi-line
          />
          <v-layout>
            <v-flex class="mb-3">
              <v-btn color="warning">
                upload
                <v-icon right> cloud_upload</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex >
              <img height="100px" src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex >
              <v-switch
                color="primary"
                v-model="switch1"
                label="Add to promo?"
                :rules="[v => !!v || 'should be true']"
              ></v-switch>
            </v-flex>
          </v-layout>
           <v-layout>
            <v-flex >
             <v-spacer />
             <v-btn :disabled="!valid" class="success" @click="createAd"> Create ad</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: '',
    title: '',
    description: '',
    switch1: false
  }),
  methods: {
    createAd () {
      const ad = {
        title: this.title,
        description: this.description,
        promo: this.switch1,
        imageSrc: 'https://bipbap.ru/wp-content/uploads/2017/08/16.jpg'
      }
      this.$store.dispatch('createAd', ad)
    }
  }
}
</script>
