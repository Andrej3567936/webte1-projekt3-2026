<script setup>

defineProps({
  title: { type: String, required: true },
  confirmText: { type: String, default: "Potvrdiť" },
  busyText: { type: String, default: "Pracujem…" },
  busy: { type: Boolean, default: false },
});

defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h5">{{ title }}</h2>
          <button type="button" class="btn-close" @click="$emit('cancel')"></button>
        </div>

        <div class="modal-body">

          <slot></slot>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Zrušiť</button>
          <button type="button" class="btn btn-danger" :disabled="busy" @click="$emit('confirm')">
            {{ busy ? busyText : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-backdrop show"></div>
</template>
