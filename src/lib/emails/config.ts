import { CONTACT_EMAIL } from "@/lib/contact";

/**
 * Remitente de salida (envío vía Resend).
 * No debe ser la misma casilla que RESEND_NOTIFY_EMAIL: muchos servidores
 * descartan correos donde From y To son idénticos.
 */
export const RESEND_FROM_ADDRESS = "noreply@turismodabar.cl";

export const RESEND_FROM_EMAIL_DEFAULT = `Turismo Dabar <${RESEND_FROM_ADDRESS}>`;

/** Bandeja que recibe nuevas solicitudes de cotización */
export const RESEND_NOTIFY_EMAIL_DEFAULT = CONTACT_EMAIL;

export function getResendFromAddress() {
  return process.env.RESEND_FROM_EMAIL?.trim() || RESEND_FROM_EMAIL_DEFAULT;
}

export function getResendNotifyEmail() {
  return process.env.RESEND_NOTIFY_EMAIL?.trim() || RESEND_NOTIFY_EMAIL_DEFAULT;
}

/** Copia opcional de alertas internas (ej. correo personal de respaldo) */
export function getResendNotifyCc(): string[] {
  const raw = process.env.RESEND_NOTIFY_CC?.trim();
  if (!raw) return [];

  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada.");
  }

  return apiKey;
}
