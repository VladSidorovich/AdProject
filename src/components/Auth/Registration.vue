<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" xs="12">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registration</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                label="Email"
                name="email"
                :rules="emailRules"
                v-model="email"
                prepend-icon="person"
                type="text" />
              <v-text-field
                :counter="6"
                label="Password"
                name="password"
                :rules="passwordRules"
                v-model="password"
                prepend-icon="lock"
                type="password"
              />
              <v-text-field
                :counter="6"
                label="Confirm password"
                name="confirmPassword"
                :rules="confirmPasswordRules"
                v-model="confirmPassword"
                prepend-icon="lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="!valid || loading" @click="onSubmit" :loading="loading">Create Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  mounted () {
    this.valid = false
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'E-mail is required',
        v => v === this.password || 'Passwords should match'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => this.$router.push('/'))
      }
    }
  }
}
</script>
