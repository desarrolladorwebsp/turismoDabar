import { CONTACT_EMAIL } from "@/lib/contact";
import { EMAIL_THEME, escapeHtml } from "@/lib/emails/email-theme";
import type { QuoteEmailContent, QuoteSubmissionPayload } from "@/lib/emails/types";

export function buildInternalNotificationEmail(
  data: QuoteSubmissionPayload
): QuoteEmailContent {
  const subject = `[Nueva cotización] ${data.school} — ${data.course}`;
  const receivedAt = new Date().toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    dateStyle: "full",
    timeStyle: "short",
  });

  const text = `Nueva solicitud de cotización web

Fecha: ${receivedAt}

Coordinador: ${data.fullName}
WhatsApp: ${data.phone}
Correo: ${data.email}

Colegio: ${data.school}
Curso: ${data.course}
Alumnos: ${data.studentCount}
Destino: ${data.destination}
Fecha estimada: ${data.travelYear}

Responder a: ${data.email}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${EMAIL_THEME.border};width:38%;font-size:13px;font-weight:700;color:${EMAIL_THEME.navy};vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${EMAIL_THEME.border};font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};vertical-align:top;">${value}</td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f4;font-family:Arial,Helvetica,sans-serif;color:${EMAIL_THEME.stone};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:${EMAIL_THEME.white};border:1px solid ${EMAIL_THEME.border};border-radius:12px;">
          <tr>
            <td style="padding:24px 28px;background-color:${EMAIL_THEME.navy};">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#fcd34d;font-weight:700;">Solicitud interna</p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">Nueva cotización desde la web</h1>
              <p style="margin:10px 0 0;font-size:13px;color:#dbeafe;">${escapeHtml(receivedAt)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${row("Coordinador", escapeHtml(data.fullName))}
                ${row("WhatsApp", `<a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="color:${EMAIL_THEME.coral};text-decoration:none;">${escapeHtml(data.phone)}</a>`)}
                ${row("Correo", `<a href="mailto:${escapeHtml(data.email)}" style="color:${EMAIL_THEME.coral};text-decoration:none;">${escapeHtml(data.email)}</a>`)}
                ${row("Colegio", escapeHtml(data.school))}
                ${row("Curso", escapeHtml(data.course))}
                ${row("Alumnos", escapeHtml(data.studentCount))}
                ${row("Destino", escapeHtml(data.destination))}
                ${row("Fecha estimada", escapeHtml(data.travelYear))}
              </table>

              <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${EMAIL_THEME.stoneMuted};">
                Responde directamente a este correo para contactar al solicitante. Notificación enviada a ${CONTACT_EMAIL}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
