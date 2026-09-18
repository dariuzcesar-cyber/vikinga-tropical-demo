import type { CartLine } from "@/context/CartContext";
import { formatCantidad, formatMXN } from "./format";

export const WHATSAPP_NUMBER = "523121316212";
export const WHATSAPP_DISPLAY = "+52 312 131 6212";

export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

interface OrderMessageInput {
  ciudad: string;
  lineas: CartLine[];
  total: number;
  metodoPago: string;
}

/**
 * "Hola Vikinga Tropical, quiero confirmar mi pedido para [Ciudad]:
 *  [Lista de productos con kilos] | Total: $[Monto] | Pago: [Método de pago]"
 */
export function buildOrderMessage({
  ciudad,
  lineas,
  total,
  metodoPago,
}: OrderMessageInput): string {
  const lista = lineas
    .map(
      (l) => `${formatCantidad(l.cantidad, l.producto.unidad)} de ${l.producto.nombre}`,
    )
    .join(", ");

  return `Hola Vikinga Tropical, quiero confirmar mi pedido para ${ciudad}: ${lista} | Total: ${formatMXN(total)} | Pago: ${metodoPago}`;
}
