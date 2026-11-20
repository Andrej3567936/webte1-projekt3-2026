<script setup>
import { ref } from "vue";

const props = defineProps({
  initial: { type: Object, required: true },
  saving: { type: Boolean, default: false },
  errorText: { type: String, default: "" },
});

const emit = defineEmits(["save", "cancel"]);

const form = ref({ ...props.initial });

const errors = ref({});

function validate() {
  const found = {};

  if (form.value.title.trim() === "") {
    found.title = "Názov je povinný.";
  } else if (form.value.title.length > 200) {
    found.title = "Názov môže mať najviac 200 znakov.";
  }

  if (form.value.description.length > 1000) {
    found.description = "Popis môže mať najviac 1000 znakov.";
  }

  if (form.value.date_from === "") {
    found.date_from = "Zadaj začiatok úlohy.";
  }

  if (form.value.date_to === "") {
    found.date_to = "Zadaj koniec úlohy.";
  }

  if (form.value.date_from !== "" && form.value.date_to !== "" && form.value.date_from > form.value.date_to) {
    found.date_to = "Koniec nesmie byť skôr ako začiatok.";
  }

  errors.value = found;
  return Object.keys(found).length === 0;
}

function submit() {
  if (validate()) {
    emit("save", { ...form.value });
  }
}
</script>

<template>
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h5">
            {{ initial.id === null ? "Nová úloha" : "Upraviť úlohu" }}
          </h2>
          <button type="button" class="btn-close" @click="$emit('cancel')"></button>
        </div>

        <form @submit.prevent="submit">
          <div class="modal-body">
            <div class="mb-3">
              <label for="form-title" class="form-label">Názov</label>
              <input
                id="form-title"
                v-model="form.title"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.title }"
                maxlength="200"
              >
              <div class="invalid-feedback">{{ errors.title }}</div>
            </div>

            <div class="mb-3">
              <label for="form-description" class="form-label">Popis</label>
              <textarea
                id="form-description"
                v-model="form.description"
                class="form-control"
                rows="3"
                :class="{ 'is-invalid': errors.description }"
                maxlength="1000"
              ></textarea>
              <div class="invalid-feedback">{{ errors.description }}</div>
            </div>

            <div class="mb-3">
              <label for="form-from" class="form-label">Začiatok</label>
              <input
                id="form-from"
                v-model="form.date_from"
                type="datetime-local"
                class="form-control"
                :class="{ 'is-invalid': errors.date_from }"
              >
              <div class="invalid-feedback">{{ errors.date_from }}</div>
            </div>

            <div class="mb-3">
              <label for="form-to" class="form-label">Koniec</label>
              <input
                id="form-to"
                v-model="form.date_to"
                type="datetime-local"
                class="form-control"
                :class="{ 'is-invalid': errors.date_to }"
              >
              <div class="invalid-feedback">{{ errors.date_to }}</div>
            </div>

            <div v-if="initial.id !== null" class="form-check mb-3">
              <input id="form-finished" v-model="form.is_finished" class="form-check-input" type="checkbox">
              <label class="form-check-label" for="form-finished">Úloha je dokončená</label>
            </div>

            <div v-if="errorText" class="alert alert-danger mb-0">{{ errorText }}</div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Zrušiť</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? "Ukladám…" : "Uložiť" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal-backdrop show"></div>
</template>
