import firebase from 'firebase/app'
import 'firebase/database'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    },
    updateOrder (state, payload) {
      const order = state.orders.find(o => {
        return o.id === payload
      })
      order.done = true
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (e) {
        commit('setError', e.message)
        throw e
      }
    },
    async fetchOrders ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')
      let resultOrders = []
      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.unshift(new Order(o.name, o.phone, o.adId, o.done, key))
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
        commit('setError')
      } catch (e) {
        commit('setLoading', false)
        commit('setError')
      }
    },
    async markOrderDone ({ commit, getters }, payload) {
      commit('clearError')

      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
        commit('updateOrder', payload)
      } catch (e) {
        commit('setError', e.message)
        throw e
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return state.orders
    }
  }
}
