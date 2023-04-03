<template>
  <div>
    <NavBar/>
    <div class="mt-5">
      <div class="mt-5">
        <CheckOut/>
      </div>
    </div>


    <Footer/>
  </div>
</template>
<script setup>

import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import CheckOut from "@/components/CheckOut.vue";
</script>