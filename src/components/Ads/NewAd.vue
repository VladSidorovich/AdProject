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
              <v-btn color="warning" @click="triggerUpload">
                upload
                <v-icon right>cloud_upload</v-icon>
              </v-btn>
              <input
                ref='fileInput'
                type="file"
                style="display: none;"
                accept="image/*"
                @change="onFileChange"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex >
              <img height="100px" :src="imageSrc" v-if="imageSrc"/>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex >
              <v-switch
                color="primary"
                v-model="switch1"
                label="Add to promo?"
              ></v-switch>
            </v-flex>
          </v-layout>
           <v-layout>
            <v-flex >
             <v-spacer />
             <v-btn :disabled="!valid || !image || loading" :loading="loading" class="success" @click="createAd"> Create ad</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  data: () => ({
    valid: '',
    title: '',
    description: '',
    switch1: false,
    imageSrc: null,
    image: ''
  }),
  methods: {
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.switch1,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
