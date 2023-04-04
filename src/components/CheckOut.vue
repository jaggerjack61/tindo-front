<template>
  <div v-if="$store.state.user" class="mt-5 p-2">
    <div class="row mt-5">
      <div class="col-sm-6">
        <div class="row my-2" v-for="item in $store.state.cart">
          <div class="col-4">
            <img :src="assets+item.url" style="width:100px;height:100px" />
          </div>
          <div class="col-4">
            <span> {{item.name}}</span>
          </div>
          <div class="col-4">
            <span> ${{item.price}}</span>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-sm-4">

          </div>
          <div class="col-sm-4">
            Total:
          </div>
          <div class="col-sm-4">
            <span class="bg-success text-white rounded">RTGS\ZWL ${{$store.state.cartTotal}}</span>

          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <form action="" method="post" role="form">




          <div class="form-group mt-3">
                  <textarea class="form-control" v-model="address" name="message" rows="5" placeholder="Enter your address"
                            required></textarea>
          </div>
          <div class="form-group mt-3">
            <label>Payment Method</label>
                  <select class="form-control" v-model="method">
                    <option value="none">Select a payment method</option>
                    <option value="ecocash">Ecocash</option>
                    <option value="onewallet">One Wallet</option>
                    <option value="telecash">Telecash</option>
                    <option value="bank">Bank</option>
                  </select>
          </div>
          <div v-if="method === 'ecocash' || method === 'onewallet' || method === 'telecash'">
            <div class="form-group mt-3">
              <lable>Enter the {{method.toUpperCase()}} number to be billed.</lable>
              <input type="number" placeholder="eg 0771234567" class="form-control">
            </div>
          </div>
          <div v-if="method === 'bank'">
            <div class="form-group mt-3">
              <p>After clicking the make payment button you will be redirected to the paynow portal where you will be able to complete
              the payment process using your local RTGS\ZWL bank account. </p>
            </div>
          </div>
          <div class="my-3">

          </div>
          <div class="mt-5">
            <div class="text-secondary my-3">A copy of the transaction transcript will be sent your registered email.</div>
            <button v-if="method === 'none'"  class="btn btn-secondary float-start">Make Payment</button>
            <div v-if="method !== 'none'">
              <button v-if="!loading" type="submit" class="btn btn-primary float-start">Make Payment</button>
              <button v-if="loading" class="btn btn-lg text-white" style="background: #2dc997">Please wait..
              </button>
            </div>

          </div>
        </form>
      </div>

    </div>
  </div>
  <div class="mt-5 p-5" v-if="!$store.state.user">
    <h1> You need to be logged in to checkout your items.</h1>
  </div>

</template>

<script>
import store from "@/store";

export default {
  name: 'CheckOut',
  data() {
    return {
      assets: process.env.VUE_APP_ASSETS,
      loading:false,
      address:'',
      method:'none',
      phone:''

    }
  },
  methods:{
    createOrder() {
      let order = {
        email:store.state.user.email,
        items:store.state.cart,
        phone:this.phone,
        network:this.method,
        reference:''
      };
    }
  }
}

</script>