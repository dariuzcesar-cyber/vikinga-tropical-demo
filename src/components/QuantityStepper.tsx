import { Minus, Plus } from "lucide-react";
import { MAX_CANTIDAD, UNIDADES, type Unit } from "@/data/mockData";
import { formatCantidad } from "@/lib/format";

interface QuantityStepperProps {
  value: number;
  unidad: Unit;
  nombre: string;
  packageLabel?: string;
  onChange: (cantidad: number) => void;
  compact?: boolean;
}

export default function QuantityStepper({
  value,
  unidad,
  nombre,
  packageLabel,
  onChange,
  compact = false,
}: QuantityStepperProps) {
  const { step } = UNIDADES[unidad];
  const boton = compact ? "h-8 w-8" : "h-10 w-10";

  return (
    <div
      role="group"
      aria-label={`Cantidad de ${nombre}`}
      className="inline-flex items-center rounded-full border border-forest/15 bg-white"
    >
      <button
        type="button"
        onClick={() => onChange(value - step)}
        disabled={value <= step}
        aria-label={`Disminuir cantidad de ${nombre}`}
        className={`${boton} grid place-items-center rounded-full text-forest transition hover:bg-organic/10 disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>
      <output
        className={`px-1 text-center font-semibold tabular-nums ${
          compact ? "min-w-[3.75rem] text-xs" : "min-w-[5.5rem] text-sm"
        }`}
      >
        {formatCantidad(value, unidad, packageLabel)}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + step)}
        disabled={value >= MAX_CANTIDAD}
        aria-label={`Aumentar cantidad de ${nombre}`}
        className={`${boton} grid place-items-center rounded-full text-forest transition hover:bg-organic/10 disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
