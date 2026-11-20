<!--
  Stránka O projekte, adresa /#/o-projekte.
  Nič nenačítava, je to len text - podobne ako rozcestník HomeView
  v cvičení 10b (krok 2). Preto tu nie je ani <script setup>.
-->
<template>
  <h1 class="mb-4 text-center text-md-start">O projekte</h1>

  <div class="card mb-4">
    <div class="card-body">
      <h2 class="h5">Čo aplikácia robí</h2>
      <p class="mb-0">
        <strong>Môj TODO List</strong> slúži na správu osobných úloh. Umožňuje úlohy vytvárať,
        upravovať, označovať ako dokončené a odstraňovať. Okrem klasického zoznamu ponúka aj
        kalendár, v ktorom vidno úlohy rozložené v čase.
      </p>
    </div>
  </div>

  <div class="card mb-4">
    <div class="card-body">
      <h2 class="h5">Ako funguje</h2>
      <p>
        Všetky údaje sa uchovávajú na serveri a aplikácia s nimi pracuje cez REST API na adrese
        <a href="https://wt1zadanie.iolab.sk">wt1zadanie.iolab.sk</a>. Každý používateľ má vlastný
        zoznam, ktorý sa určí identifikátorom zadaným pri otvorení aplikácie.
      </p>
      <p class="mb-0">
        Zoznam aj kalendár čerpajú z tých istých údajov, takže zmena vykonaná v jednej časti sa
        okamžite prejaví aj v druhej.
      </p>
    </div>
  </div>

  <div class="card mb-4">
    <div class="card-body">
      <h2 class="h5">Použité technológie</h2>
      <ul class="mb-0">
        <li><a href="https://vuejs.org/">Vue 3</a> – JavaScriptový framework na tvorbu
          používateľského rozhrania, projekt je zložený z komponentov (.vue)</li>
        <li><a href="https://vite.dev/">Vite</a> – nástroj, ktorý komponenty spojí do
          jedného súboru pre prehliadač</li>
        <li><a href="https://router.vuejs.org/">Vue Router</a> – prepínanie stránok
          (zoznam, kalendár, o projekte) bez načítania celej stránky</li>
        <li><a href="https://pinia.vuejs.org/">Pinia</a> – spoločný stav aplikácie,
          takže zoznam aj kalendár pracujú s tými istými úlohami</li>
        <li><a href="https://getbootstrap.com/">Bootstrap 5.3.3</a> – CSS framework,
          mriežka, formuláre a modálne okná</li>
        <li><a href="https://fullcalendar.io/">FullCalendar 6.1.15</a> – knižnica kalendára
          (mesačné, týždenné a denné zobrazenie)</li>
        <li>Fetch API – komunikácia so serverom</li>
        <li>Font <a href="https://fonts.google.com/specimen/Outfit">Outfit</a>
          (SIL Open Font License), uložený lokálne</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h2 class="h5">Autor</h2>
      <p class="mb-0">
        Andrej Hudačko, FEI STU<br>
        Predmet Webové technológie 1, zadanie č. 3, ZS 2026/2027
      </p>
    </div>
  </div>
</template>
