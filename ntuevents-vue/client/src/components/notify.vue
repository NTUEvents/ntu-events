<template>
  <div class="events h-100">
    <div class="d-flex flex-column h-100">
      <navbar></navbar>
      <!-- header -->
      <header class="masthead">
        <div class="container masthead-title">
          <h1 class="text-uppercase mb-0">Registration Form</h1>
        </div>
      </header>
      <b-alert
        variant="success"
        dismissible
        fade
        :show="dismissCountDown"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >Form Submitted!</b-alert>
      <b-alert
        id="message-alert"
        v-model="showErrorAlert"
        variant="danger"
        dismissible
      >{{ errorMessage }}</b-alert>
      <div class="container mt-5 mb-5 flex-grow-1">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="left">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your info with anyone else."
          >
            <b-form-input
              id="email-input"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input id="name-input" v-model="form.name" required placeholder="Enter name"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Mobile Number:" label-for="input-3">
            <b-form-input
              id="phone-input"
              v-model="form.phoneNo"
              type="text"
              required
              placeholder="Enter phone number"
              v-bind:class="{ 'is-invalid': invalidContact && attemptedSubmit }"
            ></b-form-input>
            <div class="invalid-feedback">Contact must not contain letters & have at least 8 digits</div>
          </b-form-group>

          <label for="ccaList">Preferred CCAs:</label>
          <br />

          <div id="ccaList">
            <div id="ccas" v-for="cca in ccaInfo" :key="cca.category">
              <label :for="cca.category">
                <strong>{{ cca.category }}:</strong>
              </label>
              <br />
              <b-form-checkbox-group
                :name="cca.category"
                v-model="form.checked"
                :options="cca.club"
                stacked
                button
              ></b-form-checkbox-group>
              <br />
            </div>
          </div>
          <br />
          <b-button id="button-spacing" type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <br />
        <br />
      </div>
      <copyright></copyright>
    </div>
  </div>
</template>

<style>
@import url("../assets/style.css");
@import url("../assets/tablestyle.css");
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
      form: {
        email: "",
        name: "",
        phoneNo: "",
        checked: []
      },
      ccaInfo: [],
      show: true,
      showSuccessAlert: false,
      showErrorAlert: false,
      errorMessage: "",
      attemptedSubmit: false,
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },

  computed: {
    invalidContact() {
      return (
        this.form.phoneNo.length < 8 ||
        /^\d+$/.test(this.form.phoneNo) === false
      );
    }
  },

  methods: {
    async getCcaList() {
      let response = await this.axios.get(
        "https://sheets.googleapis.com/v4/spreadsheets/1AfIeDNHqjDKYYgBNnukqJj9wYefLvmUf6YXPukf9cqM/values:batchGet?majorDimension=COLUMNS&ranges=CCAs!A2%3AB&key=AIzaSyB1EVFTv5qCkp__VkjE4bdNa5nth1I2YrY"
      );

      let cellValues = response.data.valueRanges[0].values;

      for (let i = 0; i < cellValues[0].length; i++) {
        const check = this.ccaInfo.find(
          entry => entry.category === cellValues[1][i]
        );
        if (!check) {
          this.ccaInfo.push({
            category: cellValues[1][i],
            club: [cellValues[0][i]]
          });
        } else check.club.push(cellValues[0][i]);
      }
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    onSubmit(evt) {
      evt.preventDefault();
      this.attemptedSubmit = true;

      if (this.form.invalidContact) return false;

      if (this.form.checked.length === 0) {
        this.showErrorAlert = true;
        this.errorMessage = "Please choose at least 1 CCA!";
        return false;
      }
      if (this.showErrorAlert) this.showErrorAlert = false;

      let date =
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString("en-US", { hour12: false });

      this.axios
        .post("/api/notify/insert", {
          values: [
            date,
            this.form.name,
            this.form.phoneNo,
            this.form.email,
            this.form.checked.toString()
          ]
        })
        .then(response => {
          this.form.email = "";
          this.form.name = "";
          this.form.phoneNo = "";
          this.form.checked = [];
          this.attemptedSubmit = false;
          this.showAlert();
        })
        .catch(err => {
          this.showErrorAlert = true;
          this.errorMessage =
            "Error occurred. Please try again or contact us at (email).";
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.phoneNo = "";
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  mounted() {
    this.getCcaList();
  }
};
</script>