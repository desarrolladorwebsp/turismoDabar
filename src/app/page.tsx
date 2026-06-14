import { Hero } from "@/components/sections/hero/hero";
import { Servicios } from "@/components/sections/servicios/servicios";
import { Experiencias } from "@/components/sections/experiencias/experiencias";
import { Cotizar } from "@/components/sections/cotizar/cotizar";

export default function Home() {
  return (
    <main className="w-full flex-1 overflow-x-hidden">
      <Hero />
      <Servicios />
      <Experiencias />
      <Cotizar />
    </main>
  );
}

