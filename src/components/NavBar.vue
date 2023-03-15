<template>

  <nav class="navbar navbar-expand-lg bg-opacity-25 fixed-top pt-1" style="background:#2c3e50;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><h2>Tindo</h2></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <!-- Use navbar-nav class on ul element -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Add your router links here -->

        </ul>

        <span class="nav-item pt-2 mx-3">
          <RouterLink :to="{name:'home'}" class="nav-link" href="#">Home</RouterLink>
        </span>
        <span class="nav-item pt-2 mx-3">
          <RouterLink :to="{name:'gallery'}" class="nav-link">Gallery</RouterLink>
        </span>
        <span class="nav-item pt-2 mx-3">
          <RouterLink :to="{name:'contact'}" class="nav-link">Contact Me</RouterLink>
        </span>
        <span class="nav-item pt-2 mx-3 p-0">
          <RouterLink :to="{name:'auth'}" class="nav-link">Login|Register</RouterLink>
        </span>
        <span class="pt-2 mx-3">
        <a href="#portfolio"><i style="font-size: 2em;" class="bx bxs-cart"></i><span style="
  position: relative;
  top: -10px;
  right: 10px;
  padding: 3px 3px;
  border-radius: 50%;
  background-color: red;
  color: white;"
                                                                                      class="
badge badge-warning
"
                                                                                      id="
lblCartCount
">{{$store.state.cartCount}}</span></a></span>

      </div>
    </div>
  </nav>

<!--  <div>-->
<!--    <header id="header" class="fixed-top d-flex align-items-center header-scrolled">-->
<!--      <div class="container d-flex justify-content-between align-items-center">-->

<!--        <div id="logo">-->
<!--          <h2 style="color: white">TINDO</h2>-->
<!--          &lt;!&ndash; Uncomment below if you prefer to use a text logo &ndash;&gt;-->
<!--          &lt;!&ndash;<h1><a href="index.html">Regna</a></h1>&ndash;&gt;-->
<!--        </div>-->

<!--        <nav id="navbar" class="navbar">-->
<!--          <i class="bi bi-list mobile-nav-toggle"></i>-->
<!--          <ul>-->
<!--            <li><RouterLink :to="{name:'home'}" class="nav-link" href="#">Home</RouterLink></li>-->
<!--            <li><RouterLink :to="{name:'gallery'}" class="nav-link" >Gallery</RouterLink></li>-->
<!--            <li><RouterLink :to="{name:'contact'}" class="nav-link">Contact Me</RouterLink></li>-->
<!--            <li><RouterLink :to="{name:'auth'}" class="nav-link">Login|Register</RouterLink></li>-->
<!--            <li><a class="nav-link" href="#portfolio"><i style="font-size: 2em;" class="bx bxs-cart"></i><span style="position: relative;-->
<!--  top: -10px;-->
<!--  right: 10px;-->
<!--  padding: 3px 3px;-->
<!--  border-radius: 50%;-->
<!--  background-color: red;-->
<!--  color: white;" class="badge badge-warning" id="lblCartCount">5</span></a></li>-->
<!--          </ul>-->

<!--        </nav>&lt;!&ndash; .navbar &ndash;&gt;-->
<!--      </div>-->
<!--    </header>&lt;!&ndash; End Header &ndash;&gt;-->
<!--  </div>-->
</template>

<script>



import store from "@/store";

export default {
  name: 'NavBar',
  data(){
    return {
      cartQuantity:0
    }
  },
  created() {
    if(!localStorage.getItem('cartTindo')) {
      localStorage.setItem('cartTindo',JSON.stringify([]));
    }

  },
  mounted() {
    this.getCartAmount();
  },
  methods:{
    scrollMeTo(refName) {

        var element = this.$els[refName];
        element.scrollIntoView();

    },
    getCartAmount() {
      let cart = JSON.parse(localStorage.getItem('cartTindo'));
      this.cartQuantity = cart.length;
      store.commit('updateCount',cart.length);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

