/*
  main.js - tu sa celá aplikácia spúšťa.

  Prevzaté z cvičenia 9 (príprava), doplnené podľa cvičenia 10b:
  vo cvičení 9 bolo iba createApp(App).mount("#app"), router pribudol
  v cvičení 10b (krok 1) a Pinia v kroku 3.


  MAPA PROJEKTU - čo kde je a odkiaľ je to prevzaté:

  index.html               jediná HTML stránka, má v sebe <div id="app">  (cv. 9)
  src/main.js              tento súbor, spojí Vue s index.html            (cv. 9 + 10b)
  src/App.vue              "rám" stránky: hlavička, pätička, okná         (cv. 10b, krok 1)
  src/router/index.js      tabuľka: ktorá adresa = ktorá stránka          (cv. 10b, krok 1)
  src/views/               celé stránky, na ktoré ukazuje router          (cv. 10b)
  src/components/          menšie časti, z ktorých sa stránky skladajú    (cv. 9, krok 4)
  src/stores/todos.js      spoločný stav úloh, žije mimo komponentov      (cv. 10b, krok 3)
  src/services/todoApi.js  všetky volania servera na jednom mieste        (cv. 10a, krok 1)
  src/utils/               pomocné funkcie na dátumy a text               (cv. 10a, krok 4)
  src/assets/styles.css    vzhľad celej stránky a font Outfit


  AKO TO DO SEBA ZAPADÁ - na príklade kliknutia na tlačidlo "Zmazať":

  1. TodoItem.vue    nič nemaže, iba zakričí hore: emit("delete", todo)   (cv. 9, krok 5)
  2. ListView.vue    to zachytí a zavolá store.askDelete(todo)
  3. store           si do todoToDelete odloží, ktorú úlohu ideme mazať
  4. App.vue         vidí, že deleteTodo nie je null, a zobrazí ConfirmDialog
  5. ConfirmDialog   po kliknutí na Zmazať zakričí emit("confirm")
  6. App.vue         zavolá store.remove(todo)
  7. store           zavolá deleteTodo() zo services/todoApi.js
  8. todoApi.js      pošle na server DELETE a vráti odpoveď
  9. store           po úspechu načíta zoznam zo servera nanovo
  10. zoznam aj kalendár sa prekreslia samy, lebo čítajú z toho istého store
*/
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import "./assets/styles.css";

createApp(App).use(createPinia()).use(router).mount("#app"); //zretazenie(vyrobi appku, zapne piniu, zapne router, vlozi vsetko do stranky)
