import type { CartLine } from "@/context/CartContext";
import { CIUDADES_ENTREGA, RANCHO } from "@/data/mockData";
import { formatCantidad, formatMXN } from "./format";

export const WHATSAPP_NUMBER = RANCHO.whatsapp;
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

/** Mensaje de WhatsApp completo con ciudad, día de entrega, productos y gramajes. */
export function buildOrderMessage({
  ciudad,
  lineas,
  total,
  metodoPago,
}: OrderMessageInput): string {
  const entrega = CIUDADES_ENTREGA[ciudad as keyof typeof CIUDADES_ENTREGA];

  // Agrupar productos con congelados
  const tieneCongelados = lineas.some(
    (l) => l.producto.categoria === "res" || l.producto.categoria === "cerdo",
  );

  const listaProductos = lineas
    .map((l) => {
      const { producto, cantidad } = l;
      const cantidadStr = formatCantidad(
        cantidad,
        producto.unidad,
        producto.packageLabel,
      );
      const esCongelado =
        producto.categoria === "res" || producto.categoria === "cerdo";
      return `• ${cantidadStr} de ${producto.nombre}${esCongelado ? " ❄️" : ""}`;
    })
    .join("\n");

  let mensaje = `Hola Vikinga Tropical, quiero confirmar mi pedido:\n\n`;
  mensaje += `📍 Ciudad de entrega: ${ciudad}\n`;
  if (entrega) {
    const freqLabel =
      entrega.frecuencia === "semanal"
        ? "Semanal"
        : entrega.frecuencia === "quincenal"
          ? "Quincenal"
          : "Envío especial";
    mensaje += `📅 Día de entrega: ${entrega.dia} · ${freqLabel}\n`;
  }
  mensaje += `\n🛒 Mi pedido:\n${listaProductos}\n\n`;

  if (tieneCongelados) {
    mensaje += `❄️ Nota: Los productos de res y puerco van empacados al vacío y congelados.\n\n`;
  }

  mensaje += `💰 Total estimado: ${formatMXN(total)}\n`;
  mensaje += `💳 Pago: ${metodoPago}`;

  return mensaje;
}

/** Mensaje para agendar visita al rancho. */
export const MENSAJE_VISITA =
  `Hola Vikinga Tropical, me gustaría agendar una visita guiada para conocer el rancho en Tecomanillo, Tecomán.`;

/** Mensaje de aviso para el lanzamiento del taller. */
export const MENSAJE_ACADEMIA =
  `Hola Vikinga Tropical, quiero que me avisen por WhatsApp cuando se lance el Taller Gratuito de Producción Avícola de la Academia Vikinga.`;
