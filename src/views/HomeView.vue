<template>
  <div>
    <NavBar />
    <section id="hero">
      <div class="hero-container" data-aos="zoom-in" data-aos-delay="100">
        <h1>Welcome to Tindo's Gallery</h1>
        <h5 style="color: white">Scroll down to find out what drives my art.</h5>
        <RouterLink :to="{name:'gallery'}" href="#about" class="btn-get-started">View Gallery</RouterLink>
      </div>
    </section><!-- End Hero Section -->

    <main id="main">

      <!-- ======= About Section ======= -->
      <section id="about">
        <div class="container" data-aos="fade-up">
          <div class="row about-container">

            <div class="col-lg-6 content order-lg-1 order-2">
              <h2 class="title">Few Words About Me</h2>
              <p>
                I am a Zimbabwean painter who explores the art of abstraction. I enjoy creating abstract art as it allows me to be creative without any limitations or having to stick rules. I work as an engineer by day, but I dedicate my free time to pursuing my passion for painting. I started painting as a child, inspired by the rich artistic heritage of my country and the natural beauty of its landscapes. I use oils and mixed media to create abstract and figurative paintings that reflect my personal experiences, dreams, emotions and perspectives. I hope that through my paintings, I can share a part of myself with the world and connect with other people who appreciate art.
              </p>


            </div>

            <div class="col-lg-6 background order-lg-2 order-1" data-aos="fade-left" data-aos-delay="100"></div>
          </div>

        </div>
      </section><!-- End About Section -->






        <Gallery />


      <Contact />
    </main> <!-- End Team Section -->
<Footer />

  </div>
</template>

<script>
// @ is an alias to /src


import NavBar from "@/components/NavBar.vue";
import Gallery from "@/components/Gallery.vue";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";


export default {
  name: 'HomeView',
  components: {
    Footer,
    Contact,
    Gallery,
    NavBar
  }
}
</script>
