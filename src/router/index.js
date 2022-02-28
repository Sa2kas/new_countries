import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cities from "../views/Cities.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cities",
    name: "Cities",
    component: Cities,
    props: true,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
