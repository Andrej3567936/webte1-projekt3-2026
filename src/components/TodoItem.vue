<script setup>
import { formatDate, isOverdue } from "../utils/dates.js";

defineProps({
  todo: { type: Object, required: true },
  busyId: { type: Number, default: null },
});

defineEmits(["toggle", "edit", "delete"]);
</script>

<template>
  <div class="card mb-3" :class="{ 'todo-done': todo.is_finished, 'todo-overdue': isOverdue(todo) }">
    <div class="card-body d-flex gap-3 align-items-start">
      <input
        class="form-check-input mt-1 flex-shrink-0"
        type="checkbox"
        :checked="todo.is_finished"
        :disabled="busyId === todo.id"
        @change="$emit('toggle', todo, $event)"
      >

      <div class="flex-grow-1">
        <h2 class="h5 mb-1">{{ todo.title }}</h2>
        <p v-if="todo.description" class="text-body-secondary mb-2">{{ todo.description }}</p>
        <p class="small mb-0">
          {{ formatDate(todo.date_from) }} – {{ formatDate(todo.date_to) }}
        </p>
      </div>

      <div class="d-flex gap-2 flex-shrink-0">
        <button type="button" class="btn btn-sm btn-outline-secondary" @click="$emit('edit', todo)">
          Upraviť
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger" @click="$emit('delete', todo)">
          Zmazať
        </button>
      </div>
    </div>
  </div>
</template>
