"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  Banknote,
  CalendarDays,
  CreditCard,
  MessageCircle,
  ShoppingBag,
  Snowflake,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  CIUDADES_ENTREGA,
  METODOS_PAGO,
  UNIDADES,
  type MetodoPagoId,
} from "@/data/mockData";
import { formatMXN } from "@/lib/format";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";
import CitySelect from "./CitySelect";
import QuantityStepper from "./QuantityStepper";

const ICONOS_PAGO: Record<MetodoPagoId, LucideIcon> = {
  "efectivo-spei": Banknote,
  "mercado-pago": CreditCard,
};

const FOCUSABLES =
  "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])";

export default function CartDrawer() {
  const {
    lines,
    itemCount,
    total,
    ciudad,
    pago,
    isOpen,
    updateQty,
    removeItem,
    clearCart,
    closeCart,
    setPago,
  } = useCart();

  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const entregaInfo = CIUDADES_ENTREGA[ciudad];

  // Accesibilidad: bloqueo de scroll, Escape y trampa de foco.
  useEffect(() => {
    if (!isOpen) return;
    const previo = document.activeElement as HTMLElement | null;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() =>
      closeRef.current?.focus({ preventScroll: true }),
    );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeCart(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLES);
      if (!focusables.length) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault(); ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault(); primero.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowPrevio;
      previo?.focus?.();
    };
  }, [isOpen, closeCart]);

  const hayItems = lines.length > 0;
  const tieneCongelados = lines.some(
    (l) => l.producto.categoria === "res" || l.producto.categoria === "cerdo",
  );
  const metodo = METODOS_PAGO.find((m) => m.id === pago) ?? METODOS_PAGO[0];

  const enlaceWhatsapp = hayItems
    ? whatsappLink(
        buildOrderMessage({ ciudad, lineas: lines, total, metodoPago: metodo.label }),
      )
    : "";

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-[transform,visibility] duration-300 ease-out ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {/* ─── Cabecera ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
          <div>
            <h2 id="cart-title" className="font-display text-2xl font-semibold text-forest">
              Tu pedido
            </h2>
            <p className="text-sm text-forest/60">
              {itemCount} {itemCount === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Cerrar pedido"
            className="grid h-10 w-10 place-items-center rounded-full text-forest transition hover:bg-forest/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-organic"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {/* ─── Cuerpo ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {!hayItems ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-organic/10 text-organic">
                <ShoppingBag aria-hidden="true" className="h-8 w-8" />
              </span>
              <p className="mt-4 font-display text-xl font-semibold text-forest">
                Tu pedido está vacío
              </p>
              <p className="mt-1 max-w-xs text-sm text-forest/70">
                Explora el catálogo y agrega los productos que quieres recibir.
              </p>
              <a href="#catalogo" onClick={closeCart} className="btn-primary mt-6">
                Ver productos
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ciudad */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forest/60">
                  Ciudad de entrega
                </p>
                <CitySelect id="city-drawer" variant="light" />
                {/* Día de entrega */}
                <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-organic/10 px-3 py-2">
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-organic" />
                  <p className="text-xs font-medium text-organic">
                    {entregaInfo.banner}
                  </p>
                </div>
              </div>

              {/* Lista de productos */}
              <ul className="divide-y divide-forest/10">
                {lines.map(({ producto, cantidad, subtotal }) => {
                  const esCongelado =
                    producto.categoria === "res" || producto.categoria === "cerdo";
                  return (
                    <li key={producto.id} className="flex gap-3 py-4 first:pt-0">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-forest/10">
                        <Image src={producto.imagen} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-forest">{producto.nombre}</p>
                            <p className="flex items-center gap-1 text-xs text-forest/60">
                              {esCongelado && (
                                <Snowflake aria-hidden="true" className="h-3 w-3 shrink-0 text-sky-600" />
                              )}
                              {formatMXN(producto.precio)} / {UNIDADES[producto.unidad].precioPor}
                              {producto.packageLabel ? ` · ${producto.packageLabel}` : ""}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(producto.id)}
                            aria-label={`Quitar ${producto.nombre}`}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-forest/50 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <Trash2 aria-hidden="true" className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <QuantityStepper
                            compact
                            value={cantidad}
                            unidad={producto.unidad}
                            nombre={producto.nombre}
                            packageLabel={producto.packageLabel}
                            onChange={(n) => updateQty(producto.id, n)}
                          />
                          <p className="font-bold tabular-nums text-forest">
                            {formatMXN(subtotal)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Nota congelados */}
              {tieneCongelados && (
                <div className="flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2.5">
                  <Snowflake aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <p className="text-xs leading-relaxed text-sky-700">
                    Los productos de res y puerco se envían <strong>empacados al vacío
                    y congelados</strong> para garantizar su frescura.
                  </p>
                </div>
              )}

              {/* Método de pago */}
              <fieldset>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-forest/60">
                  Método de pago
                </legend>
                <div className="space-y-2">
                  {METODOS_PAGO.map((m) => {
                    const Icono = ICONOS_PAGO[m.id];
                    return (
                      <label key={m.id} className="relative block cursor-pointer">
                        <input
                          type="radio"
                          name="metodo-pago"
                          value={m.id}
                          checked={pago === m.id}
                          onChange={() => setPago(m.id)}
                          className="peer sr-only"
                        />
                        <div className="flex items-start gap-3 rounded-2xl border border-forest/15 bg-white p-3 transition hover:border-organic/40 peer-checked:border-organic peer-checked:ring-2 peer-checked:ring-organic peer-focus-visible:ring-2 peer-focus-visible:ring-forest">
                          <Icono aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-organic" />
                          <div>
                            <p className="text-sm font-semibold text-forest">{m.label}</p>
                            <p className="text-xs text-forest/60">{m.descripcion}</p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-forest/60 underline-offset-2 transition hover:text-red-600 hover:underline"
              >
                Vaciar pedido
              </button>
            </div>
          )}
        </div>

        {/* ─── Pie del drawer ───────────────────────────────────── */}
        <div className="border-t border-forest/10 bg-white px-5 py-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-forest/70">Total estimado</span>
            <span className="font-display text-3xl font-semibold tabular-nums text-forest">
              {formatMXN(total)}
            </span>
          </div>
          <p className="mt-1 text-xs text-forest/60">
            El costo de envío se confirma por WhatsApp según tu zona.
          </p>

          {hayItems ? (
            <a
              href={enlaceWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-4 w-full py-4 text-base"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              Confirmar Pedido por WhatsApp
            </a>
          ) : (
            <button type="button" disabled className="btn-whatsapp mt-4 w-full py-4 text-base">
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              Confirmar Pedido por WhatsApp
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
