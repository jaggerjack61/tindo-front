<template>
<!--  <div class="cont">-->
<!--    <h1>Purchases</h1>-->
<!--  </div>-->
<div class="my-5 py-5">
  <div class="my-5 py-5">
    <h1 class="text-primary align-content-center">Orders</h1>
    <table class=" m-2 table table-responsive  table-bordered">
      <thead>
      <tr>
        <th>Reference</th>
        <th>Address</th>
        <th>Date</th>
        <th>Delivery Status</th>
        <th>Items</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders">
        <td>{{order.reference}}</td>
        <td class="text-truncate">{{order.address}}</td>
        <td>{{order.created_at}}</td>
        <td>{{order.delivery_status}}</td>
        <td><p v-for="item in order.items">{{item.item_name}}  ${{item.item_price}}</p></td>
      </tr>
      </tbody>
    </table>
  </div>
</div>


</template>

<script>


import axios from "axios";
import store from "@/store";

export default {
  name: 'Purchases',
  data() {
    return {
      configs: null,
      orders: null,

    }
  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'));
    this.configs = {headers: {'Authorization': 'Bearer ' + token.plaintext}};
    axios.get(store.state.api + 'order', this.configs)
        .then(response => {
          this.orders = response.data.orders;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
  }
}
</script>

<!--<style scoped>-->
<!--.cont {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  height: 100vh;-->
<!--}-->

<!--h1 {-->
<!--  font-size: 3em;-->
<!--  text-align: center;-->
<!--}-->
<!--</style>-->
<!-- Add "scoped" attribute to limit CSS to this component only -->

