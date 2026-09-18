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

/** "1.5 kg", "1 cono", "3 conos". */
export function formatCantidad(cantidad: number, unidad: Unit): string {
  const { singular, plural } = UNIDADES[unidad];
  return `${cantidad} ${cantidad === 1 ? singular : plural}`;
}
