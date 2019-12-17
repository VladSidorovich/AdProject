<template>
  <v-dialog v-model="modal" width="400px">
    <template v-slot:activator="{ on }">
      <v-btn class="warning" text v-on="on"> Edit </v-btn>
    </template>
    <v-card >
      <v-container>
        <v-layout raw>
          <v-flex xs12>
            <v-card-title>
              <h2 class="text--primary"> Edit ad</h2>
            </v-card-title>
          </v-flex>
        </v-layout>
       <v-divider />
        <v-layout raw>
          <v-flex xs12>
            <v-card-text>
              <div class="text--primary">
                <v-text-field
                label="Title"
                name="title"
                v-model="editedTitle"
                type="text" />
              </div>
              <div class="text--primary">
                <v-text-field
                label="Description"
                name="description"
                v-model="editedDescription"
                multi-line
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
              <v-btn text @click="onCancel"> Cancel </v-btn>
              <v-btn text class="success" @click="onSave"> Save </v-btn>
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
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    }
  },
  methods: {
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })

        this.modal = false
      }
    }
  }
}
</script>
