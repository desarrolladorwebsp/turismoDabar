import { NextResponse } from "next/server";
import { sendQuoteEmails } from "@/lib/emails/send-quote-emails";
import { validateQuoteSubmission } from "@/lib/emails/validate-quote";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateQuoteSubmission(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await sendQuoteEmails(validation.data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[cotizar] Error al enviar correos:", error);

    const message =
      error instanceof Error
        ? error.message
        : "No pudimos enviar tu solicitud. Intenta nuevamente.";

    return NextResponse.json(
      {
        error:
          message.includes("RESEND_API_KEY")
            ? "El servicio de correo no está configurado. Contacta al administrador."
            : "No pudimos enviar tu solicitud en este momento. Intenta nuevamente o escríbenos por WhatsApp.",
      },
      { status: 500 }
    );
  }
}
