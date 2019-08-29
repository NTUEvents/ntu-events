//Core files
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Initialize all the Javascript Libraries here
import 'bootstrap';
import $ from "jquery";
import VueAxios from 'vue-axios'
import axios from 'axios'
import datePicker from 'vue-bootstrap-datetimepicker';
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
import NProgress from 'nprogress';
import linkify from 'vue-linkify';

//Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/regular.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'nprogress/nprogress.css'

//import ES6 style
import {VueMasonryPlugin} from 'vue-masonry';

//Development mode
Vue.config.productionTip = false

//Install Javascript Libraries
//Must be called before new Vue()
Vue.use(VueAxios, axios);
Vue.use(datePicker);
Vue.use(BootstrapVue);
Vue.use(VueMasonryPlugin);
Vue.prototype.moment = moment;
Vue.directive('linkified', linkify);

//Setting the icons for the datetimepicker
$.extend(true, $.fn.datetimepicker.defaults, {
  icons: {
    time: "far fa-clock",
    date: "far fa-calendar",
    up: "fas fa-arrow-up",
    down: "fas fa-arrow-down",
    previous: "fas fa-chevron-left",
    next: "fas fa-chevron-right",
    today: "fas fa-calendar-check",
    clear: "far fa-trash-alt",
    close: "far fa-times-circle"
  }
});

window.$ = window.jQuery = require("jquery");

//Progress bar - Normal loading/Axios requests
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

axios.interceptors.request.use(function (config){
  NProgress.start();
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response){
    NProgress.done();
    return response;
}, function(error){
    NProgress.done();
    return Promise.reject(error);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
