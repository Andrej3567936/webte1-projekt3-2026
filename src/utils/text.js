// Male pismena a bez diakritiky, aby "nakup" naslo aj "Nakupit"
export function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
