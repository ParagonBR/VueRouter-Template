import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueResource from "vue-resource";
import navbar from "./components/header.vue";
import Echo from "laravel-echo";
import pusher from "pusher-js";
import moment from "vue-moment";

import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

import Routes from "./routes";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";

//Custom Navbar
Vue.component("custom-navbar", navbar);

// Routes
Vue.use(VueRouter);

//Moment

Vue.use(moment);

// Swal

Vue.use(VueSweetalert2);

const router = new VueRouter({ routes: Routes, mode: "history" });

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Config http request

Vue.use(VueResource);

Vue.http.headers.common["Accept"] = "application/json";
Vue.http.headers.common["Content-Type"] = "application/json";
Vue.http.headers.common["Access-Control-Allow-Origin"] = "*";

// Custom directive

Vue.directive("rainbow", {
  bind(el, binding, vnode) {
    el.style.color = "#" + Math.random().toString(16).slice(2, 8);
  },
});

// Custom Filters

Vue.filter("capitalize_text", function (value) {
  if (!value) return "";

  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// Config Vue
export const bus = new Vue();
new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
});
