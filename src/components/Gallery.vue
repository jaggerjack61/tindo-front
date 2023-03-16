<template>
  <div>
    <section id="portfolio" class="portfolio bg-opacity-10" style='background: url("assets/img/bg-min.jpg") fixed;'>
      <div class="container" data-aos="fade-up">
        <div class="section-header bg-white rounded bg-opacity-90">
          <h3 class="section-title p-3 text-secondary">Gallery</h3>
          <p class="section-description text-black">Below are my art pieces, feel free to browse.</p>
        </div>


        <div  class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">

          <div v-for="painting in paintings" class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="card" style=".card:hover .card-body{display: block}">

              <img class="card-img-top" :src="painting.src" style="width:100%;height:300px;object-fit:cover;" alt="image">
              <div class="card-img-overlay d-flex justify-content-end">
                <a style="height: fit-content;" @click="addToCart(painting.name, painting.src, painting.id,painting.price)" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link m-1 bg-white bg-opacity-75 rounded" title="Add to Cart"><i style="font-size: 1.75em;color:#00b3ff;" class="bx bx-cart-add"></i></a>
                <a style="height: fit-content" :href="painting.src" class="details-link m-1 bg-white bg-opacity-75 rounded" title="More Details"><i style="font-size: 1.75em;color: #343b40" class="bx bx-window-open"></i></a>
              </div>
              <div class="card-body bg-white bg-opacity-90">
                <h5 class="card-title">{{painting.name}}</h5>
                <hr/>

                <span class="card-text align-content-start">{{painting.description}}</span>
                <span class="align-content-end mx-5 bg-info rounded">${{painting.price}}</span>


              </div>
            </div>
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

export default {
  name: 'Gallery',
  data(){
    return {
      msg:"hie",
      paintings:[
        {name:'Sunset', description: 'Abstract Sunset',src:'assets/img/gallery/1.webp', id:1, price:99.99},
        {name:'Vase in the void', description: 'Painting of a vase',src:'assets/img/gallery/2.webp', id:2, price:299.99},
        {name:'Born to be Together', description: 'Painting of Love',src:'assets/img/gallery/3.webp', id:3, price:59.99},
        {name:'Deadly Flowers', description: 'Flowers that kill',src:'assets/img/gallery/4.webp', id:4, price:80.00}
      ],
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
      cart.push({name:name, src:src, id:id, price:price});
      localStorage.setItem('cartTindo',JSON.stringify(cart));
      store.commit('updateCount',cart.length);
      store.commit('addToCart',cart)

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
.card:hover .card-body {
  bottom: 0;
  opacity: 1;
  /* Add a transition effect */
  transition: all 0.5s ease-in-out;
}
</style>
