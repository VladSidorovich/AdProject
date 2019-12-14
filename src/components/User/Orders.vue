<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list subheader two-line flat >

            <v-list-item v-for="(order, i) in orders" :key="i">

                <v-list-item-action>
                  <v-checkbox
                    :input-value="order.done"
                    color="primary"
                    @change="markDone(order)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>order.name</v-list-item-title>
                  <v-list-item-subtitle>order.phone</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-spacer />
                  <v-btn color="primary" :to="'/ad/' + order.adId">Open</v-btn>
                </v-list-item-action>
            </v-list-item>

         </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    orders: [{
      id: '1',
      name: 'name',
      phone: '+375291234567',
      adId: '123',
      done: false
    }]
  }),
  methods: {
    markDone (order) {
      order.done = !order.done
    }
  }
}
</script>
