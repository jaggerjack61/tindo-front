import { createStore } from 'vuex'

export default createStore({
  state: {
    route:null,
    cart:null,
    cartCount:0,
    cartTotal:0,
    api:process.env.VUE_APP_BACKEND,
    assets:process.env.VUE_APP_ASSETS,
    user:null,

    
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
    },
    setUser(state, user) {
      state.user = user;
    },
    setCartTotal(state, total) {
      state.cartTotal = total;
    }
  },
  actions: {
  },
  modules: {
  }
})
