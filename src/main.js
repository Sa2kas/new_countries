import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.prototype.$globalData = Vue.observable ({
  url: "https://akademija.teltonika.lt/countries_api/api/countries",
  defaultUrl: "https://akademija.teltonika.lt/countries_api/api/countries",
  citiesUrl: "https://akademija.teltonika.lt/countries_api/api/countries",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
