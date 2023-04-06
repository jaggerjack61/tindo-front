<template>
  <div class="container mt-5 pt-5">
<div class="my-5">
<div class="card p-5 my-5">
    <ul class="nav nav-tabs justify-content-center" role="tablist">
      <li class="nav-item">
        <a class="nav-link" @click="showLogin" role="tab">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="showRegister" role="tab">Register</a>
      </li>
    </ul>
    <div class="tab-content my-3">
      <div class="tab-pane fade show active small px-5 my-5" role="tabpanel" v-if="showLoginTab">
        <form class="my-2" action="" @submit.prevent="login" >
          <div class="form-group my-3">
            <label for="email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group my-3">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button v-if="!loading" type="submit" class="btn btn-primary my-3">Login</button>
          <button v-if="loading"  class="btn btn-primary my-3"><span class="spinner-border spinner-border-sm"></span> Please wait...</button>
        </form>
      </div>
      <div class="tab-pane fade show active small my-5" role="tabpanel" v-if="showRegisterTab">
        <form class="my-3" @submit.prevent="register">
          <div class="form-group my-3">
            <label for="name">Name</label>
            <input type="text" v-model="regName" class="form-control" id="name" placeholder="Enter name">
          </div>
          <div class="form-group my-3">
            <label for="email">Email address</label>
            <input v-model="regEmail" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group my-3">
            <label for="password">Password</label>
            <input v-model="regPassword" type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button v-if="!loading" type="submit" class="btn btn-info my-3">Register</button>
          <button v-if="loading"  class="btn btn-info my-3"><span class="spinner-border spinner-border-sm"></span> Please wait...</button>
        </form>
      </div>
    </div>
    </div>
  </div>
  </div>

</template>

<script>
import axios from "axios";
import store from "@/store";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
  name: "Auth",
  data() {
    return {
      showLoginTab: true,
      showRegisterTab: false,
      regName:'',
      regEmail:'',
      regPassword:'',
      email:'',
      password:'',
      loading:false
    };
  },
  methods: {
    showLogin() {
      this.showLoginTab = true;
      this.showRegisterTab = false;
    },
    showRegister() {
      this.showLoginTab = false;
      this.showRegisterTab = true;
    },
    async register(){
      this.loading = true;
      await axios.post(store.state.api+'register', {
        name:this.regName,
        email:this.regEmail,
        password:this.regPassword
      }).then(response => {
        this.loading = false;
        if(response.data.message === 'success'){
          console.log('user created');
          toast.success('User created')
          this.email = this.regEmail;
          this.password = this.regPassword;
          this.login();
        }
        else{
          console.log('some shit went down')
          toast.warning('user could not be created');
        }
      }).catch(error => {
        this.loading = false;
        toast.warning('user could not be created');
        console.log(error);
      })
    },
    async login() {
      this.loading = true;
      await axios.post(store.state.api+'login',{
        email:this.email,
        password:this.password
      }).catch(error => {
        console.log(error);
        this.loading = false;
      }).then(response => {
        this.loading = false;

        if(response.data.message === 'success'){
          localStorage.setItem('token', JSON.stringify({plaintext:response.data.token}));
          store.commit('setUser', response.data.user);
          console.log('logged in');
          this.$router.push({ name: 'gallery' })
        }
        else{
          console.log('log in failed');
        }

      })
    }
  },
};
</script>

