/*
  Store (Pinia) - spoločný stav úloh.
  Prevzaté z cvičenia 10b, krok 3 (stores/favorites.js). Zapisuje sa
  rovnako ako <script setup>: ref je stav, computed odvodená hodnota,
  obyčajné funkcie sú akcie a všetko, čo má byť zvonka vidieť, treba
  vrátiť v return.

  Prečo store a nie obyčajné ref v App.vue: zoznam a kalendár sú dve
  stránky, ktoré nikdy nie sú na obrazovke naraz, a props/emit fungujú
  len medzi rodičom a dieťaťom (presne tento problém rieši cv. 10b, krok 3).

  localStorage je z cvičenia 10b, krok 4, ale ukladám doň iba identifikátor
  používateľa. Úlohy samotné musia byť podľa zadania na serveri.
*/
import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  setDone,
  setUndone,
  resetTodos,
} from "../services/todoApi.js";
import { toApiDate, toInputValue } from "../utils/dates.js";

// Do localStorage ukladáme iba identifikátor, aby ho používateľ nemusel
// písať pri každom otvorení. Samotné úlohy žijú výhradne na serveri.
const STORAGE_KEY = "todo-name";

export const useTodosStore = defineStore("todos", () => {
  // ---------- stav ----------

  const userName = ref(localStorage.getItem(STORAGE_KEY) ?? "");
  const todos = ref([]);

  const loaded = ref(false);   // sú úlohy načítané?
  const loading = ref(false);  // prebieha práve požiadavka na server?
  const saving = ref(false);   // prebieha ukladanie alebo mazanie?
  const busyId = ref(null);    // id úlohy, na ktorej práve beží operácia

  const error = ref("");       // chybová hláška
  const message = ref("");     // hláška o úspechu, sama zmizne

  // Okná (formulár, detail, potvrdenia) sú v App.vue, aby boli dostupné
  // zo zoznamu aj z kalendára. Preto je tu aj informácia, ktoré je otvorené.
  const formTodo = ref(null);     // úloha v upravovanom formulári, null = zavretý
  const formError = ref("");      // chyba z ukladania, zobrazí sa v okne formulára
  const detailTodo = ref(null);   // úloha zobrazená v detaile
  const todoToDelete = ref(null); // úloha, ktorej zmazanie sa potvrdzuje
  const confirmReset = ref(false);

  // ---------- hlášky ----------

  let messageTimer = null;

  function showMessage(text) {
    message.value = text;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => {
      message.value = "";
    }, 3000);
  }

  // ---------- načítanie ----------

  async function load() {
    if (userName.value.trim() === "") {
      error.value = "Zadaj svoj identifikátor.";
      return;
    }

    loading.value = true;
    error.value = "";

    try {
      todos.value = await getTodos(userName.value);
      localStorage.setItem(STORAGE_KEY, userName.value);
      loaded.value = true;
    } catch (e) {
      error.value = "Úlohy sa nepodarilo načítať. " + e.message;
    } finally {
      loading.value = false;
    }
  }

  function changeUser() {
    loaded.value = false;
    todos.value = [];
    error.value = "";
  }

  // ---------- zmeny úloh ----------

  // Hodnoty z formulára prevedie na tvar, ktorý čaká server
  function toApiTodo(form) {
    return {
      title: form.title.trim(),
      description: form.description.trim(),
      date_from: toApiDate(form.date_from),
      date_to: toApiDate(form.date_to),
      is_finished: form.is_finished,
    };
  }

  // Vytvorenie aj úprava, podľa toho či má úloha id.
  // Pri neúspechu vyhodí chybu, aby App.vue vedel nechať okno otvorené.
  async function save(form, id) {
    saving.value = true;

    try {
      if (id === null) {
        await createTodo(userName.value, toApiTodo(form));
      } else {
        await updateTodo(userName.value, id, toApiTodo(form));
      }

      // Zoznam obnovíme až po úspešnej odpovedi servera
      todos.value = await getTodos(userName.value);
      showMessage(id === null ? "Úloha je vytvorená." : "Úloha je upravená.");
    } catch (e) {
      throw new Error("Úlohu sa nepodarilo uložiť. " + e.message);
    } finally {
      saving.value = false;
    }
  }

  async function remove(todo) {
    saving.value = true;
    error.value = "";

    try {
      await deleteTodo(userName.value, todo.id);
      todos.value = await getTodos(userName.value);
      showMessage("Úloha je odstránená.");
    } catch (e) {
      error.value = "Úlohu sa nepodarilo odstrániť. " + e.message;
    } finally {
      saving.value = false;
    }
  }

  // Event je nepovinný: z detailu sa volá bez neho
  async function toggleDone(todo, event) {
    busyId.value = todo.id;
    error.value = "";

    try {
      if (todo.is_finished) {
        await setUndone(userName.value, todo.id);
      } else {
        await setDone(userName.value, todo.id);
      }
      // Stav meníme až po úspešnej odpovedi servera
      todo.is_finished = !todo.is_finished;
      showMessage(todo.is_finished ? "Úloha je dokončená." : "Úloha je znova otvorená.");
    } catch (e) {
      error.value = "Stav úlohy sa nepodarilo zmeniť. " + e.message;
      // Na serveri sa nič nezmenilo, vrátime políčko do pôvodného stavu
      if (event) {
        event.target.checked = todo.is_finished;
      }
    } finally {
      busyId.value = null;
    }
  }

  async function reset() {
    saving.value = true;
    error.value = "";

    try {
      await resetTodos(userName.value);
      todos.value = await getTodos(userName.value);
      showMessage("Ukážkové úlohy sú obnovené.");
    } catch (e) {
      error.value = "Ukážkové úlohy sa nepodarilo obnoviť. " + e.message;
    } finally {
      saving.value = false;
    }
  }

  // ---------- otváranie okien ----------

  // Prázdny formulár. Dátumy sa dajú predvyplniť z výberu v kalendári.
  function openNewForm(dateFrom = "", dateTo = "") {
    formError.value = "";
    formTodo.value = {
      id: null,
      title: "",
      description: "",
      date_from: dateFrom,
      date_to: dateTo,
      is_finished: false,
    };
  }

  // Ten istý formulár, ale predvyplnený údajmi existujúcej úlohy
  function openEditForm(todo) {
    formError.value = "";
    detailTodo.value = null;
    formTodo.value = {
      id: todo.id,
      title: todo.title,
      description: todo.description || "",
      date_from: toInputValue(todo.date_from),
      date_to: toInputValue(todo.date_to),
      is_finished: todo.is_finished,
    };
  }

  function askDelete(todo) {
    detailTodo.value = null;
    todoToDelete.value = todo;
  }

  // Von ide len to, čo komponenty naozaj potrebujú
  return {
    userName, todos, loaded, loading, saving, busyId, error, message,
    formTodo, formError, detailTodo, todoToDelete, confirmReset,
    load, changeUser, save, remove, toggleDone, reset,
    openNewForm, openEditForm, askDelete,
  };
});
