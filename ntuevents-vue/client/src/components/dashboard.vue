<template>
  <div class="dashboard h-100">
    <div class="d-flex flex-column h-100">
      <!-- Navbar -->
      <navbar></navbar>

      <!-- header -->
      <header class="masthead">
        <div class="container masthead-title">
          <h1 class="text-uppercase mb-0">Admin Dashboard</h1>
        </div>
      </header>

      <div class="container">
        <div id="table-content">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-8">
                <h2>All Events</h2>
                <hr class="title-divider" />
              </div>
              <div class="col-sm-4">
                <button
                  type="button"
                  class="btn btn-info add-new"
                  data-toggle="modal"
                  data-target="#addEditModal"
                  v-on:click.prevent="showCreateModal()"
                >
                  <i class="fa fa-plus"></i> Add New
                </button>
              </div>
            </div>
          </div>
          <table id="dash" class="table table-responsive">
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
                <td>
                  <a class="add" title="Add" data-toggle="tooltip">
                    <i class="fas fa-add"></i>
                  </a>
                  <a
                    class="edit"
                    title="Edit"
                    data-toggle="modal"
                    data-target="#addEditModal"
                    v-on:click.prevent="showEditModal(item._id)"
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </a>&nbsp;
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

    <!-- Add Modal -->
    <div
      class="modal fade"
      id="addEditModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addEditModalTitle"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addEditModalTitle">{{headertitle}}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              v-on:click="clearForm"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="form-group col-8">
                  <label for="eventname">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="eventInfo.name"
                    ref="name"
                    required
                    v-bind:class="{ 'is-invalid': missingName && attemptedSubmit }"
                  />
                  <div class="invalid-feedback">Name is required</div>
                </div>
                <div class="form-group col-4">
                  <label for="cca-type">CCA</label>
                  <select class="form-control" id="cca-type" v-model="eventInfo.type">
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Dance">Dance</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Religious">Religious</option>
                    <option value="Music">Music</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Interest-based">Interest-based</option>
                    <option value="Student Community Engagement">Student Community Engagement</option>
                    <option value="Arts">Arts</option>
                    <option value="Scholars Programme">Scholars Programme</option>
                    <option value="Student Union">Student Union</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="venue">Venue</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="eventInfo.venue"
                  ref="venue"
                  required
                  v-bind:class="{ 'is-invalid': missingVenue && attemptedSubmit }"
                />
                <div class="invalid-feedback">Venue is required</div>
              </div>
              <div class="row">
                <div class="form-group col-6">
                  <label for="startdate">Start Date</label>
                  <date-picker
                    id="startDate"
                    name="Start Date"
                    v-model="eventInfo.startdate"
                    :config="options.start"
                    v-bind:class="{ 'is-invalid': missingStartDate && attemptedSubmit }"
                    ref="startdate"
                  ></date-picker>
                  <div class="invalid-feedback">Start Date is required</div>
                </div>
                <div class="form-group col-6">
                  <label for="enddate">End Date</label>
                  <date-picker
                    id="endDate"
                    v-model="eventInfo.enddate"
                    :config="options.end"
                    ref="enddate"
                    v-bind:class="{ 'is-invalid': missingEndDate && attemptedSubmit }"
                  ></date-picker>
                  <div class="invalid-feedback">End Date is required</div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-6">
                  <label for="quota">Quota</label>
                  <input type="text" class="form-control" v-model="eventInfo.quota" ref="quota" />
                </div>
                <div class="form-group col-6">
                  <label for="contact">Contact</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="eventInfo.contactnum"
                    ref="contactnum"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" v-model="eventInfo.description" ref="description"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              v-on:click="clearForm"
            >Close</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              v-on:click="runMethod(btnEvent)"
            >Save changes</button>
          </div>
        </div>
      </div>
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
      itemID: "",
      eventInfo: {
        name: "",
        venue: "",
        startdate: "",
        enddate: "",
        quota: "",
        contactnum: ""
      },
      headertitle: "",
      btnEvent: "",
      attemptedSubmit: false,

      date: new Date(),
      options: {
        start: {
          format: "YYYY-MM-DD HH:mm",
          useCurrent: false,
          showClear: true,
          showClose: true,
          maxDate: false
        },
        end: {
          format: "YYYY-MM-DD HH:mm",
          useCurrent: false,
          showClear: true,
          showClose: true,
          minDate: false
        }
      }
    };
  },

  computed: {
    // Require the object values in order to perfom validation
    missingName() {
      return this.eventInfo.name === "" || this.eventInfo.name === undefined;
    },

    missingVenue() {
      return this.eventInfo.venue === "" || this.eventInfo.name === undefined;
    },

    missingStartDate() {
      return (
        this.eventInfo.startdate === "" || this.eventInfo.name === undefined
      );
    },

    missingEndDate() {
      return this.eventInfo.enddate === "" || this.eventInfo.name === undefined;
    },

    missingQuota() {
      return (
        this.eventInfo.quota === "" ||
        /^\d+$/.test(this.eventInfo.quota) === false
      );
    },

    missingContact() {
      return (
        this.eventInfo.contactnum.length < 8 ||
        /^\d+$/.test(this.eventInfo.contactnum) === false
      );
    }
  },

  created: function() {
    this.fetchEvents();
  },

  methods: {
    storeItemID(itemid) {
      this.itemID = itemid;
    },
    clearForm() {
      this.eventInfo = {};
    },
    showCreateModal() {
      this.headertitle = "Add Event";
      this.btnEvent = "addEvent";
    },
    showEditModal(itemid) {
      this.headertitle = "Edit Event";
      this.btnEvent = "editEvent";
      const index = this.items.findIndex(items => items._id === itemid);
      this.eventInfo = this.items[index];
    },
    runMethod(method) {
      this.attemptedSubmit = true;

      if (
        this.missingName ||
        this.missingVenue ||
        this.missingStartDate ||
        this.missingEndDate
      ) {
        event.stopPropagation();
        return false;
      }

      this[method]();
    },
    addEvent() {
      this.eventInfo["createdby"] = 1;
      this.eventInfo["favourites"] = false;
      this.axios({
        method: "post",
        url: "/api/event/create",
        data: this.eventInfo,
        config: { headers: { "Content-Type": "application/json" } }
      });
      //Add item to table
      this.items.push(this.eventInfo);
      this.clearForm();
    },
    editEvent() {
      this.axios({
        method: "put",
        url: "/api/event/" + this.eventInfo._id + "/update",
        data: this.eventInfo,
        config: { headers: { "Content-Type": "application/json" } }
      });
      this.clearForm();
    },
    deleteEvent() {
      this.axios({
        method: "delete",
        url: "/api/event/" + this.itemID + "/delete/"
      });
      //Remove item from table
      const index = this.items.findIndex(items => items._id === this.itemID);
      if (~index) {
        this.items.splice(index, 1);
      }
    },
    fetchEvents() {
      this.axios({
        url: "/api/event/"
      }).then(response => {
        this.items = response.data;
      });
    }
  }
};
</script>
