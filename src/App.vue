<!--
  App.vue - "rám" celej aplikácie (cvičenie 10b, krok 1).
  Je tu všetko, čo je vidieť na každej stránke: hlavička s navigáciou,
  pätička a <RouterView />, kam router vloží aktuálnu stránku.

  Navyše sú tu modálne okná (formulár, detail úlohy, potvrdenia).
  Sú tu preto, lebo ich treba otvárať zo zoznamu aj z kalendára.
  Ktoré okno je otvorené, si pamätá store, takže sa k nemu dostane
  ktorákoľvek stránka - to je presne dôvod, prečo store existuje
  (cv. 10b, krok 3).

  Navigácia používa <RouterLink>, nie <a href>. Cvičenie 10b (krok 1)
  ukazuje prečo: obyčajný odkaz zahodí celú aplikáciu a stiahne stránku
  zo servera nanovo, RouterLink iba vymení komponent v RouterView.
-->
<script setup>
import { ref, computed } from "vue";
import { useRoute, RouterLink, RouterView } from "vue-router";
import { useTodosStore } from "./stores/todos.js";
import TodoForm from "./components/TodoForm.vue";
import TodoDetail from "./components/TodoDetail.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";

const store = useTodosStore();
const route = useRoute();

// Rozbalené hamburgerové menu na malých displejoch.
// Predtým to robil Bootstrap cez data-bs-toggle, teraz to riadi Vue.
const menuOpen = ref(false);

// Stránky so zoznamom a kalendárom majú spoločnú hlavičku (identifikátor,
// tlačidlá, prepínač). Stránka O projekte a chybová 404 ju nepotrebujú.
const isTodoPage = computed(() => route.name === "list" || route.name === "calendar");

// Ak je meno uložené z minula, rovno načítame úlohy
if (store.userName !== "") {
  store.load();
}

async function saveTodo(values) {
  try {
    await store.save(values, values.id);
    store.formTodo = null;
  } catch (e) {
    // Okno necháme otvorené, aby sa nestratilo, čo používateľ napísal
    store.formError = e.message;
  }
}

async function confirmDelete() {
  await store.remove(store.todoToDelete);
  store.todoToDelete = null;
}

async function confirmReset() {
  await store.reset();
  store.confirmReset = false;
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md py-3">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">TODO List</RouterLink>
        <!--router link namiesto href, href by stihaol stranku zo servera a zahodil celu appku, routerlink len vymeni komponent, appka bezi dalej-->

        <button class="navbar-toggler" type="button" @click="menuOpen = !menuOpen">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: menuOpen }"> <!--{nazov triedy: podmienka}-->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <!-- Odkaz Úlohy zvýrazníme na zozname aj na kalendári -->
              <RouterLink class="nav-link" :class="{ active: isTodoPage }" to="/" @click="menuOpen = false">
                Úlohy
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" exact-active-class="active" to="/o-projekte" @click="menuOpen = false">
                O projekte
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="container my-4">
    <!-- Dve oranžové škvrny v pozadí. Na kalendári si vymenia rohy. -->
    <div class="glows" :class="{ 'glows-calendar': route.name === 'calendar' }">
      <span class="glow glow-a"></span>
      <span class="glow glow-b"></span>
    </div>

    <template v-if="isTodoPage">
      <!-- Nadpis má zmysel až vtedy, keď je čo zobraziť.
           Pri zadávaní identifikátora by len prekážal. -->
      <h1 v-if="store.loaded" class="h3 mb-4 text-center text-md-start">Moje úlohy</h1>

      <!-- Zelená hláška po úspešnej operácii, sama zmizne po 3 sekundách -->
      <div v-if="store.message" class="alert alert-success">{{ store.message }}</div>

      <!-- Zadanie identifikátora, pod ktorým sa na serveri vedie zoznam úloh -->
      <div v-if="!store.loaded" class="card card-narrow mx-auto mb-4">
        <div class="card-body">
          <label for="user-name" class="form-label">Tvoj identifikátor</label>
          <!-- .prevent zabráni obnoveniu stránky po stlačení Enter -->
          <form class="input-group" @submit.prevent="store.load()">
            <input
              id="user-name"
              v-model="store.userName"
              type="text"
              class="form-control"
              placeholder="napr. marienka67"
            >
            <button type="submit" class="btn btn-primary" :disabled="store.loading">
              Načítať úlohy
            </button>
          </form>
        </div>
      </div>

      <template v-if="store.loaded">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-4">
          <span class="text-body-secondary">Zoznam používateľa</span>
          <strong>{{ store.userName }}</strong>
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="store.changeUser()">
            Zmeniť
          </button>

          <div class="ms-md-auto d-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="store.confirmReset = true"
            >
              Obnoviť ukážkové úlohy
            </button>
            <button type="button" class="btn btn-primary" @click="store.openNewForm()">Nová úloha</button>
          </div>
        </div>

        <!-- Prepínač zobrazení. RouterLink mení adresu bez načítania stránky
             a sám si pridá triedu active podľa toho, kde sa nachádzame. -->
        <ul class="nav nav-pills justify-content-center gap-1 mb-4">
          <li class="nav-item">
            <!-- exact-active-class: triedu active pridá router sám, keď sme na tejto adrese -->
            <RouterLink class="nav-link" exact-active-class="active" to="/">Zoznam</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" exact-active-class="active" to="/kalendar">Kalendár</RouterLink>
          </li>
        </ul>
      </template>

      <div v-if="store.loading" class="text-center my-5">
        <div class="spinner-border"></div>
        <p class="mt-2">Načítavam úlohy…</p>
      </div>

      <div v-if="store.error" class="alert alert-danger">{{ store.error }}</div>
    </template>

    <!-- Sem router vloží stránku podľa adresy -->
    <RouterView v-if="!store.loading" />
  </main>

  <footer class="py-3 mt-5">
    <div class="container text-center small">
      <p class="mb-1">&copy; 2026 Andrej Hudačko</p>
      <p class="mb-0">
        Použité knižnice: <a href="https://vuejs.org/">Vue 3</a>,
        <a href="https://router.vuejs.org/">Vue Router</a>,
        <a href="https://pinia.vuejs.org/">Pinia</a>,
        <a href="https://getbootstrap.com/">Bootstrap 5.3.3</a>,
        <a href="https://fullcalendar.io/">FullCalendar 6.1.15</a> |
        Font: <a href="https://fonts.google.com/specimen/Outfit">Outfit</a>
      </p>
    </div>
  </footer>

  <!-- Okná sú tu, aby boli dostupné zo zoznamu aj z kalendára -->
  <TodoForm
    v-if="store.formTodo"
    :initial="store.formTodo"
    :saving="store.saving"
    :error-text="store.formError"
    @save="saveTodo"
    @cancel="store.formTodo = null"
  />

  <TodoDetail
    v-if="store.detailTodo"
    :todo="store.detailTodo"
    :busy-id="store.busyId"
    @toggle="store.toggleDone"
    @edit="store.openEditForm"
    @delete="store.askDelete"
    @close="store.detailTodo = null"
  />

  <ConfirmDialog
    v-if="store.todoToDelete"
    title="Zmazať úlohu"
    confirm-text="Zmazať"
    busy-text="Mažem…"
    :busy="store.saving"
    @confirm="confirmDelete"
    @cancel="store.todoToDelete = null"
  >
    Naozaj chceš zmazať úlohu <strong>{{ store.todoToDelete.title }}</strong>?
    Táto akcia sa nedá vrátiť späť.
  </ConfirmDialog>

  <ConfirmDialog
    v-if="store.confirmReset"
    title="Obnoviť ukážkové úlohy"
    confirm-text="Obnoviť"
    busy-text="Obnovujem…"
    :busy="store.saving"
    @confirm="confirmReset"
    @cancel="store.confirmReset = false"
  >
    Všetky tvoje úlohy budú odstránené a nahradené piatimi ukážkovými úlohami.
    Táto akcia sa nedá vrátiť späť.
  </ConfirmDialog>
</template>
