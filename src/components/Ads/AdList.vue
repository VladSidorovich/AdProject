<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3"> My ads </h1>
        <v-card class="elevation-10 mb-5" v-for="ad in ads" :key="ad.id">
          <v-layout row>
            <v-flex xs4>
              <v-img xs4 height="160px" :src="ad.imageSrc" />
            </v-flex>
            <v-flex xs8>
              <v-card-text> <h2 class="text--primary">{{ad.title}}
                </h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn class="info mr-4" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ads: [
      {
        title: 'First ad',
        description: 'Hello, i am description',
        promo: false,
        id: '1',
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
      },
      {
        title: 'Second',
        description: 'asdsad',
        promo: true,
        id: '2',
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
      },
      {
        title: 'Third',
        description: '1sdasd',
        promo: false,
        id: '3',
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
      },
      {
        title: 'Fourth',
        description: 'asdasd',
        promo: false,
        id: '4',
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      }
    ]
  })
}
</script>
