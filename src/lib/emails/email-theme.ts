/** Paleta Aventura Mate — valores seguros para clientes de correo */
export const EMAIL_THEME = {
  navy: "#1a2b4c",
  navySoft: "#2a3f66",
  cream: "#fbfaf7",
  coral: "#b15c47",
  coralDark: "#9a4d3a",
  stone: "#44403c",
  stoneMuted: "#78716c",
  border: "#e7e5e4",
  white: "#ffffff",
} as const;

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
