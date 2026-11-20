/*
  Pomocná funkcia na text. Vo cvičeniach nebola, potrebujem ju na hľadanie
  v zozname úloh.
*/
// Zjednotí text na porovnávanie: malé písmená a bez diakritiky.
// Vďaka tomu "nakup" nájde aj "Nakúpiť".
export function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")                 // rozloží písmeno na znak + dĺžeň/mäkčeň
    .replace(/[\u0300-\u036f]/g, ""); // a tie značky zahodí
}
