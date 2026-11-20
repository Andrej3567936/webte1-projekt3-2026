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

const STORAGE_KEY = "todo-name";

export const useTodosStore = defineStore("todos", () => {
  const userName = ref(localStorage.getItem(STORAGE_KEY) ?? "");
  const todos = ref([]);

  const loaded = ref(false);
  const loading = ref(false);
  const saving = ref(false);
  const busyId = ref(null);

  const error = ref("");
  const message = ref("");

  const formTodo = ref(null);
  const formError = ref("");
  const detailTodo = ref(null);
  const todoToDelete = ref(null);
  const confirmReset = ref(false);

  let messageTimer = null;

  function showMessage(text) {
    message.value = text;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => {
      message.value = "";
    }, 3000);
  }

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

  function toApiTodo(form) {
    return {
      title: form.title.trim(),
      description: form.description.trim(),
      date_from: toApiDate(form.date_from),
      date_to: toApiDate(form.date_to),
      is_finished: form.is_finished,
    };
  }

  async function save(form, id) {
    saving.value = true;

    try {
      if (id === null) {
        await createTodo(userName.value, toApiTodo(form));
      } else {
        await updateTodo(userName.value, id, toApiTodo(form));
      }

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

  async function toggleDone(todo, event) {
    busyId.value = todo.id;
    error.value = "";

    try {
      if (todo.is_finished) {
        await setUndone(userName.value, todo.id);
      } else {
        await setDone(userName.value, todo.id);
      }

      todo.is_finished = !todo.is_finished;
      showMessage(todo.is_finished ? "Úloha je dokončená." : "Úloha je znova otvorená.");
    } catch (e) {
      error.value = "Stav úlohy sa nepodarilo zmeniť. " + e.message;

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

  return {
    userName, todos, loaded, loading, saving, busyId, error, message,
    formTodo, formError, detailTodo, todoToDelete, confirmReset,
    load, changeUser, save, remove, toggleDone, reset,
    openNewForm, openEditForm, askDelete,
  };
});
