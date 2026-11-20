// Prevody medzi ISO 8601 zo servera a tvarom pre datetime-local
export function formatDate(isoString) {
  return new Date(isoString).toLocaleString("sk-SK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toInputValue(isoString) {
  const date = new Date(isoString);

  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export function toApiDate(inputValue) {
  return new Date(inputValue).toISOString();
}

export function isOverdue(todo) {
  return !todo.is_finished && new Date(todo.date_to) < new Date();
}
