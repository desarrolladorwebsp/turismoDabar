import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact";
import { buildClientConfirmationEmail } from "@/lib/emails/templates/client-confirmation";
import { buildInternalNotificationEmail } from "@/lib/emails/templates/internal-notification";
import type { QuoteSubmissionPayload } from "@/lib/emails/types";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada.");
  }

  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Turismo Dabar <onboarding@resend.dev>"
  );
}

export async function sendQuoteEmails(data: QuoteSubmissionPayload) {
  const resend = getResendClient();
  const from = getFromAddress();

  const internalEmail = buildInternalNotificationEmail(data);
  const clientEmail = buildClientConfirmationEmail(data);

  const [internalResult, clientResult] = await Promise.all([
    resend.emails.send({
      from,
      to: [CONTACT_EMAIL],
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
    throw new Error(internalResult.error.message);
  }

  if (clientResult.error) {
    throw new Error(clientResult.error.message);
  }

  return {
    internalId: internalResult.data?.id,
    clientId: clientResult.data?.id,
  };
}
