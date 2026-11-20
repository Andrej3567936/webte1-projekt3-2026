<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useTodosStore } from "../stores/todos.js";
import { toInputValue } from "../utils/dates.js";

const store = useTodosStore();

const calendarEl = ref(null);

let calendar = null;

const EVENT_COLORS = [
  { border: "#EA6113", background: "rgba(234, 97, 19, 0.18)" },
  { border: "#F88F22", background: "rgba(248, 143, 34, 0.18)" },
  { border: "#FBB931", background: "rgba(251, 185, 49, 0.18)" },
  { border: "#FFE3B3", background: "rgba(255, 227, 179, 0.18)" },
];

const DONE_COLOR = { border: "#5A5A5A", background: "rgba(90, 90, 90, 0.18)" };

function calendarEvents() {
  return store.todos.map((todo) => {
    const color = todo.is_finished
      ? DONE_COLOR
      : EVENT_COLORS[todo.id % EVENT_COLORS.length];

    return {
      id: String(todo.id),
      title: todo.title,
      start: todo.date_from,
      end: todo.date_to,

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

  if (calendar !== null) {
    calendar.destroy();
  }

  calendar = new FullCalendar.Calendar(calendarEl.value, {
    locale: "sk",
    initialView: "dayGridMonth",
    height: "auto",
    firstDay: 1,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    buttonText: { today: "Dnes", month: "Mesiac", week: "Týždeň", day: "Deň" },

    eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
    events: calendarEvents(),

    eventDisplay: "block",
    selectable: true,

    eventClick: (info) => {
      const todo = store.todos.find((t) => t.id === Number(info.event.id));
      if (todo) {
        store.detailTodo = todo;
      }
    },

    select: (info) => {
      store.openNewForm(toInputValue(info.start.toISOString()), toInputValue(info.end.toISOString()));
      calendar.unselect();
    },
  });

  calendar.render();
}

onMounted(() => nextTick(renderCalendar));

onUnmounted(() => {
  if (calendar !== null) {
    calendar.destroy();
    calendar = null;
  }
});

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
