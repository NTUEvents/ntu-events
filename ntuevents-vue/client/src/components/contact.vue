<template>
  <div class="contact h-100">
    <div class="d-flex flex-column h-100">
      <!-- Navbar -->
      <navbar></navbar>
      <!-- header -->
      <header class="masthead">
        <div class="container masthead-title">
          <h1 class="text-uppercase mb-0">Contact Us!</h1>
          <p>If you have any new events or would like to work together, send us a message!</p>
        </div>
      </header>

      <div class="container">
        <div class="contactform col-md-8">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="input.name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" v-model="input.email" />
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" class="form-control" v-model="input.subject" />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea class="form-control" v-model="input.message" style="resize: none;" rows="5"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" v-on:click="sendMessage">
            <span>Send Message</span>
          </button>
        </div>
      </div>
      <copyright></copyright>
    </div>
  </div>
</template>

<style>
@import url("../assets/style.css");
</style>

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
        email: "",
        subject: "",
        message: ""
      }
    };
  },
  methods: {
    sendMessage(event) {
      let cur = this;
      this.axios({
        method: "post",
        url: "api/contact/create",
        data: this.input,
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        alert("Thanks! We will get back to you asap :)");
        cur.input = {};
        event.preventDefault();
      });
    }
  }
};
</script>
