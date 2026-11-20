<!--
  Potvrdzovacie okno. Používa sa dvakrát: pri mazaní úlohy a pri obnovení
  ukážkových úloh, preto je to samostatný komponent a nie dvakrát
  prekopírovaný kus HTML.

  Props a emit sú z cvičenia 9 (krok 4 a 5). Navyše je tu <slot>: text
  otázky doň vloží rodič, keď komponent použije.
-->
<script setup>
// Opakovane použiteľné potvrdzovacie okno.
// Používa sa pri mazaní úlohy aj pri obnovení ukážkových dát.
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
          <!-- Text otázky vloží rodič medzi značky komponentu -->
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
