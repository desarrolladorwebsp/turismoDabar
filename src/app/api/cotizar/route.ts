import { NextResponse } from "next/server";
import { logQuoteSubmissionFailure } from "@/lib/emails/quote-failure-log";
import { sendQuoteEmails } from "@/lib/emails/send-quote-emails";
import { validateQuoteSubmission } from "@/lib/emails/validate-quote";
import type { QuoteSubmissionPayload } from "@/lib/emails/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let validatedData: QuoteSubmissionPayload | null = null;

  try {
    const body = await request.json();
    const validation = validateQuoteSubmission(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    validatedData = validation.data;
    const result = await sendQuoteEmails(validatedData);

    return NextResponse.json({
      ok: true,
      internalEmailId: result.internalId,
      clientEmailId: result.clientId,
    });
  } catch (error) {
    if (validatedData) {
      logQuoteSubmissionFailure(validatedData, error);
    }

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
