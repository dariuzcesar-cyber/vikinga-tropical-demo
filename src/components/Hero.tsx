import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { IMAGENES } from "@/data/mockData";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <Image
        src={IMAGENES.hero}
        alt="Gallinas pastoreando al amanecer en la granja de Vikinga Tropical"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Capa protectora oscura para asegurar el contraste del texto */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Leaf aria-hidden="true" className="h-4 w-4" />
            Granja regenerativa · Colima, México
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Alimentos Limpios de Libre Pastoreo y Ganadería Regenerativa
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            Huevo, pollo, res y cerdo criados al aire libre, cuidando la salud de
            tu familia, el bienestar de cada animal y la tierra que los alimenta.
            Frescura local, directo de nuestra granja en Colima a tu mesa.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#catalogo" className="btn-light px-8 py-4 text-base">
              Explorar Productos
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </a>
            <a href="#academia" className="btn-outline-light px-8 py-4 text-base">
              Ver Academia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
