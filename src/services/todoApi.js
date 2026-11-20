/*
  Servisný modul - všetky volania servera na jednom mieste.
  Prevzaté z cvičenia 10a, krok 1 (tam sa to volalo weatherApi.js).
  Myšlienka je rovnaká: komponent iba zavolá getTodos(meno) a nemusí
  vedieť nič o URL adresách, metódach ani hlavičkách.

  Oproti cvičeniu 10a je tu navyše:
   - kontrola response.ok (cv. 10a, krok 3), lebo fetch pri chybe 403
     alebo 422 sám nič nevyhodí
   - encodeURIComponent na mene v adrese (cv. 10a, krok 3)
   - metódy POST, PUT, PATCH a DELETE; cvičenie malo iba GET
*/
const API_URL = "https://wt1zadanie.iolab.sk/api";

// Zo serverovej odpovede vytiahne vysvetlenie chyby, ak nejaké poslal.
// Server ho posiela v poli detail: raz ako text, pri neplatných údajoch ako zoznam.
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
    // Odpoveď nebola JSON, ostaneme len pri čísle chyby
  }

  return "";
}

// Pošle požiadavku a vráti odpoveď prevedenú z JSON.
// Druhý argument fetch je nastavenie požiadavky (metóda, hlavičky, telo).
async function request(path, options) {
  const response = await fetch(API_URL + path, options);

  // fetch pri stave 400 ani 500 chybu sám nevyhodí, musíme to spraviť my
  if (!response.ok) {
    throw new Error(`Server vrátil chybu ${response.status}${await errorDetail(response)}`);
  }

  // DELETE vracia prázdnu odpoveď, tú sa nedá previesť na JSON
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Identifikátor zadáva používateľ, preto ho do adresy vkladáme cez encodeURIComponent
function userPath(name) {
  return "/" + encodeURIComponent(name);
}

// Načíta zoznam úloh. Server vracia objekt so študentom, úlohy sú v kľúči todos.
export async function getTodos(name) {
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

// PUT nahrádza celú úlohu, preto posielame všetky polia
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

// Obnoví päť ukážkových úloh, pôvodné sa zmažú
export function resetTodos(name) {
  return request(`${userPath(name)}/reset`, { method: "POST" });
}
