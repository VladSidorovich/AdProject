import firebase from 'firebase/app'
import 'firebase/database'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

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
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
        )
        const ad = await firebase.database().ref('ads').push(newAd)
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
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
