#!/usr/bin/env node
/**
 * Prueba E2E del endpoint /api/cotizar.
 * Uso:
 *   RESEND_API_KEY=re_xxx node scripts/test-quote-submission.mjs
 *   RESEND_API_KEY=re_xxx node scripts/test-quote-submission.mjs --url https://www.turismodabar.cl
 */

const baseUrl = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : "http://localhost:3000";

const payload = {
  fullName: "Alfredo Hurtado",
  phone: "+56 9 8889 8388",
  email: "soyalfredo.dev@gmail.com",
  school: "Colegio Prueba QA",
  course: "4 Medio A",
  studentCount: "30 a 40 alumnos",
  destination: "Bariloche Terrestre (Bus exclusivo)",
  travelYear: "2026",
};

const response = await fetch(`${baseUrl}/api/cotizar`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await response.json();

console.log("URL:", `${baseUrl}/api/cotizar`);
console.log("Status:", response.status);
console.log("Response:", JSON.stringify(body, null, 2));

if (!response.ok) {
  process.exit(1);
}
