import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import views from "../views/index.vue";
import flightOverview from "../views/flightOverview/index.vue";
import airlinerMaintain from "../views/airlinerMaintain/index.vue";
import airportOperation from "../views/airportOperation/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "flightOverview",
    component: flightOverview,
  },
  {
    path: "/",
    name: "views",
    component: views,
    children: [
      {
        path: "/flightOverview",
        name: "flightOverview",
        component: flightOverview,
      },
      {
        path: "/airlinerMaintain",
        name: "airlinerMaintain",
        component: airlinerMaintain,
      },
      {
        path: "/airportOperation",
        name: "airportOperation",
        component: airportOperation,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
