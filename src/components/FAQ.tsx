"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/mockData";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [abierto, setAbierto] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section id="faq" className="scroll-mt-28 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Todo lo que quieres saber"
            description="¿Tienes más dudas? Escríbenos por WhatsApp y te respondemos en minutos."
          />

          <div
            role="list"
            className="divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-cream"
          >
            {FAQ_ITEMS.map((item) => {
              const activo = abierto === item.id;
              return (
                <div key={item.id} role="listitem">
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${item.id}`}
                      aria-expanded={activo}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => setAbierto(activo ? null : item.id)}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-semibold text-forest transition hover:text-organic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-organic"
                    >
                      <span>{item.pregunta}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-organic transition-transform duration-300 ${
                          activo ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      activo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-forest/75">
                        {item.respuesta}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
