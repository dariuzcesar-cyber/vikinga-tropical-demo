"use client";

import { useState } from "react";
import { ChevronDown, Clock, GraduationCap, MessageCircle } from "lucide-react";
import { MODULOS_TALLER } from "@/data/mockData";
import { MENSAJE_ACADEMIA, whatsappLink } from "@/lib/whatsapp";

export default function Academy() {
  const [abierto, setAbierto] = useState<string | null>(MODULOS_TALLER[0].id);

  return (
    <section id="academia" className="scroll-mt-28 bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-forest text-white shadow-2xl">
          {/* Banner "Próximamente" */}
          <div className="flex items-center justify-center gap-2 bg-sun px-4 py-3 text-center text-sm font-bold text-forest sm:text-base">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-forest/60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest" />
            </span>
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0" />
            Próximamente — Lanzamiento a pocos días
          </div>

          <div className="grid gap-10 bg-gradient-to-br from-organic/40 to-forest p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            {/* Descripción */}
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <GraduationCap aria-hidden="true" className="h-6 w-6" />
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/70">
                Academia Vikinga
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Taller Gratuito de Producción Avícola de Warenka
              </h2>
              <p className="mt-5 text-base text-white/80 sm:text-lg">
                Aprende paso a paso a criar gallinas en pastoreo de forma rentable y
                respetuosa con el animal y el suelo. Un taller gratuito para quien
                quiere producir su propio huevo y pollo, o convertirlo en negocio.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
                {["100% gratuito", "3 módulos prácticos", "Aviso directo por WhatsApp"].map(
                  (item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5"
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <a
                href={whatsappLink(MENSAJE_ACADEMIA)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8 px-8 py-4 text-base focus-visible:ring-offset-forest"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                Avisarme por WhatsApp al Lanzar
              </a>
            </div>

            {/* Acordeón de módulos */}
            <div className="rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 sm:p-3">
              <h3 className="px-3 pb-2 pt-3 text-sm font-semibold uppercase tracking-widest text-white/70">
                Vista previa del temario
              </h3>
              <div className="divide-y divide-white/10">
                {MODULOS_TALLER.map((modulo) => {
                  const activo = abierto === modulo.id;
                  return (
                    <div key={modulo.id}>
                      <h4>
                        <button
                          type="button"
                          id={`${modulo.id}-btn`}
                          aria-expanded={activo}
                          aria-controls={`${modulo.id}-panel`}
                          onClick={() => setAbierto(activo ? null : modulo.id)}
                          className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-4 text-left font-semibold transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {modulo.titulo}
                          <ChevronDown
                            aria-hidden="true"
                            className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                              activo ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </h4>
                      <div
                        id={`${modulo.id}-panel`}
                        role="region"
                        aria-labelledby={`${modulo.id}-btn`}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          activo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-3 pb-4 text-sm text-white/80">
                            <p>{modulo.resumen}</p>
                            <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-sun">
                              {modulo.temas.map((tema) => (
                                <li key={tema}>{tema}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
