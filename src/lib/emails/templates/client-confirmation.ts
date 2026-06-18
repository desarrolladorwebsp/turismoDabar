import {
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";
import { SITE_URL } from "@/lib/seo";
import { EMAIL_THEME, escapeHtml } from "@/lib/emails/email-theme";
import type { QuoteEmailContent, QuoteSubmissionPayload } from "@/lib/emails/types";

export function buildClientConfirmationEmail(
  data: QuoteSubmissionPayload
): QuoteEmailContent {
  const firstName = escapeHtml(data.fullName.split(" ")[0] || data.fullName);

  const subject = "Recibimos tu solicitud de cotización — Turismo Dabar";

  const text = `Hola ${data.fullName},

Gracias por contactar a Turismo Dabar. Recibimos tu solicitud de cotización para el curso ${data.course} de ${data.school}.

Resumen de tu solicitud:
- Coordinador: ${data.fullName}
- WhatsApp: ${data.phone}
- Correo: ${data.email}
- Colegio: ${data.school}
- Curso: ${data.course}
- Destino: ${data.destination}
- Cantidad de alumnos: ${data.studentCount}
- Fecha estimada: ${data.travelYear}

Un coordinador revisará tu información y te contactará lo antes posible en horario comercial.

Si necesitas una respuesta más rápida:
WhatsApp: ${WHATSAPP_DISPLAY}
Correo: ${CONTACT_EMAIL}

Turismo Dabar
${SITE_URL}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL_THEME.cream};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_THEME.stone};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${EMAIL_THEME.cream};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:${EMAIL_THEME.white};border:1px solid ${EMAIL_THEME.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background-color:${EMAIL_THEME.navy};padding:28px 32px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#fcd34d;font-weight:700;">Turismo Dabar</p>
              <h1 style="margin:0;font-size:24px;line-height:1.25;color:#ffffff;font-weight:700;">Solicitud recibida</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${EMAIL_THEME.stone};">
                Hola <strong>${firstName}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:${EMAIL_THEME.stoneMuted};">
                Gracias por confiar en Turismo Dabar. Recibimos tu solicitud de cotización y un coordinador te contactará lo antes posible con una propuesta pensada para tu curso.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${EMAIL_THEME.cream};border:1px solid ${EMAIL_THEME.border};border-radius:12px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.navy};font-weight:700;">Resumen de tu solicitud</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Coordinador:</strong> ${escapeHtml(data.fullName)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>WhatsApp:</strong> ${escapeHtml(data.phone)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Colegio:</strong> ${escapeHtml(data.school)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Curso:</strong> ${escapeHtml(data.course)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Destino:</strong> ${escapeHtml(data.destination)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Alumnos:</strong> ${escapeHtml(data.studentCount)}</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.5;color:${EMAIL_THEME.stone};"><strong>Fecha estimada:</strong> ${escapeHtml(data.travelYear)}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:${EMAIL_THEME.stoneMuted};">
                Respondemos en horario comercial. Si prefieres una respuesta inmediata, escríbenos por WhatsApp.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                <tr>
                  <td style="border-radius:10px;background-color:${EMAIL_THEME.coral};">
                    <a href="${WHATSAPP_URL}" style="display:inline-block;padding:13px 22px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">Escribir por WhatsApp</a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${EMAIL_THEME.stoneMuted};">
                WhatsApp: <a href="${WHATSAPP_URL}" style="color:${EMAIL_THEME.navy};text-decoration:none;">${WHATSAPP_DISPLAY}</a><br />
                Correo: <a href="mailto:${CONTACT_EMAIL}" style="color:${EMAIL_THEME.navy};text-decoration:none;">${CONTACT_EMAIL}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 24px;border-top:1px solid ${EMAIL_THEME.border};">
              <p style="margin:0;font-size:12px;line-height:1.5;color:${EMAIL_THEME.stoneMuted};">
                Turismo Dabar · Giras de estudio y viajes grupales<br />
                <a href="${SITE_URL}" style="color:${EMAIL_THEME.navy};text-decoration:none;">${SITE_URL.replace("https://", "")}</a>
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
