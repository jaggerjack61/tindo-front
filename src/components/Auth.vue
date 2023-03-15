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
        <form class="my-2">
          <div class="form-group my-3">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group my-3">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary my-3">Login</button>
        </form>
      </div>
      <div class="tab-pane fade show active small my-5" role="tabpanel" v-if="showRegisterTab">
        <form class="my-3">
          <div class="form-group my-3">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" placeholder="Enter name">
          </div>
          <div class="form-group my-3">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group my-3">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-info my-3">Register</button>
        </form>
      </div>
    </div>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      showLoginTab: true,
      showRegisterTab: false,
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
  },
};
</script>

