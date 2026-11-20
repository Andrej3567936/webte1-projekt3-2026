/*
  Pomocné funkcie na dátumy.
  formatDate je prevzaté z cvičenia 10a, krok 4 (tam sa volalo formatTime):
  server posiela dátum v ISO 8601 a toLocaleString("sk-SK", ...) z neho
  spraví čitateľný text v našom časovom pásme.

  toInputValue a toApiDate cvičenie nemalo, tam sa dátum nezadával.
  Potrebujem ich na prevod medzi ISO 8601 (server) a tvarom, ktorý chce
  <input type="datetime-local"> (napríklad 2026-11-22T20:00).
*/
// Prevedie ISO dátum zo servera na čitateľný text v lokálnom čase
export function formatDate(isoString) {
  return new Date(isoString).toLocaleString("sk-SK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Prevedie ISO dátum zo servera na hodnotu pre <input type="datetime-local">
export function toInputValue(isoString) {
  const date = new Date(isoString);
  // Odpočítame posun časového pásma, aby toISOString vrátil lokálny čas
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

// Prevedie hodnotu z <input type="datetime-local"> na ISO 8601 pre server
export function toApiDate(inputValue) {
  return new Date(inputValue).toISOString();
}

// Uplynul už termín úlohy? Dokončené úlohy sa za omeškané nepovažujú.
export function isOverdue(todo) {
  return !todo.is_finished && new Date(todo.date_to) < new Date();
}
