import { appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { QuoteSubmissionPayload } from "@/lib/emails/types";

export interface QuoteFailureLogEntry {
  timestamp: string;
  stage: "send_email";
  error: string;
  submission: QuoteSubmissionPayload;
}

function getLogDirectory() {
  if (process.env.QUOTE_FAILURE_LOG_DIR) {
    return process.env.QUOTE_FAILURE_LOG_DIR;
  }

  return process.env.VERCEL
    ? join("/tmp", "turismodabar-quote-logs")
    : join(process.cwd(), ".data");
}

function getLogFilePath() {
  return join(getLogDirectory(), "quote-submission-failures.jsonl");
}

/** Registra solicitudes que no pudieron enviarse por correo (consola + archivo JSONL). */
export function logQuoteSubmissionFailure(
  submission: QuoteSubmissionPayload,
  error: unknown,
  stage: QuoteFailureLogEntry["stage"] = "send_email"
): QuoteFailureLogEntry {
  const entry: QuoteFailureLogEntry = {
    timestamp: new Date().toISOString(),
    stage,
    error: error instanceof Error ? error.message : String(error),
    submission,
  };

  console.error("[cotizar:failure]", JSON.stringify(entry));

  try {
    const logDir = getLogDirectory();
    mkdirSync(logDir, { recursive: true });
    appendFileSync(getLogFilePath(), `${JSON.stringify(entry)}\n`, "utf8");
  } catch (writeError) {
    console.error(
      "[cotizar:failure] No se pudo guardar el log en disco:",
      writeError instanceof Error ? writeError.message : writeError
    );
  }

  return entry;
}
