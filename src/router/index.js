import { createRouter, createWebHashHistory } from "vue-router";
import ListView from "../views/ListView.vue";
import CalendarView from "../views/CalendarView.vue";
import AboutView from "../views/AboutView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "list", component: ListView },
    { path: "/kalendar", name: "calendar", component: CalendarView },
    { path: "/o-projekte", name: "about", component: AboutView },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
  ],
});

export default router;
