"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CIUDADES, CIUDADES_ENTREGA, type Ciudad } from "@/data/mockData";

interface CitySelectProps {
  id: string;
  /** "glass" sobre la barra oscura · "light" sobre fondos claros. */
  variant?: "glass" | "light";
  className?: string;
}

const VARIANTES = {
  glass:
    "border-white/20 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white",
  light:
    "border-forest/15 bg-white text-forest hover:border-organic/40 focus-visible:ring-organic",
} as const;

/** Muestra el día de entrega abreviado entre paréntesis en cada opción. */
function getOptionLabel(ciudad: Ciudad): string {
  const info = CIUDADES_ENTREGA[ciudad];
  if (info.frecuencia === "especial") return `${ciudad} (Envío especial)`;
  return `${ciudad} · ${info.dia}`;
}

export default function CitySelect({
  id,
  variant = "glass",
  className = "",
}: CitySelectProps) {
  const { ciudad, setCiudad } = useCart();

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Ciudad o zona de reparto
      </label>
      <MapPin
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-80"
      />
      <select
        id={id}
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value as Ciudad)}
        className={`h-11 w-full min-w-0 cursor-pointer appearance-none rounded-full border py-2 pl-9 pr-8 text-sm font-medium outline-none transition focus-visible:ring-2 ${VARIANTES[variant]}`}
      >
        {CIUDADES.map((c) => (
          <option key={c} value={c} className="bg-white text-forest">
            {getOptionLabel(c)}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70"
      />
    </div>
  );
}
