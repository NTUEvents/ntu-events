<template>
  <div class="login">
    <navbar></navbar>
    <div>
      <b-alert id="error-alert" v-model="errorAlert" variant="danger" dismissible>{{ errorMessage }}</b-alert>
    </div>
    <div class="container">
      <div class="centerbox">
        <div class="col-lg-4 col-md-6 col-sm-8 col-10 ">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label for="email">Username / Email</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="input.email"
                  name="email"
                  required
                  v-bind:class="{ 'is-invalid': missingUser && attemptedSubmit }"
                />
                <div class="invalid-feedback">Valid username/email is required</div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="input.password"
                  name="password"
                  required
                  v-bind:class="{ 'is-invalid': missingPassword && attemptedSubmit }"
                />
                <div class="invalid-feedback">Valid password is required</div>
              </div>
              <button type="submit" class="btn btn-primary" v-on:click="login">
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import copyright from "../components/footer";

export default {
  components: {
    navbar,
    copyright
  },
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      errorMessage: "",
      errorAlert: false,
      attemptedSubmit: false
    };
  },

  computed: {
    missingUser() {
      return this.input.email === "";
    },
    missingPassword() {
      return this.input.password === "";
    }
  },

  methods: {
    login(event) {
      this.attemptedSubmit = true;
      if (this.missingUser || this.missingPassword) {
        event.preventDefault();
        return false;
      }
      if (this.errorAlert) this.errorAlert = false;

      var cur = this;
      this.axios({
        method: "post",
        url: "api/login",
        data: this.input,
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          if (response.status == "200") {
            //Save user information to localstorage
            var userid = response.data.data.user._id;
            var name = response.data.data.user.name;
            var username = response.data.data.user.username;
            var email = response.data.data.user.email;
            localStorage.setItem("userid", userid);
            localStorage.setItem("name", name);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("isAuth", true);
            //Redirect them to the main page
            cur.$router.push("/main");
          }
        })
        .catch(err => {
          if (err.response.status == "401") {
            this.errorAlert = true;
            this.errorMessage = "Unauthorized. Invalid email/password.";
          }

          if (err.response.status == "408") {
            this.errorAlert = true;
            this.errorMessage =
              "HTTP Error 408 - Request Timeout. Please refresh the browser and try again.";
          }

          if (err.response.status == "500") {
            this.errorAlert = true;
            this.errorMessage =
              "HTTP 500 - Internal Server Error. Please inform us at (email)";
          }
        });
    }
  }
};
</script>

<style>
@import url("../assets/style.css");

#error-alert {
  margin-top: 15px;
}


</style>