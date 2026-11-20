<!--
  Stránka s kalendárom, adresa /#/kalendar (cvičenie 10b, views/).

  FullCalendar nie je Vue komponent, preto mu tu pripravím iba prázdny
  <div> a on si doň obsah vykreslí sám.

  Z cvičenia 10a, krok 1: onMounted - kalendár sa vykreslí až vtedy, keď
  je ten div naozaj v stránke.
  Z cvičenia 10b, krok 4: watch s { deep: true } - tam sa takto sledovalo
  pole obľúbených miest, tu sledujem zoznam úloh. Bez deep by watch nevidel
  zmenu vnútri úlohy (napríklad označenie ako dokončená).
-->
<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useTodosStore } from "../stores/todos.js";
import { toInputValue } from "../utils/dates.js";

const store = useTodosStore();

// Prázdny div, do ktorého FullCalendar vykreslí kalendár.
// ref="calendarEl" v šablóne spojí premennú s prvkom v stránke.
const calendarEl = ref(null);

// Inštancia kalendára. Nie je to ref, šablóna ju nepotrebuje.
let calendar = null;

// Farby úloh v kalendári (paleta Sunset), striedajú sa podľa id.
// Ku každej je aj pozadie: tá istá farba, len priesvitná.
// Posledné číslo v rgba() je priehľadnosť, 0.18 = 18 %.
const EVENT_COLORS = [
  { border: "#EA6113", background: "rgba(234, 97, 19, 0.18)" },
  { border: "#F88F22", background: "rgba(248, 143, 34, 0.18)" },
  { border: "#FBB931", background: "rgba(251, 185, 49, 0.18)" },
  { border: "#FFE3B3", background: "rgba(255, 227, 179, 0.18)" },
];

// Dokončená úloha je sivá
const DONE_COLOR = { border: "#5A5A5A", background: "rgba(90, 90, 90, 0.18)" };

// Prevedie úlohy na udalosti, ktorým kalendár rozumie
function calendarEvents() {
  return store.todos.map((todo) => {
    // Zvyšok po delení zaručí, že tá istá úloha má vždy tú istú farbu
    const color = todo.is_finished
      ? DONE_COLOR
      : EVENT_COLORS[todo.id % EVENT_COLORS.length];

    return {
      id: String(todo.id),
      title: todo.title,
      start: todo.date_from,
      end: todo.date_to,
      // Výrazný rámček v plnej farbe, pozadie len jej jemný odtieň
      backgroundColor: color.background,
      borderColor: color.border,
      classNames: todo.is_finished ? ["fc-event-done"] : [],
    };
  });
}

function renderCalendar() {
  if (calendarEl.value === null) {
    return;
  }

  // Starý kalendár zrušíme, aby sa udalosti nezdvojili
  if (calendar !== null) {
    calendar.destroy();
  }

  // FullCalendar berieme z CDN, preto je v globálnej premennej
  calendar = new FullCalendar.Calendar(calendarEl.value, {
    locale: "sk",
    initialView: "dayGridMonth",
    height: "auto",
    firstDay: 1,                      // týždeň začína pondelkom
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    buttonText: { today: "Dnes", month: "Mesiac", week: "Týždeň", day: "Deň" },
    // Bez tohto by kalendár pri nulových minútach písal len "0" namiesto "00:00".
    // Rovnaký tvar ako v zozname, kde čas formátuje toLocaleString.
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
    events: calendarEvents(),
    // Všetky úlohy ako farebné bloky, nie ako bodka s textom
    eventDisplay: "block",
    selectable: true,

    // Klik na úlohu otvorí jej detail
    eventClick: (info) => {
      const todo = store.todos.find((t) => t.id === Number(info.event.id));
      if (todo) {
        store.detailTodo = todo;
      }
    },

    // Výber dňa alebo časového úseku otvorí formulár s predvyplnenými dátumami
    select: (info) => {
      store.openNewForm(toInputValue(info.start.toISOString()), toInputValue(info.end.toISOString()));
      calendar.unselect();
    },
  });

  calendar.render();
}

// Kalendár vykreslíme po vložení stránky do DOM.
// nextTick počká, kým Vue naozaj vloží prázdny div, do ktorého sa kreslí.
onMounted(() => nextTick(renderCalendar));

// Pri odchode zo stránky kalendár uvoľníme
onUnmounted(() => {
  if (calendar !== null) {
    calendar.destroy();
    calendar = null;
  }
});

// Po každej zmene úloh kalendár prekreslíme.
// deep: true preto, že sa mení aj obsah jednotlivých úloh (napr. is_finished).
watch(() => store.todos, () => nextTick(renderCalendar), { deep: true });
</script>

<template>
  <div v-if="store.loaded">
    <div id="calendar" ref="calendarEl"></div>
    <p class="small text-body-secondary mt-3 mb-0">
      Kliknutím na úlohu zobrazíš jej detail. Ťahom cez dni alebo hodiny vytvoríš novú úlohu.
    </p>
  </div>
</template>
