import { CalendarCheck, MapPin } from "lucide-react";
import { RANCHO } from "@/data/mockData";
import { MENSAJE_VISITA, whatsappLink } from "@/lib/whatsapp";

export default function FarmVisit() {
  return (
    <section
      id="visita"
      aria-labelledby="visita-title"
      className="scroll-mt-28 bg-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-organic to-forest text-white shadow-2xl">
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-16 lg:p-14">
            {/* Contenido */}
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <CalendarCheck aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2
                id="visita-title"
                className="mt-5 font-display text-2xl font-semibold leading-tight sm:text-3xl"
              >
                ¿Quieres conocer el rancho en Tecomán?
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
                Conócelo con tus propios ojos: cómo pastorean nuestras gallinas, cerdos
                y ganado en libertad, y por qué esto transforma la calidad de lo que
                llevas a tu mesa.
              </p>

              <address className="mt-5 not-italic">
                <p className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {RANCHO.direccion}
                </p>
              </address>

              <ul className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
                {[
                  "Visita guiada",
                  "Con cita previa",
                  "Gratis al comprar",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex shrink-0 flex-col items-start gap-4 lg:items-center">
              <a
                href={whatsappLink(MENSAJE_VISITA)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp whitespace-nowrap px-8 py-4 text-base focus-visible:ring-offset-forest"
              >
                <CalendarCheck aria-hidden="true" className="h-5 w-5" />
                Agenda tu Visita
              </a>
              <p className="max-w-[14rem] text-center text-xs text-white/60 lg:text-center">
                Te respondemos por WhatsApp para coordinar fecha y hora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
