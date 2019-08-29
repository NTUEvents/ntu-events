<template>
  <div class="navbar">
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top">
      <router-link class="navbar-brand" :to="{name: 'main'}">NTUEvents</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarToggler" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto" v-if="isAuth">
          <router-link
            class="nav-link"
            style="padding:0; margin-right:30px;"
            v-bind:class="{ active: isUserEventsPage }"
            :to="`/events/${userid}`"
          >My Events</router-link>
          <li class="dropdown">
            <label
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              style="color: white"
            >Hi {{name}}</label>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="navbar-menu dropdownMenu">
                <p class="text-left">@{{ username }}</p>
                <p class="text-left">{{email}}</p>
                <p class="text-left">
                  <router-link
                    class="btn btn-primary btn-block btn-sm"
                    :to="`/events/${userid}`"
                  >My Events</router-link>
                </p>
                <hr />
                <p class="text-left">
                  <button class="btn btn-danger btn-block btn-sm" @click="logout">
                    <span>Logout</span>
                  </button>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="!isAuth">
          <li class="nav-item">
            <!--<router-link
              class="nav-link separator"
              v-bind:class="{ active: isPastEventsPage }"
              :to="{name: 'Past Events'}"
            >Past Events</router-link>-->
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class="{ active: isLoginPage }"
              :to="{name: 'login'}"
            >Login</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class="{ active: isRegisterPage }"
              :to="{name: 'register'}"
            >Register</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:class="{ active: isContactPage }"
              :to="{name: 'contact'}"
            >Contact Us!</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      username: "",
      email: "",
      userid: "",
      isAuth: false,
      isLoginPage: false,
      isRegisterPage: false,
      isUserEventsPage: false,
      isContactPage: false
    };
  },
  created: function() {
    this.checkAuth();
    this.$route.name === "login"
      ? (this.isLoginPage = true)
      : (this.isLoginPage = false);
    this.$route.name === "register"
      ? (this.isRegisterPage = true)
      : (this.isRegisterPage = false);
    this.$route.name === "events"
      ? (this.isUserEventsPage = true)
      : (this.isUserEventsPage = false);
    this.$route.name === "contact"
      ? (this.isContactPage = true)
      : (this.isContactPage = false);
  },
  mounted() {
    this.name = localStorage.getItem("name");
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.userid = localStorage.getItem("userid");
  },
  methods: {
    checkAuth() {
      let cur = this;
      this.axios({
        method: "get",
        url: "/api/auth",
        headers: { "Content-Type": "application/json" }
      }).then(function(response) {
        cur.isAuth = response.data;
        localStorage.setItem("isAuth", response.data);
      });
    },
    logout() {
      let cur = this;
      this.axios({
        method: "get",
        url: "/api/logout",
        headers: { "Content-Type": "application/json" }
      }).then(function(response) {
        if (response.status == "200") {
          localStorage.clear();
          localStorage.setItem("isAuth", false);
          cur.isAuth = false;
          cur.$router.push("/main");
        }
      });
    }
  }
};
</script>

<style>
@import url("../assets/style.css");
</style>