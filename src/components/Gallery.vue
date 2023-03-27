<template>
  <div>
    <section id="portfolio" class="portfolio bg-opacity-10" style='background: url("assets/img/bg-min.jpg") fixed;'>
      <div class="container" data-aos="fade-up">
        <div class="section-header bg-white rounded bg-opacity-90">
          <h3 class="section-title p-3 text-secondary">Gallery</h3>
          <p class="section-description text-black">Below are my art pieces, feel free to browse.</p>
        </div>


        <div  class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">

          <div v-for="painting in paintings" class="col-4 portfolio-item filter-app">
            <div class="card" style=".card:hover .card-body{display: block}">

              <img class="card-img-top" :src="assets+painting.url" style="width:100%;height:300px;object-fit:cover;" alt="image">
              <div class="card-img-overlay d-flex justify-content-end">
                <a style="height: fit-content;" @click="addToCart(painting.name, assets+painting.url, painting.id,painting.price)" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link m-1 bg-white bg-opacity-75 rounded" title="Add to Cart"><i style="font-size: 1.75em;color:#00b3ff;" class="bx bx-cart-add"></i></a>
                <a style="height: fit-content" :href="assets+painting.url" class="details-link m-1 bg-white bg-opacity-75 rounded" title="More Details"><i style="font-size: 1.75em;color: #343b40" class="bx bx-window-open"></i></a>
              </div>
              <div class="card-body bg-white bg-opacity-90">
                <div class="card-title">
                  <div class="row">
                    <div class="col-4">
                      <span class="align-content-start">{{painting.type}}</span>
                    </div>
                    <div class="col-4">
                      {{painting.name}}
                    </div>
                    <div class="col-4">
                      <span class="align-content-end rounded bg-black text-white">{{painting.dimensions}}</span>
                    </div>
                  </div>
                </div>
                <hr/>

                <span class="card-text align-content-start">{{painting.description}}</span>
                <span v-if="painting.status !=='sold'" class="align-content-end mx-5 bg-info rounded">${{painting.price}}</span>
                <span v-if="painting.status ==='sold'" class="align-content-end mx-5 bg-danger rounded">SOLD</span>



              </div>

            </div>

            <a href="" class="btn btn-primary float-start my-2">Enquire</a>

<!--            <img :src="painting.src" class="img-fluid" alt="" style="width:100%;height:300px;object-fit:cover;">-->
<!--            <div class="portfolio-info">-->
<!--              <h4>{{painting.name}}</h4>-->
<!--              <p>{{painting.description}}</p>-->
<!--              <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Add to Cart"><i class="bx bx-cart-add"></i></a>-->
<!--              <a :href="painting.src" class="details-link" title="More Details"><i class="bx bx-window-open"></i></a>-->
<!--            </div>-->
          </div>




        </div>

      </div>
    </section><!-- End Portfolio Section -->

  </div>
</template>

<script>



import store from "@/store";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import axios from "axios";


export default {
  name: 'Gallery',

  mounted() {

    console.log(this.api);
    axios.get(this.api+'gallery')
        .then( (response) => {

          this.paintings = response.data;
          console.log(this.paintings);

        })
        .catch((error) => {
          toast.warning('Failed to create table.',{autoClose:2000});
          console.log(error);
        });


  },
  data(){
    return {
      msg:"hie",
      api:process.env.VUE_APP_BACKEND.toString(),
      assets:process.env.VUE_APP_ASSETS.toString(),
      paintings:[],
      count:1
    }
  },
  created() {
    this.count += parseInt(this.paintings.length/3)
  },
  methods:{
    scrollMeTo(refName) {

      var element = this.$els[refName];
      element.scrollIntoView();

    },
    addToCart(name, src, id,price) {
      let cart = JSON.parse(localStorage.getItem('cartTindo'));
      const cartItem = cart.filter(item => { return item.id === id});
      console.log(cartItem);
      if(cartItem.length>0){
        toast.info(name+' is already in the cart.',{autoClose:2000});
      }
      else {
        cart.push({name: name, src: src, id: id, price: price});
        localStorage.setItem('cartTindo', JSON.stringify(cart));
        store.commit('updateCount', cart.length);
        store.commit('addToCart', cart)
        toast.success(name + ' successfully added to cart.', {autoClose: 2000});
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card-body {
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  opacity: 0;
}

/* Slide up the card body on hover */
.portfolio-item:hover .card-body {
  bottom: 0;
  opacity: 1;
  /* Add a transition effect */
  transition: all 0.5s ease-in-out;
}
</style>
