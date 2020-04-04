import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/buyHistory",
    name: "buyHistory",
    component: () =>
      import("../views/buyHistory.vue")
  },
  {
    path: "/chinesePaper",
    name: "chinesePaper",
    component: () =>
      import("../views/chinesePaper.vue")
  },
  {
    path: "/mathPaper",
    name: "mathPaper",
    component: () =>
      import("../views/mathPaper.vue")
  },
  {
    path: "/englishPaper",
    name: "englishPaper",
    component: () =>
      import("../views/englishPaper.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
