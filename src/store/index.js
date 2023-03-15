import { createStore } from 'vuex'

export default createStore({
  state: {
    route:null,
    cart:[],
    
  },
  getters: {
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeLastFromCart(state) {
      state.cart.pop();
    },
    setRoute(state, route) {
      state.route = route;
    }
  },
  actions: {
  },
  modules: {
  }
})
