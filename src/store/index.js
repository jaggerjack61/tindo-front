import { createStore } from 'vuex'

export default createStore({
  state: {
    route:null,
    cart:null,
    cartCount:0
    
  },
  getters: {
  },
  mutations: {
    updateCount(state,count){
      state.cartCount = count;
    },
    addToCart(state, cart) {
      state.cart = cart;
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
