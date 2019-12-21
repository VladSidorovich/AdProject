<template>
  <v-dialog v-model="modal" width="400px">
    <template v-slot:activator="{ on }">
      <v-btn class="primary" text v-on="on"> Buy </v-btn>
    </template>
    <v-card >
      <v-container>
        <v-layout raw>
          <v-flex xs12>
            <v-card-title>
              <h2 class="text--primary"> Do you want to buy it? </h2>
            </v-card-title>
          </v-flex>
        </v-layout>
       <v-divider />
        <v-layout raw>
          <v-flex xs12>
            <v-card-text>
              <div class="text--primary">
                <v-text-field
                label="Your name"
                name="name"
                v-model="name"
                type="text" />
              </div>
              <div class="text--primary">
                <v-text-field
                label="Your phone"
                name="phone"
                v-model="phone"
                type="text" />
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider />
        <v-layout raw>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="onCancel" :disabled="localLoading"> Close </v-btn>
              <v-btn text class="success" @click="onSave" :disabled="localLoading"> Buy it! </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: '',
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    async onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        await this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.modal = false
          })
      }
    }
  }
}
</script>
