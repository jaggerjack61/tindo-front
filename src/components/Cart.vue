<template>
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row my-2" v-for="item in $store.state.cart">
            <div class="col-3">
              <img :src="item.src" style="width:100%;"/>
            </div>
            <div class="col-5">
              <span> {{ item.name }}</span>
            </div>
            <div class="col-2">
              <span> ${{ item.price }}</span>
            </div>
            <div class="col-2">
              <span><a @click="removeItem(item.id)"><i class="bx bx-eraser"></i></a></span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-sm btn-primary">Check Out</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import store from "@/store";
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'Cart',
  data() {
    return {
      cpaintings: [],
      newCart: null,
      api: store.state
    }
  },
  mounted() {
    this.fetchPaintings();
    let cart = JSON.parse(localStorage.getItem('cartTindo'));
    if(cart) {
      toast.warning('here 1.', {autoClose: 5000});
      cart.forEach((item) => {
        if (!(this.cpaintings.some(obj => obj.id === item.id))) {
          console.log(obj);
          this.newCart = cart.filter(subItem => {
            return subItem.id !== item.id;
          });
        }
      });
      localStorage.setItem('cartTindo', JSON.stringify(this.newCart));
      store.commit('updateCount', this.newCart.length);
      store.commit('addToCart', this.newCart)
      console.log(this.newCart)
    }
    else{
      console.log('here 4');
    }


  },
  methods: {
      fetchPaintings() {
        axios.get(this.api + 'gallery')
           .then((response) => {

             this.cpaintings = response.data;
             console.log(this.cpaintings);

           })
           .catch((error) => {
             toast.warning('You are offline. Check your internet connection.', {autoClose: 2000});
             console.log(error);
           });
    },
    removeById(id) {
      return function (obj) {
        return obj.id !== id;
      };
    },
    removeItem(id) {
      let newCart = store.state.cart.filter(this.removeById(id));
      console.log(newCart);
      localStorage.setItem('cartTindo', JSON.stringify(newCart));
      store.commit('updateCount', newCart.length);
      store.commit('addToCart', newCart)

    }
  }
}
</script>