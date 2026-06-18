import { CONTACT_EMAIL } from "@/lib/contact";

/** Remitente verificado en Resend con dominio turismodabar.cl */
export const RESEND_FROM_EMAIL_DEFAULT = `Turismo Dabar <${CONTACT_EMAIL}>`;

/** Bandeja interna que recibe nuevas solicitudes de cotización */
export const RESEND_NOTIFY_EMAIL_DEFAULT = CONTACT_EMAIL;

export function getResendFromAddress() {
  return process.env.RESEND_FROM_EMAIL?.trim() || RESEND_FROM_EMAIL_DEFAULT;
}

export function getResendNotifyEmail() {
  return process.env.RESEND_NOTIFY_EMAIL?.trim() || RESEND_NOTIFY_EMAIL_DEFAULT;
}

export function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada.");
  }

  return apiKey;
}
