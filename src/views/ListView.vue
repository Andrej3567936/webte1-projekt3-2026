<!--
  Stránka so zoznamom úloh, adresa /#/ (cvičenie 10b, views/).

  Z cvičenia 9, krok 2: v-for so :key.
  Z cvičenia 9, krok 3: computed. visibleTodos sa prepočíta samo vždy,
  keď sa zmení hľadaný text, filter, zoradenie alebo samotné úlohy.
  Netreba to nikde volať ručne, ako sme to robili pred Vue.

  Filtre sú schválne tu a nie v store: cvičenie 10b (krok 3) hovorí, že
  stav jednej stránky patrí do komponentu a do store ide len to, čo
  zdieľa viac stránok.
-->
<script setup>
import { ref, computed } from "vue";
import { useTodosStore } from "../stores/todos.js";
import { normalizeText } from "../utils/text.js";
import TodoItem from "../components/TodoItem.vue";

const store = useTodosStore();

// Nastavenie filtrov. Patrí iba tejto stránke, takže nie je v store.
const searchText = ref("");
const filterStatus = ref("all");    // all | open | done
const sortBy = ref("date_from");    // date_from | date_to

// Zoznam po filtrovaní, hľadaní a zoradení.
// computed sa prepočíta sám, keď sa zmení filter alebo úlohy.
const visibleTodos = computed(() => {
  let result = store.todos;

  // Filter podľa stavu dokončenia
  if (filterStatus.value === "open") {
    result = result.filter((todo) => !todo.is_finished);
  } else if (filterStatus.value === "done") {
    result = result.filter((todo) => todo.is_finished);
  }

  // Hľadanie podľa názvu, bez ohľadu na veľkosť písmen a diakritiku
  const query = normalizeText(searchText.value);
  if (query !== "") {
    result = result.filter((todo) => normalizeText(todo.title).includes(query));
  }

  // Zoradenie podľa zvoleného dátumu. Kópia poľa, aby sa nemenilo pôvodné.
  return [...result].sort((a, b) => new Date(a[sortBy.value]) - new Date(b[sortBy.value]));
});
</script>

<template>
  <div v-if="store.loaded">
    <!-- Filtrovanie, hľadanie a zoradenie zoznamu -->
    <div class="row g-2 mb-4">
      <div class="col-12 col-md">
        <input v-model="searchText" type="search" class="form-control" placeholder="Hľadať podľa názvu…">
      </div>
      <div class="col-6 col-md-auto">
        <select v-model="filterStatus" class="form-select">
          <option value="all">Všetky</option>
          <option value="open">Nedokončené</option>
          <option value="done">Dokončené</option>
        </select>
      </div>
      <div class="col-6 col-md-auto">
        <select v-model="sortBy" class="form-select">
          <option value="date_from">Zoradiť podľa začiatku</option>
          <option value="date_to">Zoradiť podľa konca</option>
        </select>
      </div>
    </div>

    <p v-if="store.todos.length === 0" class="text-body-secondary">
      Zatiaľ nemáš žiadne úlohy.
    </p>
    <p v-else-if="visibleTodos.length === 0" class="text-body-secondary">
      Žiadna úloha nevyhovuje zadanému filtru.
    </p>

    <!-- Vlastný komponent. Údaje mu posielame cez props (:todo, :busy-id),
         späť nám hlási kliknutia cez emit (@toggle, @edit, @delete). -->
    <TodoItem
      v-for="todo in visibleTodos"
      :key="todo.id"
      :todo="todo"
      :busy-id="store.busyId"
      @toggle="store.toggleDone"
      @edit="store.openEditForm"
      @delete="store.askDelete"
    />
  </div>
</template>
