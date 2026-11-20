<script setup>
import { ref, computed } from "vue";
import { useTodosStore } from "../stores/todos.js";
import { normalizeText } from "../utils/text.js";
import TodoItem from "../components/TodoItem.vue";

const store = useTodosStore();

const searchText = ref("");
const filterStatus = ref("all");
const sortBy = ref("date_from");

// computed sa prepocita sam pri zmene filtra, hladania alebo uloh (cv. 9)
const visibleTodos = computed(() => {
  let result = store.todos;

  if (filterStatus.value === "open") {
    result = result.filter((todo) => !todo.is_finished);
  } else if (filterStatus.value === "done") {
    result = result.filter((todo) => todo.is_finished);
  }

  const query = normalizeText(searchText.value);
  if (query !== "") {
    result = result.filter((todo) => normalizeText(todo.title).includes(query));
  }

  return [...result].sort((a, b) => new Date(a[sortBy.value]) - new Date(b[sortBy.value]));
});
</script>

<template>
  <div v-if="store.loaded">

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
