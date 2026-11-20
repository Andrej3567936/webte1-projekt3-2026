<script setup>
import { formatDate } from "../utils/dates.js";

defineProps({
  todo: { type: Object, required: true },
  busyId: { type: Number, default: null },
});

defineEmits(["toggle", "edit", "delete", "close"]);
</script>

<template>
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h5">{{ todo.title }}</h2>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <p v-if="todo.description" class="text-body-secondary">{{ todo.description }}</p>

          <p class="mb-2">
            <span class="text-body-secondary">Od:</span> {{ formatDate(todo.date_from) }}<br>
            <span class="text-body-secondary">Do:</span> {{ formatDate(todo.date_to) }}
          </p>

          <p class="mb-0">
            <span class="badge" :class="todo.is_finished ? 'badge-done' : 'badge-open'">
              {{ todo.is_finished ? "Dokončená" : "Nedokončená" }}
            </span>
          </p>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            :disabled="busyId === todo.id"
            @click="$emit('toggle', todo)"
          >
            {{ todo.is_finished ? "Označiť ako nedokončenú" : "Označiť ako dokončenú" }}
          </button>
          <button type="button" class="btn btn-outline-danger" @click="$emit('delete', todo)">Zmazať</button>
          <button type="button" class="btn btn-primary" @click="$emit('edit', todo)">Upraviť</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-backdrop show"></div>
</template>
