<template>
  <div v-if="transaction" class="cont">
    <div v-if="transactionStatus === 'pending'">
      <span>Loading transcation... </span>
      <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
      </div>
    </div>
    <div v-if="transactionStatus === 'Paid'">
      <span class="text-success">Your transaction was successful you will be redirected to your purchases soon. </span>
    </div>
    <div v-if="transactionStatus === 'Cancelled'">
      <span class="text-danger">Unfortunately the transaction could not go through. </span>
    </div>

  </div>
  <div v-if="$store.state.user" class="mt-5 p-2">
    <div class="row mt-5">
      <div class="col-sm-6">
        <div class="row my-2" v-for="item in $store.state.cart">
          <div class="col-4">
            <img :src="assets+item.url" style="width:100px;height:100px"/>
          </div>
          <div class="col-4">
            <span> {{ item.name }}</span>
          </div>
          <div class="col-4">
            <span> ${{ item.price }}</span>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-sm-4">

          </div>
          <div class="col-sm-4">
            Total:
          </div>
          <div class="col-sm-4">
            <span class="bg-success text-white rounded">RTGS\ZWL ${{ $store.state.cartTotal }}</span>

          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <form action="" method="post" role="form" @submit.prevent="initPayment">


          <div class="form-group mt-3">
                  <textarea class="form-control" v-model="address" name="message" rows="5"
                            placeholder="Enter your address"
                            required></textarea>
          </div>
          <div class="form-group mt-3">
            <label>Payment Method</label>
            <select class="form-control" v-model="method">
              <option value="none">Select a payment method</option>
              <option value="ecocash">Ecocash</option>
              <option value="onemoney">One Money</option>
              <option value="telecash">Telecash</option>
              <option value="bank">Bank</option>
            </select>
          </div>
          <div v-if="method === 'ecocash' || method === 'onemoney' || method === 'telecash'">
            <div class="form-group mt-3">
              <lable>Enter the {{ method.toUpperCase() }} number to be billed.</lable>
              <input type="number" v-model="phone" placeholder="eg 0771234567" class="form-control" required/>
            </div>
          </div>
          <div v-if="method === 'bank'">
            <div class="form-group mt-3">
              <p>After clicking the make payment button you will be redirected to the paynow portal where you will be
                able to complete
                the payment process using your local RTGS\ZWL bank account. This can take up to 30 seconds. </p>
            </div>
          </div>
          <div class="my-3">

          </div>
          <div class="mt-5">
            <div class="text-secondary my-3">A copy of the transaction transcript will be sent your registered email.
            </div>
            <button v-if="method === 'none'" class="btn btn-secondary float-start">Make Payment</button>
            <div v-if="method !== 'none'">
              <button v-if="!loading" type="submit" class="btn btn-primary float-start">Make Payment</button>
              <button v-if="loading" class="btn btn-primary float-start" style="background: #2dc997"><span class="spinner-border spinner-border-sm"></span> Please wait..
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
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'CheckOut',
  data() {
    return {
      assets: process.env.VUE_APP_ASSETS,
      loading: false,
      address: '',
      method: 'none',
      phone: '',
      configs: null,
      transaction: false,
      transactionStatus: 'pending',
      intfunc:null

    }
  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'));
    this.configs = {headers: {'Authorization': 'Bearer ' + token.plaintext}};
  },
  methods: {
    createOrder() {
      store.commit('setOrderReference', store.state.user.id + '-' + Math.random().toString(36).substring(2));
      return {
        email: store.state.user.email,
        address: this.address,
        items: store.state.cart,
        phone: this.phone,
        network: this.method,
        reference: store.state.orderReference
      };
      //console.log(order);
    },
    initPayment() {
      if (this.method === 'ecocash' || this.method === 'onemoney' || this.method === 'telecash') {
        this.mobilePayment();
      } else if (this.method === 'bank') {
        this.bankPayment();
      }
    },
    async bankPayment() {
      this.loading = true;
      await axios.post(store.state.api + 'paynow/bank', this.createOrder(), this.configs)
          .then(response => {
            console.log(response)
            if (response.data.message === "success") {
              this.transaction = true;

              window.location.href = response.data.url;
              this.intfunc = setInterval(this.getStatus, 10000);
            } else if (response.data.message === "invalid order") {
              toast.warning('Some items in your cart may have already been sold or have had their details changes since you added them. Please empty your cart and select your items again.');
            } else {
              toast.warning('Something has gone wrong please contact us using the details on our contact us page.');
            }

            this.loading = false;
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
    },
    async mobilePayment() {
      this.loading = true;
      await axios.post(store.state.api + 'paynow/mobile', this.createOrder(), this.configs)
          .then(response => {
            console.log(response)
            if (response.data.message === "success") {
              this.transaction = true;
              this.intfunc = setInterval(this.getStatus, 10000);
            } else if (response.data.message === "invalid order") {
              toast.warning('Some items in your cart may have already been sold or have had their details changes since you added them. Please empty your cart and select your items again.');
            } else {
              toast.warning('Something has gone wrong please contact us using the details on our contact us page.');
            }

            this.loading = false;
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
    },
    async getStatus() {
      await axios.post(store.state.api + 'paynow/status', {reference: store.state.orderReference}, this.configs)
          .then(response => {
            let data = response.data;
            if (data.message === 'success') {
              if (data.payment !== null) {
                if (data.payment.status === 'Paid') {
                  this.transactionStatus = 'Paid';
                  setTimeout(this.setPaid, 3000);
                } else if (data.payment.status === 'Cancelled') {
                  this.transactionStatus = 'Cancelled';
                  setTimeout(this.setCancelled, 5000);
                } else if (data.payment.status === 'pending') {
                  console.log('nothing');
                } else {
                  this.transactionStatus = 'Unforeseen';
                  setTimeout(this.setCancelled, 5000);
                }
                toast.success(data.payment.status);
              } else {
                toast.warning('no payment')
              }
            } else {
              this.transactionStatus = 'Unforeseen';
              setTimeout(this.setCancelled, 5000);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    setPending() {
      this.$router.push({name: 'purchases'});
    },
    setPaid() {
      localStorage.setItem('cartTindo','[]');
      store.commit('updateCount',0);
      store.commit('addToCart', [])
      setTimeout(()=> {
        clearInterval(this.intfunc);
      }, 1000);
      this.$router.push({ name: 'purchases' });
    },
    setCancelled() {
      this.transaction = false;
      this.transactionStatus = 'pending';
      setTimeout(()=> {
        clearInterval(this.intfunc);
      }, 1000);
    }
  }
}

</script>

<style scoped>
.cont {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-size: 3em;
  text-align: center;
}
</style>