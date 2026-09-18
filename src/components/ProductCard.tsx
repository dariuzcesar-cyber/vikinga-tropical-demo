"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag, Snowflake } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIA_ETIQUETA, UNIDADES, type Product } from "@/data/mockData";
import { formatMXN } from "@/lib/format";
import QuantityStepper from "./QuantityStepper";

const CANTIDAD_INICIAL = 1;

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(CANTIDAD_INICIAL);
  const [agregado, setAgregado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const subtotal = product.precio * cantidad;
  const esCongelado =
    product.categoria === "res" || product.categoria === "cerdo";

  const handleAdd = () => {
    addItem(product.id, cantidad);
    setCantidad(CANTIDAD_INICIAL);
    setAgregado(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAgregado(false), 1800);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-forest/10 transition hover:shadow-xl motion-safe:animate-fade-up">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={product.imagen}
          alt={`${product.nombre} — boceto ilustrado de Vikinga Tropical`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Categoría */}
        <span className="absolute left-3 top-3 rounded-full bg-forest/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {CATEGORIA_ETIQUETA[product.categoria]}
        </span>
        {/* Badge de atributo */}
        {product.badge && (
          <span
            className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${
              esCongelado
                ? "bg-sky-700/80 text-white"
                : "bg-organic/85 text-white"
            }`}
          >
            {esCongelado && <Snowflake aria-hidden="true" className="h-3 w-3" />}
            {product.badge}
          </span>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-organic">
          {product.linea}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-forest">
          {product.nombre}
        </h3>
        <p className="mt-2 flex-1 text-sm text-forest/70">{product.descripcion}</p>

        {/* Precio */}
        <p className="mt-4 text-forest">
          <span className="text-2xl font-bold">{formatMXN(product.precio)}</span>
          <span className="ml-1 text-sm text-forest/60">
            / {UNIDADES[product.unidad].precioPor}
            {product.packageLabel ? ` · ${product.packageLabel}` : ""}
          </span>
        </p>

        {/* Selector + subtotal */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-forest/10 pt-4">
          <QuantityStepper
            value={cantidad}
            unidad={product.unidad}
            nombre={product.nombre}
            packageLabel={product.packageLabel}
            onChange={setCantidad}
          />
          <p className="text-right">
            <span className="block text-xs text-forest/60">Subtotal</span>
            <span className="text-lg font-bold tabular-nums text-organic">
              {formatMXN(subtotal)}
            </span>
          </p>
        </div>

        {/* Botón agregar */}
        <button
          type="button"
          onClick={handleAdd}
          className={`btn mt-4 w-full focus-visible:ring-organic ${
            agregado
              ? "bg-organic/10 text-organic"
              : "bg-organic text-white hover:bg-forest"
          }`}
        >
          {agregado ? (
            <>
              <Check aria-hidden="true" className="h-4 w-4" />
              ¡Agregado al pedido!
            </>
          ) : (
            <>
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              Agregar al Pedido
            </>
          )}
        </button>
        <span className="sr-only" role="status">
          {agregado ? `${product.nombre} agregado al pedido` : ""}
        </span>
      </div>
    </article>
  );
}
