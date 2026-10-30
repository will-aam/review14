/**
 * Gera um slug limpo, amigável para URLs e QR Codes a partir do Nome Fantasia
 * Ex: "Café & Bistrô Aurora" -> "cafe-bistro-aurora"
 */
export function generateSlug(input: string): string {
  if (!input || !input.trim()) return "";

  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/&/g, "e") // substitui & por e
    .replace(/[^a-z0-9\s-]/g, "") // remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-") // espaços viram hífens
    .replace(/-+/g, "-") // hífens duplicados viram um só
    .replace(/^-+|-+$/g, ""); // remove hífens no início e fim
}
