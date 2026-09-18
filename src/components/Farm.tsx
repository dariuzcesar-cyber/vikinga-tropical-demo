import Image from "next/image";
import { Heart, Sprout, Truck } from "lucide-react";
import { IMAGENES } from "@/data/mockData";
import SectionHeading from "./SectionHeading";

const PILARES = [
  {
    icon: Sprout,
    titulo: "Libre pastoreo",
    texto: "Nuestros animales se mueven por el potrero y comen pasto fresco cada día.",
  },
  {
    icon: Heart,
    titulo: "Bienestar animal",
    texto: "Espacio, sol y aire libre: animales tranquilos que dan mejores alimentos.",
  },
  {
    icon: Truck,
    titulo: "Frescura local",
    texto: "De nuestra granja en Colima a tu casa, sin intermediarios ni largas cadenas.",
  },
] as const;

export default function Farm() {
  return (
    <section id="granja" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream shadow-xl ring-1 ring-forest/10">
          <Image
            src={IMAGENES.pastoreo}
            alt="Boceto del proceso de pastoreo rotacional en Vikinga Tropical"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Nuestra Granja"
            title="Ganadería que cuida la tierra"
            description="En Vikinga Tropical rotamos a nuestros animales por el potrero para que el pasto y el suelo se regeneren. Así producimos alimentos más limpios y devolvemos vida al campo."
          />

          <ul className="mt-8 space-y-5">
            {PILARES.map(({ icon: Icon, titulo, texto }) => (
              <li key={titulo} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-organic/10 text-organic">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-forest">{titulo}</h3>
                  <p className="text-sm text-forest/70">{texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
