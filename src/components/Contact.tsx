import { MapPin, MessageCircle } from "lucide-react";
import { CIUDADES, CIUDADES_ENTREGA, RANCHO } from "@/data/mockData";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contacto" className="scroll-mt-28 bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Contacto"
          title="Hablemos por WhatsApp"
          description="Resuelve tus dudas, confirma tu pedido o pregunta por la entrega en tu ciudad."
        />

        <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-forest/10 sm:p-10">
          <a
            href={whatsappLink(
              "Hola Vikinga Tropical, tengo una duda sobre sus productos.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-8 py-4 text-base"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Escríbenos al {WHATSAPP_DISPLAY}
          </a>

          {/* Rancho */}
          <address className="mt-8 not-italic">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-forest">
              <MapPin aria-hidden="true" className="h-4 w-4 text-organic" />
              {RANCHO.direccion}
            </p>
          </address>

          {/* Zonas de reparto */}
          <div className="mt-8 border-t border-forest/10 pt-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-forest/60">
              Zonas de reparto
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {CIUDADES.map((ciudad) => {
                const info = CIUDADES_ENTREGA[ciudad];
                return (
                  <li
                    key={ciudad}
                    className="rounded-full bg-cream px-4 py-1.5 text-sm ring-1 ring-forest/15"
                  >
                    <span className="font-medium text-forest">{ciudad}</span>
                    <span className="ml-1 text-forest/50">· {info.dia}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
