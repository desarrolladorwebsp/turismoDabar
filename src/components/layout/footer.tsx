"use client";

import Image from "next/image";
import Link from "next/link";
import {
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "@/lib/contact";
import { scrollToCotizar } from "@/lib/quote";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full shrink-0 bg-[#1a2b4c] text-blue-200 select-none">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Columna 1: Branding */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <Link href="/" className="flex w-full justify-center">
              <span className="inline-flex w-full max-w-[280px] items-center justify-center rounded-2xl bg-[#fbfaf7] px-5 py-4 sm:max-w-[300px] sm:px-6 sm:py-5">
                <Image
                  src="/images/logo-turismo-dabar.png"
                  alt="Turismo Dabar — Giras de Estudio y Viajes Grupales"
                  width={320}
                  height={90}
                  className="h-14 w-full max-w-[240px] object-contain object-center sm:h-[4.75rem] sm:max-w-[260px]"
                />
              </span>
            </Link>
            <p className="max-w-[30ch] text-sm leading-relaxed text-brand-blue-300">
              Especialistas en diseñar y coordinar viajes grupales, giras de
              estudio y paquetes turísticos a medida en todo Chile.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Enlaces
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-brand-blue-300 transition-colors hover:text-brand-sun-400"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/planes"
                  className="text-brand-blue-300 transition-colors hover:text-brand-sun-400"
                >
                  Planes
                </Link>
              </li>
              <li>
                <a
                  href="#experiencias"
                  className="text-brand-blue-300 transition-colors hover:text-brand-sun-400"
                >
                  Experiencias
                </a>
              </li>
              <li>
                <a
                  href="#cotizar"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToCotizar();
                  }}
                  className="text-brand-blue-300 transition-colors hover:text-brand-sun-400"
                >
                  Cotizar
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-start gap-3">
                <WhatsappLogo
                  size={20}
                  weight="light"
                  className="mt-0.5 shrink-0 text-brand-sun-400"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-brand-blue-400">
                    WhatsApp Comercial
                  </span>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-blue-100 transition-colors hover:text-white"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeSimple
                  size={20}
                  weight="light"
                  className="mt-0.5 shrink-0 text-brand-sun-400"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-brand-blue-400">
                    Cotizaciones
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-brand-blue-100 transition-colors hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex flex-col gap-2.5">
                <span className="text-xs text-brand-blue-400">Redes sociales</span>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue-800/50 text-brand-blue-300 transition-colors duration-200 hover:bg-brand-blue-800 hover:text-brand-sun-400"
                    aria-label="Instagram de Turismo Dabar"
                  >
                    <InstagramLogo size={18} weight="light" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue-800/50 text-brand-blue-300 transition-colors duration-200 hover:bg-brand-blue-800 hover:text-brand-sun-400"
                    aria-label="Facebook de Turismo Dabar"
                  >
                    <FacebookLogo size={18} weight="light" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue-800/50 text-brand-blue-300 transition-colors duration-200 hover:bg-brand-blue-800 hover:text-brand-sun-400"
                    aria-label="TikTok de Turismo Dabar"
                  >
                    <TiktokLogo size={18} weight="light" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Oficina */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Oficina
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  weight="light"
                  className="mt-0.5 shrink-0 text-brand-sun-400"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-brand-blue-400">Dirección</span>
                  <span className="text-brand-blue-100">
                    Las Golondrinas 376
                    <br />
                    Macul, Santiago, Chile
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-blue-800/60 pt-8 text-xs text-blue-300/60 sm:flex-row">
          <span>
            © {currentYear} Turismo Dabar. Todos los derechos reservados.
          </span>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-brand-blue-200">
              Términos de Servicio
            </a>
            <a href="#" className="transition-colors hover:text-brand-blue-200">
              Políticas de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
