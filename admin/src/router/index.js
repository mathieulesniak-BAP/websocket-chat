import Vue from "vue";
import VueRouter from "vue-router";
import AppContainer from "../views/AppContainer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AppContainer,
    children: [
      {
        path: "/",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
