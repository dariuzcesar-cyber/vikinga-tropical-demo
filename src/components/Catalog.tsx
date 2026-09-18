"use client";

import { useState } from "react";
import { CATEGORIAS, PRODUCTOS, type Category } from "@/data/mockData";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

export default function Catalog() {
  const [filtro, setFiltro] = useState<"todos" | Category>("todos");

  const visibles =
    filtro === "todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === filtro);

  return (
    <section id="catalogo" className="scroll-mt-28 bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catálogo Fresco"
          title="Del potrero a tu mesa"
          description="Elige tu ciudad, arma tu pedido y lo confirmamos contigo por WhatsApp antes del reparto."
        />

        {/* Filtros */}
        <div
          role="group"
          aria-label="Filtrar por categoría"
          className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {CATEGORIAS.map((cat) => {
            const activa = filtro === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFiltro(cat.id)}
                aria-pressed={activa}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-organic focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                  activa
                    ? "bg-forest text-white"
                    : "bg-white text-forest ring-1 ring-forest/15 hover:bg-organic/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grilla de productos */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>

        <p className="mt-8 text-sm text-forest/60">
          Precios en pesos mexicanos (MXN). Puerco y res: congelados al vacío. El costo
          de envío se confirma según tu zona de reparto.
        </p>
      </div>
    </section>
  );
}
