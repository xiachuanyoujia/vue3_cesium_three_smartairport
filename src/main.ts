import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Echarts from "vue-echarts";

import '../public/Widgets/widgets.css'
import * as Cesium from 'cesium'

createApp(App).use(router).provide("$Cesium", Cesium).component("v-chart", Echarts).mount("#app");
