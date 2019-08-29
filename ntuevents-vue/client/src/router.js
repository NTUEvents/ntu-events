import Vue from 'vue'
import router from 'vue-router'
const Main = () => import('./components/main.vue')
const Event = () => import('./components/events.vue')
const Login = () => import('./components/login.vue')
const Register = () => import('./components/register.vue')
const Notify = () => import('./components/notify.vue')
const Dashboard = () => import('./components/dashboard.vue')
const Posters = () => import('./components/posters.vue')
const Contact = () => import('./components/contact.vue')

Vue.use(router)

function guard(to, from, next) {
  if (localStorage.getItem('isAuth') == "true") {
    next();
  } else {
    next('/login');
  }
}

function loggedInGuard(to, from, next) {
  if (localStorage.getItem('isAuth') == "false") {
    next();
  } else {
    next('/main');
  }
}

export default new router({
  routes: [{
    name: 'default',
    path: '',
    component: Main
  }, {
    name: 'main',
    path: '/main',
    component: Main
  },
  {
    name: 'events',
    path: '/events/:userId',
    beforeEnter: guard,
    component: Event
  },
  {
    name: 'login',
    path: '/login',
    beforeEnter: loggedInGuard,
    component: Login
  },
  {
    name: 'register',
    path: '/register',
    beforeEnter: loggedInGuard,
    component: Register
  },
  {
    name: 'notify',
    path: '/notify',
    component: Notify
  },
  {
    name: 'dashboard',
    path: '/admin/dashboard',
    component: Dashboard
  },
   {
    name: 'poster',
    path: '/posters',
    component: Posters
  },
  {
    name: 'contact',
    path: '/contact',
    component: Contact
  }	  	  
  ],
  mode: 'history'
})
