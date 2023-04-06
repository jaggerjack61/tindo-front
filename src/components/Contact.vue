<template>
  <div>
    <section id="contact">
      <div class="container">
        <div class="section-header">
          <h3 class="section-title">Contact</h3>
          <p class="section-description">Feel free to get in touch with me if you are interested in my work.</p>
        </div>
      </div>

      <!-- Uncomment below if you wan to use dynamic maps -->
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243102.0138138754!2d31.05685825!3d-17.816637600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4ee1bdddb35%3A0xa5143b9be5134f2f!2sHarare!5e0!3m2!1sen!2szw!4v1680541714145!5m2!1sen!2szw"
          width="100%" height="360" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="container mt-5">
        <div class="row justify-content-center">

          <div class="col-lg-3 col-md-4">

            <div class="info">
              <div>
                <i class="bi bi-geo-alt"></i>
                <p>Obscure Road Number 1<br>Borrowdale, Harare<br>Zimbabwe</p>
              </div>

              <div>
                <i class="bi bi-envelope"></i>
                <p>tendaijarayi@gmail.com</p>
              </div>

              <div>
                <i class="bi bi-phone"></i>
                <p>+263 77 520 0032</p>
              </div>
            </div>

            <div class="social-links">
              <a href="https://www.facebook.com/tendaijarayi/" class="facebook m-1"><i class="bi bi-facebook"></i></a>
              <a href="https://wa.me/263775200032" class="instagram m-1"><i class="bi bi-whatsapp"></i></a>
              <a href="https://www.linkedin.com/in/tendai-jarayi-1420b68b/?originalSubdomain=zw" class="linkedin m-1"><i
                  class="bi bi-linkedin"></i></a>
            </div>

          </div>

          <div class="col-lg-5 col-md-8">
            <div class="form" @submit.prevent="sendMessage">
              <form action="" method="post" role="form" class="php-email-form">
                <div v-if="$store.state.user">
                  <div class="form-group">
                    <input type="text" :value="$store.state.user.name" name="name" class="form-control" id="name"
                           placeholder="Your Name" readonly/>
                  </div>
                  <div class="form-group mt-3">
                    <input type="email" :value="$store.state.user.email" class="form-control" name="email" id="email"
                           placeholder="Your Email" readonly/>
                  </div>
                </div>
                <div v-if="!$store.state.user">
                  <div class="form-group">
                    <input type="text" name="name" v-model="name" class="form-control" id="name" placeholder="Your Name"
                           required>
                  </div>
                  <div class="form-group mt-3">
                    <input type="email" class="form-control" v-model="email" name="email" id="email"
                           placeholder="Your Email" required>
                  </div>
                </div>
                <div class="form-group mt-3">
                  <input type="text" class="form-control" v-model="subject" name="subject" id="subject"
                         placeholder="Subject" required>
                </div>
                <div class="form-group mt-3">
                  <textarea class="form-control" v-model="message" name="message" rows="5" placeholder="Message"
                            required></textarea>
                </div>
                <div class="my-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class="text-center">
                  <button v-if="!loading" type="submit" class="btn btn-primary">Send Message</button>
                  <button v-if="loading" class="btn btn-lg text-white" style="background: #2dc997"><span class="spinner-border spinner-border-sm"></span> Please wait..
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
</template>

<script>


import axios from "axios";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import store from "@/store";

export default {
  name: 'Contact',
  computed: {
    store() {
      return store
    }
  },
  mounted() {

  },
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      loading: false,
      api: process.env.VUE_APP_BACKEND
    }
  },
  methods: {
    async sendMessage() {
      this.loading = true;
      await axios.post(this.api + "message", {
        name: (store.state.user) ? store.state.user.name : this.name,
        email: (store.state.user) ? store.state.user.email : this.email,
        subject: this.subject,
        message: this.message
      }).then((response) => {
        this.loading = false;
        if (response.data.message === "success") {
          toast.success('Message is has been sent.', {autoClose: 5000});
        } else {
          toast.warning('Message could not be sent.1', {autoClose: 5000});
        }

      }).catch((error) => {
        this.loading = false;
        toast.warning('Message could not be sent2.', {autoClose: 5000});
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

