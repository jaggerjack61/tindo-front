import { createStore } from 'vuex'

export default createStore({
  state: {
    route:null,
    cart:[],
    cartCount:0
    
  },
  getters: {
  },
  mutations: {
    updateCount(state,count){
      state.cartCount = count;
    },
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
