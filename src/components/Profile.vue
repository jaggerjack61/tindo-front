<template>
  <div class="center">

    <div class="card">
      <div class="card-header">
        <h2 class="text-primary">Change Profile Details</h2>
      </div>
      <div class="card-footer">
        <form @submit.prevent="changeDetails">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" v-model="name" class="form-control" id="name" required/>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" v-model="email" class="form-control" id="email" readonly/>
          </div>
          <div class="mb-3">
            <label for="pwd" class="form-label">Password:</label>
            <input type="text" v-model="password" class="form-control" id="pwd"
                   placeholder="Leave blank to indicate no change.">
          </div>
          <button v-if="!loading" type="submit" class="btn btn-primary">Submit</button>
          <button v-if="loading"  class="btn btn-primary"><span class="spinner-border spinner-border-sm"></span> Please wait....</button>
        </form>
      </div>
    </div>

  </div>
</template>


<script>


import axios from "axios";
import store from "@/store";
import {toast} from "vue3-toastify";

export default {
  name: 'Profile',
  data() {
    return {
      configs: null,
      name:'',
      email: '',
      password: '',
      loading: false,
    }
  },
  created() {
    this.name = store.state.user.name;
    this.email = store.state.user.email;
  },
  mounted() {
    let token = JSON.parse(localStorage.getItem('token'));
    this.configs = {headers: {'Authorization': 'Bearer ' + token.plaintext}};

  },
  methods: {
    async changeDetails() {
      this.loading = true;
      await axios.post(store.state.api+'save-profile',{name:this.name, password:this.password}, this.configs)
          .then(response => {
            if(response.data.message === "success") {
              toast.success('Details changed successfully.');
              store.commit('setUserName',this.name)
            }
            else {
              toast.warning('Failed to make changes.');
            }
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
            toast.warning('Failed to make changes.');
            this.loading = false;
          });
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>