import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewCafeView from "../views/NewCafeView.vue";
import SignInView from "@/views/SignInView.vue";
import UserView from "@/views/UserView.vue";
import { getCurrentUser } from "vuefire";

const routes = [
  { path: "/", component: HomeView },
  { path: "/new-cafe", component: NewCafeView, meta: { requiresAuth: true } },
  { path: "/sign-in", component: SignInView },
  { path: "/user/:id", component: UserView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  console.log("to", to);
  console.log("from", from);
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser();
    if (!user) {
      return {
        path: "/sign-in",
        query: { redirect: to.fullPath },
      };
    }
  }
});

export default router;
