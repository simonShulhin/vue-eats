import router from "./router/index";
import { firebaseApp } from "./firebase";
/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";

const app = createApp(App);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(router);

registerPlugins(app);

app.mount("#app");
