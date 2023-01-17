import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Echarts from "vue-echarts";

const app = createApp(App)
app.component("v-chart", Echarts);

createApp(App).use(router).mount("#app");
