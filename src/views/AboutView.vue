<script setup>

function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <h1 class="h2 mb-3 text-center text-md-start">O projekte</h1>

  <nav class="mb-4">
    <ul class="nav nav-pills flex-wrap justify-content-center justify-content-md-start gap-1">
      <li class="nav-item">
        <button type="button" class="nav-link" @click="scrollTo('aplikacia')">Aplikácia</button>
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link" @click="scrollTo('data')">Spracovanie dát</button>
      </li>
      <li class="nav-item">
        <button type="button" class="nav-link" @click="scrollTo('kniznice')">Použité knižnice</button>
      </li>
    </ul>
  </nav>

  <section id="aplikacia" class="card mb-4">
    <div class="card-body">
      <h2 class="h4">Aplikácia</h2>
      <p class="mb-0">
        Môj TODO List slúži na správu osobných úloh. Úlohy sa dajú vytvárať, upravovať,
        označovať ako dokončené a mazať. Okrem zoznamu, ktorý sa dá filtrovať podľa stavu,
        prehľadávať podľa názvu a zoraďovať podľa dátumu, je tu aj kalendár s mesačným,
        týždenným a denným zobrazením.
      </p>
    </div>
  </section>

  <section id="data" class="card mb-4">
    <div class="card-body">
      <h2 class="h4">Spracovanie dát</h2>
      <p>
        Všetky úlohy sú na serveri a aplikácia s nimi pracuje cez REST API na adrese
        <a href="https://wt1zadanie.iolab.sk" target="_blank" rel="noopener">wt1zadanie.iolab.sk</a>.
        Volania servera sú oddelené od rozhrania v module <code>services/todoApi.js</code>.
        Každý používateľ má vlastný zoznam, ktorý sa určí identifikátorom zadaným pri otvorení.
        Do <code>localStorage</code> sa ukladá iba ten identifikátor, úlohy nikdy.
      </p>
      <p class="mb-0">
        Načítané úlohy drží spoločný stav (Pinia), takže zoznam aj kalendár čerpajú z tých
        istých dát a zmena v jednom sa hneď prejaví v druhom. Dátumy chodia zo servera
        v ISO 8601 a zobrazujú sa v lokálnom čase používateľa.
      </p>
    </div>
  </section>

  <section id="kniznice" class="card mb-4">
    <div class="card-body">
      <h2 class="h4">Použité knižnice</h2>
      <ul class="mb-0">
        <li>
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
          a <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a>:
          komponenty a zostavenie projektu
        </li>
        <li>
          <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router 4</a>:
          prepínanie stránok bez načítania celej stránky
        </li>
        <li>
          <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>:
          spoločný stav úloh
        </li>
        <li>
          <a href="https://getbootstrap.com/" target="_blank" rel="noopener">Bootstrap 5.3.3</a>
          (CSS): rozloženie, karty, formuláre, modálne okná
        </li>
        <li>
          <a href="https://fullcalendar.io/" target="_blank" rel="noopener">FullCalendar 6.1.15</a>:
          knižnica kalendára, mesačné, týždenné a denné zobrazenie
        </li>
        <li>
          Font <a href="https://fonts.google.com/specimen/Outfit" target="_blank" rel="noopener">Outfit</a>
          (lokálne, licencia v README)
        </li>
      </ul>
    </div>
  </section>

</template>
