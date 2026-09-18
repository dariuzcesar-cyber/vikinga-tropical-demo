import { UNIDADES, type Unit } from "@/data/mockData";

/** "$135", "$67.50", "$1,234" — sin decimales cuando el monto es entero. */
export function formatMXN(monto: number): string {
  const entero = Number.isInteger(monto);
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: entero ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(monto);
}

/**
 * "1.5 kg", "2 carpetas", "3 paquetes (500 g c/u)"
 * Para unidad "paquete", `packageLabel` agrega el gramaje: "500 g".
 */
export function formatCantidad(
  cantidad: number,
  unidad: Unit,
  packageLabel?: string,
): string {
  const { singular, plural } = UNIDADES[unidad];
  const label = cantidad === 1 ? singular : plural;
  const base = `${cantidad} ${label}`;
  if (packageLabel && unidad === "paquete") {
    const sufijo = cantidad === 1 ? packageLabel : `${packageLabel} c/u`;
    return `${base} (${sufijo})`;
  }
  return base;
}
