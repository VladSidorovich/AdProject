export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'Hello, i am description',
        promo: true,
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
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd ({ commit }, payload) {
      payload.id = Math.random().toString()
      commit('createAd', payload)
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => state.ads.find(ad => ad.id === adId)
    }
  }
}
