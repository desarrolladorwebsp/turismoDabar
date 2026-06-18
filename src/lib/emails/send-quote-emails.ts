import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact";
import {
  getResendApiKey,
  getResendFromAddress,
  getResendNotifyEmail,
} from "@/lib/emails/config";
import { buildClientConfirmationEmail } from "@/lib/emails/templates/client-confirmation";
import { buildInternalNotificationEmail } from "@/lib/emails/templates/internal-notification";
import type { QuoteSubmissionPayload } from "@/lib/emails/types";

/**
 * Envía dos correos por cada solicitud de cotización:
 * 1. Notificación interna → experiencias@turismodabar.cl
 * 2. Confirmación al cliente → correo del formulario
 */
export async function sendQuoteEmails(data: QuoteSubmissionPayload) {
  const resend = new Resend(getResendApiKey());
  const from = getResendFromAddress();
  const notifyEmail = getResendNotifyEmail();

  const internalEmail = buildInternalNotificationEmail(data, notifyEmail);
  const clientEmail = buildClientConfirmationEmail(data);

  const [internalResult, clientResult] = await Promise.all([
    resend.emails.send({
      from,
      to: [notifyEmail],
      replyTo: data.email,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
    }),
    resend.emails.send({
      from,
      to: [data.email],
      replyTo: CONTACT_EMAIL,
      subject: clientEmail.subject,
      html: clientEmail.html,
      text: clientEmail.text,
    }),
  ]);

  if (internalResult.error) {
    throw new Error(
      `No se pudo enviar la notificación interna: ${internalResult.error.message}`
    );
  }

  if (clientResult.error) {
    throw new Error(
      `No se pudo enviar la confirmación al cliente: ${clientResult.error.message}`
    );
  }

  return {
    internalId: internalResult.data?.id,
    clientId: clientResult.data?.id,
  };
}
