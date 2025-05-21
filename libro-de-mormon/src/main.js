import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const BOM = createApp(App);
BOM.use(router);

BOM.mount("#app");
