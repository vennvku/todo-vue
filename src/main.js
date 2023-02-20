import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import defaultLayout from "./layouts/default";

const app = createApp(App);
app.component("default-layout", defaultLayout);
app.use(router);
app.mount("#app");
