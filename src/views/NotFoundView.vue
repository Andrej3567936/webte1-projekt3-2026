<!--
  Stránka pre adresu, ktorá neexistuje.
  Prevzaté z cvičenia 10b, krok 5 (bonus). Cesta /:pathMatch(.*)* v routeri
  chytí všetko, čo nesedí so žiadnou inou cestou.
-->
<script setup>
// Stránka pre adresu, ktorá neexistuje. Router ju použije pri ceste,
// ktorá nesedí so žiadnou inou (pozri router/index.js).
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="card card-narrow mx-auto">
    <div class="card-body">
      <h1 class="h4">Stránka sa nenašla</h1>
      <p class="text-body-secondary">Zadaná adresa v aplikácii neexistuje.</p>
      <RouterLink class="btn btn-primary" to="/">Späť na úlohy</RouterLink>
    </div>
  </div>
</template>
