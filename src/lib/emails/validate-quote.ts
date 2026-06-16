import {
  QUOTE_DESTINATIONS,
  STUDENT_COUNT_OPTIONS,
  TRAVEL_YEAR_OPTIONS,
} from "@/lib/quote";
import type { QuoteSubmissionPayload } from "@/lib/emails/types";

function isNonEmptyString(value: unknown, maxLength: number) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateQuoteSubmission(
  body: unknown
): { success: true; data: QuoteSubmissionPayload } | { success: false; error: string } {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Datos de solicitud inválidos." };
  }

  const input = body as Record<string, unknown>;

  const fullName = typeof input.fullName === "string" ? input.fullName.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const school = typeof input.school === "string" ? input.school.trim() : "";
  const course = typeof input.course === "string" ? input.course.trim() : "";
  const studentCount = input.studentCount;
  const destination = input.destination;
  const travelYear = input.travelYear;

  if (!isNonEmptyString(fullName, 120)) {
    return { success: false, error: "Ingresa un nombre y apellido válido." };
  }

  if (!isNonEmptyString(phone, 30)) {
    return { success: false, error: "Ingresa un WhatsApp de contacto válido." };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Ingresa un correo electrónico válido." };
  }

  if (!isNonEmptyString(school, 150)) {
    return { success: false, error: "Ingresa el nombre del colegio." };
  }

  if (!isNonEmptyString(course, 80)) {
    return { success: false, error: "Ingresa el curso." };
  }

  if (
    typeof studentCount !== "string" ||
    !STUDENT_COUNT_OPTIONS.includes(studentCount as (typeof STUDENT_COUNT_OPTIONS)[number])
  ) {
    return { success: false, error: "Selecciona una cantidad de alumnos válida." };
  }

  if (
    typeof destination !== "string" ||
    !QUOTE_DESTINATIONS.includes(destination as (typeof QUOTE_DESTINATIONS)[number])
  ) {
    return { success: false, error: "Selecciona un destino de interés válido." };
  }

  if (
    typeof travelYear !== "string" ||
    !TRAVEL_YEAR_OPTIONS.includes(travelYear as (typeof TRAVEL_YEAR_OPTIONS)[number])
  ) {
    return { success: false, error: "Selecciona una fecha estimada válida." };
  }

  return {
    success: true,
    data: {
      fullName,
      phone,
      email,
      school,
      course,
      studentCount: studentCount as QuoteSubmissionPayload["studentCount"],
      destination: destination as QuoteSubmissionPayload["destination"],
      travelYear: travelYear as QuoteSubmissionPayload["travelYear"],
    },
  };
}
