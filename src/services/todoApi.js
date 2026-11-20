// Vsetky volania servera na jednom mieste (cv. 10a)
const API_URL = "https://wt1zadanie.iolab.sk/api";

async function errorDetail(response) {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") {
      return ": " + data.detail;
    }

    if (Array.isArray(data.detail) && data.detail.length > 0) {
      return ": " + data.detail[0].msg;
    }
  } catch (e) {
  }

  return "";
}

async function request(path, options) {
  const response = await fetch(API_URL + path, options);

  // fetch pri stave 403 ani 500 chybu sam nevyhodi, musime to spravit my
  if (!response.ok) {
    throw new Error(`Server vrátil chybu ${response.status}${await errorDetail(response)}`);
  }

  // DELETE vracia prazdne telo, to sa na JSON previest neda
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function userPath(name) {
  return "/" + encodeURIComponent(name);
}

export async function getTodos(name) {
  // Server vracia objekt so studentom, ulohy su az v kluci todos
  const data = await request(userPath(name));
  return data.todos;
}

export function createTodo(name, todo) {
  return request(userPath(name), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

export function updateTodo(name, id, todo) {
  return request(`${userPath(name)}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

export function deleteTodo(name, id) {
  return request(`${userPath(name)}/${id}`, { method: "DELETE" });
}

export function setDone(name, id) {
  return request(`${userPath(name)}/${id}/done`, { method: "PATCH" });
}

export function setUndone(name, id) {
  return request(`${userPath(name)}/${id}/undone`, { method: "PATCH" });
}

export function resetTodos(name) {
  return request(`${userPath(name)}/reset`, { method: "POST" });
}
