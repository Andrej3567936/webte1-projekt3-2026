/*
  Router - tabuľka, ktorá adresa zobrazí ktorý komponent.
  Prevzaté z cvičenia 10b, krok 1. Stránka 404 je z kroku 5 (bonus).

  Jediná zmena oproti cvičeniu: createWebHashHistory() namiesto
  createWebHistory(). Cvičenie 10b to samo spomína v poznámke "Pozor pri
  nasadení na server": Apache pri adrese /kalendar hľadá súbor kalendar,
  nenájde ho a po F5 vráti 404. Na školskom serveri si FallbackResource
  nastaviť neviem, preto adresy s mriežkou: /#/kalendar.
*/
import { createRouter, createWebHashHistory } from "vue-router";
import ListView from "../views/ListView.vue";
import CalendarView from "../views/CalendarView.vue";
import AboutView from "../views/AboutView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  // Adresy s mriežkou (/#/kalendar). Školský server nevie pre neznáme adresy
  // vrátiť index.html, takže s createWebHistory by po F5 vracal chybu 404.
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "list", component: ListView },
    { path: "/kalendar", name: "calendar", component: CalendarView },
    { path: "/o-projekte", name: "about", component: AboutView },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
  ],
});

export default router;
