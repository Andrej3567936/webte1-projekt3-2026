import { createRouter, createWebHashHistory } from "vue-router";
import ListView from "../views/ListView.vue";
import CalendarView from "../views/CalendarView.vue";
import AboutView from "../views/AboutView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  // Adresy s mriezkou. Skolsky server nevie pri F5 vratit index.html,
  // takze createWebHistory by tam hadzalo 404 (cv. 10b).
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "list", component: ListView },
    { path: "/kalendar", name: "calendar", component: CalendarView },
    { path: "/o-projekte", name: "about", component: AboutView },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
  ],
});

export default router;
