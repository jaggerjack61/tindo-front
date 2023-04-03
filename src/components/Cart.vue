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
            <img :src="assets+item.url" style="width:80px;height: 80px;" />
            </div>
            <div class="col-5">
              <span> {{item.name}}</span>
            </div>
            <div class="col-2">
              <span> ${{item.price}}</span>
            </div>
            <div class="col-2">
              <span><a @click="removeItem(item.id)"><i class="bx bx-eraser"></i></a></span>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-6">
              <span> Total:</span>
            </div>

            <div class="col-6">
              <span>RTGS\ZWL ${{$store.state.cartTotal}}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
          <Button @click="showCheckOut" data-bs-dismiss="modal" class="btn btn-sm btn-primary">Check Out</Button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import store from "@/store";
export default {
  name: 'Cart',
  data() {
    return {
      assets:process.env.VUE_APP_ASSETS,



    }
  },
  created() {
    this.totalAmount();
  },
  methods:{
    removeById(id) {
      return function (obj) {
        return obj.id !== id;
      };
    },
    removeItem(id){
      // console.log(store.state.cart);
      let newCart = store.state.cart.filter(this.removeById(id));
      console.log(newCart);
      localStorage.setItem('cartTindo',JSON.stringify(newCart));
      store.commit('updateCount',newCart.length);
      store.commit('addToCart', newCart)
      this.totalAmount()

    },
    totalAmount(){
      let total = store.state.cart.reduce((total, item) =>{
        return total+item.price;
      },0);
      store.commit('setCartTotal', total);
    },
    showCheckOut() {
      this.$router.push({ name: 'checkout' })
    }
  }
}
</script>