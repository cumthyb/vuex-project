import Vue from 'vue'
import Vuex from './vuex'
// import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    myAge(state) {
      return state.age + 18
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload
    },
    syncMinux(state, payload) {
      state.age -= payload
    }
  },
  actions: {
    asyncMinus({ commit }, payload) {
      Promise.resolve({
        then: () => commit('syncMinux', payload)
      })
    }
  },
  modules: {
  }
})

