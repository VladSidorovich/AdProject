<template>
<div>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="(ad,i) in promoAds"
            :key="i"
            :src="ad.imageSrc"
          >
          <div class="car-link">
            <v-btn color="error" :to="'/ad/' + ad.id"> description </v-btn>
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 xl4 v-for="(ad,i) in ads" :key="i">
        <v-card>
          <v-img :src="ad.imageSrc" height="200px"> </v-img>
          <v-card-title>
            <div>
              <h3 class="headline mb-0"> {{ad.title}}</h3>
              <div>{{ad.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
            <v-btn color="primary">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    }
  }
}
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-radius: 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
</style>
