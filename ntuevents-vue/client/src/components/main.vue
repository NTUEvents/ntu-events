<template>
  <div class="main">
    <navbar></navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="caption">
        <h3 class="display-4">
          one-stop site for
          <strong style="color:#5edfff;">cca & event</strong> matters
        </h3>
        <p
          class="lead caption-head"
        >Tired of hearing cool events only after it happened? Be the first to know everything going on at campus!</p>
        <router-link class="btn btn-lg btn-outline-primary" :to="{name: 'notify'}">Get notified</router-link>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 upcoming-title">
          <h2>Upcoming Events</h2>
          <hr class="title-divider" />
        </div>
      </div>
      <template v-for="event in events">
        <div class="row align-items-stretch eventlist" :key="event._id">
          <div class="event-item col-12">
            <div class="row align-items-stretch">
              <div class="col-md-2 mb-3 mb-md-0 text-center">
                <span class="h4">{{ moment.utc(event.startdate).format('MMM DD, YYYY')}}</span>
                <br />
                <br />
                <span class="h4">{{ moment.utc(event.startdate).format('dddd')}}</span>
              </div>
              <div class="col-md-3 text-center">
                <img class="img-fluid" width="156" height="156" src="../assets/event-ph.png" />
              </div>
              <div class="col-md-6 eventinfo">
                <h3>{{ event.name }}</h3>
                <h6>{{ event.venue }}</h6>
                <span class="badge badge-info">{{event.type}}</span>
                <p v-linkified>{{ event.description }}</p>
              </div>
              <div class="favourites" v-show="login">
                <a href="#" v-if="event.favourites" @click.prevent="unfavourite(event._id)">
                  <i class="fas fa-heart" style="color:red"></i>
                </a>
                <a href="#" v-else @click.prevent="favourite(event._id)">
                  <i class="far fa-heart" style="color:red"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button">
        <span class="fas fa-arrow-up"></span>
      </a>
    </div>
    <div class="poster text-center">
      <h4>Don't have time to visit all of the booths? Click here to find out more!</h4>
      <router-link class="btn btn-outline-primary cta" :to="`/posters`">View CCA Posters</router-link>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import $ from "jquery";
import navbar from "../components/navbar";
import copyright from "../components/footer";
export default {
  components: {
    navbar,
    copyright
  },
  data() {
    return {
      events: [],
      login: false
    };
  },
  created: function() {
    this.getUpcomingEvents();
  },
  methods: {
    getUpcomingEvents() {
      this.axios({
        url: "/api/events/upcoming"
      }).then(response => {
        this.events = response.data;
        this.getFavourites();
      });
    },
    getFavourites() {
      //Check if user login before proceeding
      this.login = localStorage.getItem("isAuth");
      if (this.login) {
        var userid = localStorage.getItem("userid");
        this.axios({
          url: "/api/user/" + userid + "/events"
        }).then(response => {
          var userevents = response.data;
          for (var i = 0; i < this.events.length; i++) {
            for (var j = 0; j < userevents.length; j++) {
              //match user favourites with upcoming events
              //update status
              if (this.events[i]._id == userevents[j].EventId) {
                this.events[i].favourites = true;
              }
            }
          }
        });
      }
    },
    getEventPos(id) {
      var foundIndex = this.events
        .map(function(x) {
          return x._id;
        })
        .indexOf(id);
      return foundIndex;
    },
    favourite(id) {
      var index = this.getEventPos(id);

      var userid = localStorage.getItem("userid");
      var useremail = localStorage.getItem("email");
      var name = localStorage.getItem("name");
      var evt_name = this.events[index].name;
      var evt_date = this.events[index].startdate;
      var evt_type = this.events[index].type;
      var evt_venue = this.events[index].venue;
      var evt_desc = this.events[index].description;

      this.events[index].favourites = true;

      var userevent = {
        Name: name,
        Email: useremail,
        EventId: id,
        EventName: evt_name,
        EventDate: evt_date,
        EventType: evt_type,
        EventVenue: evt_venue,
        EventDesc: evt_desc,
        Favourites: true
      };

      this.axios({
        method: "post",
        url: "api/user/" + userid + "/adduserevent",
        params: userevent,
        headers: { "Content-Type": "application/json" }
      });
    },
    unfavourite(id) {
      var index = this.getEventPos(id);
      var userid = localStorage.getItem("userid");
      this.events[index].favourites = false;
      var userevent = {
        EventId: id
      };
      this.axios({
        method: "delete",
        url: "api/user/" + userid + "/removeuserevent",
        params: userevent,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};

$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });
  // scroll body to 0px on click
  $("#back-to-top").click(function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      800
    );
    return false;
  });
});
</script>
<style>
@import url("../assets/style.css");
</style>
