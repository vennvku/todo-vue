import { createRouter, createWebHistory } from "vue-router";

import home from "../pages/home";
import transactions from "../pages/transactions";
import transactiondetail from "../pages/transaction-detail";
import notfound from "../pages/404";

import reactiontimergame from "../pages/reaction-timer-game";

const routes = [
  {
    path: "/",
    name: "overview-route",
    component: home,
  },
  {
    path: "/transactions",
    name: "transaction-route",
    // meta: {
    //   layout: "auth",
    // },
    component: transactions,
  },
  {
    path: "/transactions/:id",
    name: "transaction-detail-route",
    component: transactiondetail,
  },
  {
    path: "/react-timer-game",
    name: "react-timer-game",
    component: reactiontimergame,
  },
  {
    path: "/ts",
    redirect: "/transactions",
  },
  {
    path: "/:pathMatch(.*)*",
    component: notfound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
