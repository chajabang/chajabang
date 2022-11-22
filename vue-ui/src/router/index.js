import Vue from "vue";
import Router from "vue-router";

import layout from "../layout";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

export default new Router({
  linkExactActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  mode: "history",
  routes: [
    {
      path: "/",
      component: layout,
      children: [
        {
          path: "",
          name: "housemain",
          component: () => import("@/pages/house/HouseMain"),
        },
        {
          path: "/house",
          name: "houseview",
          component: () => import("@/pages/house/HouseView"),
        },
      ],
    },
    {
      path: "/basic-ui",
      component: layout,
      children: [
        {
          path: "buttons",
          name: "buttons",
          component: () => import("@/pages/basic-ui/buttons"),
        },
        {
          path: "dropdowns",
          name: "dropdowns",
          component: () => import("@/pages/basic-ui/dropdowns"),
        },
        {
          path: "typography",
          name: "typography",
          component: () => import("@/pages/basic-ui/typography"),
        },
      ],
    },
    {
      path: "/charts",
      component: layout,
      children: [
        {
          path: "chartjs",
          name: "chartjs",
          component: () => import("@/pages/charts/chartjs"),
        },
      ],
    },
    {
      path: "/tables",
      component: layout,
      children: [
        {
          path: "basic-tables",
          name: "basic-tables",
          component: () => import("@/pages/tables/basic-tables"),
        },
      ],
    },
    {
      path: "/member",
      component: layout,
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/pages/member/login"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("@/pages/member/signup"),
        },
        {
          path: "modify",
          name: "modify",
          component: () => import("@/pages/member/modify"),
        },
        {
          path: "pwConfirm",
          name: "pwConfirm",
          component: () => import("@/pages/member/pwConfirm"),
        },
      ],
    },
    {
      path: "/error",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "error-404",
          name: "error-404",
          component: () => import("@/pages/error/error-404"),
        },
        {
          path: "error-500",
          name: "error-500",
          component: () => import("@/pages/error/error-500"),
        },
      ],
    },
    {
      path: "/icons",
      component: layout,
      children: [
        {
          path: "mdi-icons",
          name: "mdi-icons",
          component: () => import("@/pages/icons/mdi-icons"),
        },
      ],
    },
    {
      path: "*",
      redirect: "/error-404",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "error-404",
          component: () => import("@/pages/error/error-404"),
        },
      ],
    },
  ],
});
