import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    user: {
      first_name: 'Jon',
      last_name: 'Snow',
      email: 'jon@snow.com'
    },
    cart: [],
  },
  mutations: {
    // Cart
    ADD_PRODUCT(state, payload) {
      const existingProduct = state.cart.find(o => o.id === payload.id)

      if (existingProduct) {
        existingProduct.qty += 1
      } else {
        payload.qty = 1
        state.cart.push(payload);
      }
    },

    REMOVE_PRODUCT(state, payload) {
      const existingProduct = state.cart.find(o => o.id === payload.id)

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1
      } else {
        const idx = state.cart.findIndex(o => o.id === payload.id)
        state.cart.splice(idx, 1)
      }
    },

    // User
    SAVE_FIRST_NAME(state, name) {
      state.user.first_name = name
    },

    SAVE_LAST_NAME(state, name) {
      state.user.last_name = name
    }
  },
  actions: {
    saveFirstName(context, payload) {
      context.commit('saveFirstName', payload)
    },
  },
  getters: {
    fullName(state) {
      return `${state.user.first_name} ${state.user.last_name}`
    }
  },

  modules: {
    users: {
      state: () => ({
        first_name: 'Dominando Vuex'
      }),
      mutations: {},
      actions: {},
      getters: {}
    },
    carrinho: {
      state: () => ({}),
      mutations: {},
      actions: {},
      getters: {}
    },
  }
})
