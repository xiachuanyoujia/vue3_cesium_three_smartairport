import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Echarts from "vue-echarts";

createApp(App).use(router).component("v-chart", Echarts).mount("#app");
