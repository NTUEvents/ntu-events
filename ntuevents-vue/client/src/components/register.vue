<template>
  <div class="register">
    <navbar></navbar>
    <div>
      <b-alert id="error-alert" v-model="errorAlert" variant="danger" dismissible>{{ errorMessage }}</b-alert>
    </div>
    <div class="container">
      <div class="centerbox">
        <div class="col-lg-4 col-md-6 col-sm-8 col-10">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="input.name"
                  name="name"
                  required
                  v-bind:class="{ 'is-invalid': missingName && attemptedSubmit }"
                />
                <div class="invalid-feedback">Valid name is required</div>
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="input.username"
                  name="username"
                  required
                  v-bind:class="{ 'is-invalid': missingUser && attemptedSubmit }"
                />
                <div class="invalid-feedback">Valid username is required</div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="input.email"
                  name="email"
                  required
                  v-bind:class="{ 'is-invalid': missingEmail && attemptedSubmit }"
                />
                <div class="invalid-feedback">Valid email is required</div>
              </div>
              <div class="form-group">
                <label for="contact">Contact</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="input.contactnum"
                  name="contact"
                  required
                  v-bind:class="{ 'is-invalid': missingContact && attemptedSubmit }"
                />
                <div
                  class="invalid-feedback"
                >Contact must not contain letters & have at least 8 digits</div>
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
              <div class="form-group">
                <label for="password">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="input.cfmpassword"
                  name="cfmpassword"
                  required
                  v-bind:class="{ 'is-invalid': missingCfmPass && attemptedSubmit }"
                />
                <div class="invalid-feedback">Both passwords are required to be the same</div>
              </div>
              <button type="submit" class="btn btn-primary" v-on:click="register">
                <span>Register</span>
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
  data() {
    return {
      input: {
        name: "",
        username: "",
        email: "",
        contactnum: "",
        password: "",
        cfmpassword: ""
      },
      errorAlert: false,
      successAlert: false,
      errorMessage: "",
      attemptedSubmit: false
    };
  },
  computed: {
    missingName() {
      return this.input.name === "";
    },

    missingUser() {
      return this.input.username === "";
    },

    missingEmail() {
      return (
        this.input.email === "" ||
        /\S+@\S+\.\S+/.test(this.input.email) === false
      );
    },

    missingContact() {
      return (
        this.input.contactnum.length < 8 ||
        /^\d+$/.test(this.input.contactnum) === false
      );
    },
    missingPassword() {
      return this.input.password === "";
    },

    missingCfmPass() {
      return (
        this.input.cfmpassword === "" ||
        this.input.password.localeCompare(this.input.cfmpassword) !== 0
      );
    }
  },
  methods: {
    register(event) {
      this.attemptedSubmit = true;
      if (
        this.missingName ||
        this.missingUser ||
        this.missingEmail ||
        this.missingPassword ||
        this.missingCfmPass
      ) {
        event.preventDefault();
        return false;
      }

      var cur = this;
      this.axios({
        method: "post",
        url: "/api/signup",
        data: this.input,
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          alert("Account registered successfully!");
          cur.input = {};
          //Redirect them to the login page
          cur.$router.push("/login");
        })
        .catch(err => {
          if (err.response.status == "401") {
            this.errorAlert = true;
            this.errorMessage = "HTTP Error 401 - Unauthorized. Username or email exists.";
          }

          if (err.response.status == "408") {
            this.errorAlert = true;
            this.errorMessage =
              "HTTP Error 408 - Request Timeout. Please refresh the browser and try again.";
          }

          if (err.response.status == "500") {
            this.errorAlert = true;
            this.errorMessage =
              "HTTP 500 - Internal Server Error. Please inform us at ntuevents@gmail.com";
          }
        });
    }
  }
};
</script>
<style>
@import url("../assets/style.css");
</style>
