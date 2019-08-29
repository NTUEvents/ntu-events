<template>
  <div class="events h-100">
    <div class="d-flex flex-column h-100">
      <!-- Navbar -->
      <navbar></navbar>

      <!-- header -->
      <header class="masthead">
        <div class="container masthead-title">
          <h1 class="text-uppercase mb-0">My Events</h1>
        </div>
      </header>

      <div class="container mt-5 mb-5 flex-grow-1">
        <div id="table-content" class="table-wrapper">
          <table id="dash" class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Venue</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item._id">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ moment.utc(item.startdate).format('DD/MM/YY - HH:mm') }}</td>
                <td>{{ moment.utc(item.enddate).format('DD/MM/YY - HH:mm') }}</td>
                <td>{{ item.venue }}</td>
                <td>{{ item.type }}</td>
                <td style="text-align:center;">
                  <a
                    class="delete"
                    title="Delete"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    v-on:click.prevent="storeItemID(item._id)"
                  >
                    <i class="fas fa-trash"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <copyright></copyright>
    </div>
    <!-- Delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalTitle"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Are you sure that you want to delete this item?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="deleteEvent"
              data-dismiss="modal"
            >Delete</button>
          </div>
        </div>
      </div>
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
      items: {},
      itemID: ""
    };
  },
  created: function() {
    this.fetchUserEvents();
  },
  methods: {
    storeItemID(itemid) {
      this.itemID = itemid;
    },
    fetchUserEvents() {
      var userid = localStorage.getItem("userid");
      this.axios({
        url: "/api/user/" + userid + "/eventsdetail"
      }).then(response => {
        this.items = response.data;
      });
    },
    deleteEvent() {
      var userid = localStorage.getItem("userid");
      var userevent = {
        EventId: this.itemID
      };
      var cur = this;
      this.axios({
        method: "delete",
        url: "/api/user/" + userid + "/removeuserevent",
        params: userevent,
        headers: { "Content-Type": "application/json" }
      }).then(function(response) {
        if (response.status == "200") {
          //Remove item from table
          const index = cur.items.findIndex(
            items => items._id === cur.itemID
          );
          if (~index) {
            cur.items.splice(index, 1);
          }
        }
      });
    }
  }
};
</script>
