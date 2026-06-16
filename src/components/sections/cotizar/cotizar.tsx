"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  PaperPlaneTilt,
  FirstAidKit,
  ShieldCheck,
  Headset,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  QUOTE_DESTINATIONS,
  STUDENT_COUNT_OPTIONS,
  TRAVEL_YEAR_OPTIONS,
  COTIZAR_SCROLL_EVENT,
  COTIZAR_FORM_ID,
  handleCotizarHashOnLoad,
  type QuoteDestination,
  type StudentCountOption,
  type TravelYearOption,
  type CotizarScrollDetail,
} from "@/lib/quote";
import { organicSpring, fadeUpItem } from "@/lib/motion";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { QuoteSuccessPortal } from "@/components/sections/cotizar/quote-success-portal";

const TRUST_POINTS = [
  {
    icon: FirstAidKit,
    text: "Incluye profesional de salud (enfermera) en ruta",
  },
  {
    icon: ShieldCheck,
    text: "Cobertura médica integral garantizada",
  },
  {
    icon: Headset,
    text: "Asesoría personalizada de principio a fin",
  },
] as const;

interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  school: string;
  course: string;
  studentCount: StudentCountOption | "";
  destination: QuoteDestination | "";
  travelYear: TravelYearOption | "";
}

const INITIAL_FORM: QuoteFormData = {
  fullName: "",
  phone: "",
  email: "",
  school: "",
  course: "",
  studentCount: "",
  destination: "",
  travelYear: "",
};

const inputClassName =
  "w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-colors duration-200 focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-400/20";

const labelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-stone-600";

const selectClassName = cn(
  inputClassName,
  "cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 256 256%27 fill=%27%2378716c%27%3E%3Cpath d=%27M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z%27/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
);

function FormField({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className={labelClassName}>
        {label} <span className="text-brand-coral-600">*</span>
      </label>
      {children}
    </div>
  );
}

function TrustPanel() {
  return (
    <motion.aside
      variants={fadeUpItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="rounded-2xl border border-slate-900/10 bg-white p-6 sm:p-7"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-700">
        Tu tranquilidad, nuestra prioridad
      </p>
      <ul className="flex flex-col gap-4">
        {TRUST_POINTS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-blue-100 bg-brand-blue-50">
              <Icon size={18} weight="fill" className="text-brand-blue-700" />
            </span>
            <p className="text-sm leading-relaxed text-stone-700">{text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-stone-200 pt-5 text-xs leading-relaxed text-stone-500">
        Cada cotización es revisada personalmente por nuestro equipo de
        coordinadores. Respondemos en horario comercial y priorizamos grupos con
        fechas definidas.
      </p>
    </motion.aside>
  );
}

export function Cotizar() {
  const [form, setForm] = useState<QuoteFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [highlightDestination, setHighlightDestination] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    handleCotizarHashOnLoad();
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const { destination } = (event as CustomEvent<CotizarScrollDetail>).detail;
      if (destination) {
        setForm((prev) => ({ ...prev, destination }));
        setHighlightDestination(true);
        window.setTimeout(() => setHighlightDestination(false), 2200);
      }
    };

    window.addEventListener(COTIZAR_SCROLL_EVENT, handler);
    return () => window.removeEventListener(COTIZAR_SCROLL_EVENT, handler);
  }, []);

  const updateField = <K extends keyof QuoteFormData>(
    key: K,
    value: QuoteFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos por WhatsApp."
        );
      }

      setShowSuccess(true);
      setForm(INITIAL_FORM);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu solicitud. Intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="cotizar"
        className="relative w-full overflow-hidden border-t border-stone-200/50 bg-transparent py-20 md:py-28 lg:py-32"
      >
        <SectionBackdrop variant="cotizar" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={organicSpring}
            className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-coral-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-coral-700 ring-1 ring-brand-coral-200">
              <PaperPlaneTilt size={13} weight="fill" />
              Cotización Grupal
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              Diseñemos el{" "}
              <span className="text-brand-blue-600">viaje de sus vidas</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-base leading-relaxed text-stone-500 md:text-lg">
              Completa el formulario y un coordinador especializado te contactará
              con una propuesta a medida para tu curso.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-10 xl:gap-12">
            <TrustPanel />

            <motion.div
              id={COTIZAR_FORM_ID}
              variants={fadeUpItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="scroll-mt-28 rounded-2xl border border-slate-900/10 bg-white p-5 sm:p-7 md:p-8"
            >
              <form
                onSubmit={handleSubmit}
                noValidate={false}
                className="flex flex-col gap-5 sm:gap-6"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <FormField
                    id="fullName"
                    label="Nombre y Apellido"
                    className="sm:col-span-2"
                  >
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Ej: María González"
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField id="phone" label="WhatsApp de contacto">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+56 9 8889 8388"
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField id="email" label="Correo electrónico">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="coordinador@colegio.cl"
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField id="school" label="Colegio">
                    <input
                      id="school"
                      name="school"
                      type="text"
                      required
                      value={form.school}
                      onChange={(e) => updateField("school", e.target.value)}
                      placeholder="Ej: Colegio San Javier"
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField id="course" label="Curso">
                    <input
                      id="course"
                      name="course"
                      type="text"
                      required
                      value={form.course}
                      onChange={(e) => updateField("course", e.target.value)}
                      placeholder="Ej: 3 Medio A"
                      className={inputClassName}
                    />
                  </FormField>

                  <FormField
                    id="studentCount"
                    label="Cantidad de alumnos"
                    className="sm:col-span-2"
                  >
                    <fieldset className="flex flex-col gap-2.5">
                      <legend className="sr-only">Cantidad de alumnos</legend>
                      {STUDENT_COUNT_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                            form.studentCount === option
                              ? "border-brand-blue-400 bg-brand-blue-50 text-brand-blue-900"
                              : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                          )}
                        >
                          <input
                            type="radio"
                            name="studentCount"
                            value={option}
                            required
                            checked={form.studentCount === option}
                            onChange={() => updateField("studentCount", option)}
                            className="h-4 w-4 accent-brand-coral-500"
                          />
                          {option}
                        </label>
                      ))}
                    </fieldset>
                  </FormField>

                  <FormField
                    id="destination"
                    label="Destino de interés"
                    className="sm:col-span-2"
                  >
                    <select
                      id="destination"
                      name="destination"
                      required
                      value={form.destination}
                      onChange={(e) =>
                        updateField(
                          "destination",
                          e.target.value as QuoteDestination | ""
                        )
                      }
                      className={cn(
                        selectClassName,
                        highlightDestination &&
                          "border-brand-coral-300 ring-2 ring-brand-coral-400/50"
                      )}
                    >
                      <option value="" disabled>
                        Selecciona un destino
                      </option>
                      {QUOTE_DESTINATIONS.map((dest) => (
                        <option key={dest} value={dest}>
                          {dest}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    id="travelYear"
                    label="Fecha estimada del viaje"
                    className="sm:col-span-2"
                  >
                    <select
                      id="travelYear"
                      name="travelYear"
                      required
                      value={form.travelYear}
                      onChange={(e) =>
                        updateField(
                          "travelYear",
                          e.target.value as TravelYearOption | ""
                        )
                      }
                      className={selectClassName}
                    >
                      <option value="" disabled>
                        Selecciona el año
                      </option>
                      {TRAVEL_YEAR_OPTIONS.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <div className="mt-2 flex flex-col items-center gap-3 border-t border-stone-200 pt-6">
                  {submitError && (
                    <p
                      role="alert"
                      className="w-full rounded-xl border border-brand-coral-200 bg-brand-coral-50 px-4 py-3 text-center text-sm text-brand-coral-700"
                    >
                      {submitError}
                    </p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                    transition={organicSpring}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-coral-600/30 bg-brand-coral-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 sm:text-base",
                      "hover:bg-brand-coral-600 focus:outline-none focus:ring-2 focus:ring-brand-coral-400/40 focus:ring-offset-2",
                      "disabled:cursor-not-allowed disabled:opacity-70"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Enviando solicitud…
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={18} weight="fill" />
                        QUIERO RECIBIR LA PROPUESTA PARA MI CURSO
                      </>
                    )}
                  </motion.button>
                  <p className="text-center text-xs text-stone-400">
                    Todos los campos son obligatorios. Tus datos se usan solo
                    para preparar tu cotización.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <QuoteSuccessPortal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
