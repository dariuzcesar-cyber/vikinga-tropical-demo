"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CIUDADES,
  MAX_CANTIDAD,
  METODOS_PAGO,
  PRODUCTOS,
  UNIDADES,
  type Ciudad,
  type MetodoPagoId,
  type Product,
} from "@/data/mockData";

// Bump de versión porque cambiaron Unit ("cono" → "carpeta" / "paquete") y catálogo.
const STORAGE_KEY = "vikinga-tropical:pedido:v2";
const PRODUCTOS_POR_ID = new Map(PRODUCTOS.map((p) => [p.id, p]));

interface StoredItem {
  id: string;
  cantidad: number;
}

export interface CartLine {
  producto: Product;
  cantidad: number;
  subtotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  total: number;
  ciudad: Ciudad;
  pago: MetodoPagoId;
  isOpen: boolean;
  addItem: (id: string, cantidad: number) => void;
  updateQty: (id: string, cantidad: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setCiudad: (ciudad: Ciudad) => void;
  setPago: (pago: MetodoPagoId) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function clampCantidad(producto: Product, cantidad: number): number {
  const { step } = UNIDADES[producto.unidad];
  const ajustada = Math.round(cantidad / step) * step;
  return Math.min(MAX_CANTIDAD, Math.max(step, ajustada));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StoredItem[]>([]);
  const [ciudad, setCiudad] = useState<Ciudad>(CIUDADES[0]);
  const [pago, setPago] = useState<MetodoPagoId>(METODOS_PAGO[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hidratación desde localStorage (solo en cliente).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: unknown = JSON.parse(raw);
        if (typeof data === "object" && data !== null) {
          const saved = data as Record<string, unknown>;

          if (Array.isArray(saved.items)) {
            const limpios = saved.items.flatMap((it: unknown): StoredItem[] => {
              if (typeof it !== "object" || it === null) return [];
              const { id, cantidad } = it as Record<string, unknown>;
              const producto =
                typeof id === "string" ? PRODUCTOS_POR_ID.get(id) : undefined;
              if (
                !producto ||
                typeof cantidad !== "number" ||
                !Number.isFinite(cantidad)
              )
                return [];
              return [{ id: producto.id, cantidad: clampCantidad(producto, cantidad) }];
            });
            setItems(limpios);
          }

          const ciudadGuardada = CIUDADES.find((c) => c === saved.ciudad);
          if (ciudadGuardada) setCiudad(ciudadGuardada);

          const pagoGuardado = METODOS_PAGO.find((m) => m.id === saved.pago);
          if (pagoGuardado) setPago(pagoGuardado.id);
        }
      }
    } catch {
      /* localStorage no disponible o JSON corrupto: pedido en blanco. */
    }
    setHydrated(true);
  }, []);

  // Persistencia.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, ciudad, pago }));
    } catch {
      /* Sin persistencia; el carrito sigue funcionando en memoria. */
    }
  }, [hydrated, items, ciudad, pago]);

  const addItem = useCallback((id: string, cantidad: number) => {
    const producto = PRODUCTOS_POR_ID.get(id);
    if (!producto) return;
    setItems((prev) => {
      const existente = prev.find((it) => it.id === id);
      if (existente) {
        return prev.map((it) =>
          it.id === id
            ? { ...it, cantidad: clampCantidad(producto, it.cantidad + cantidad) }
            : it,
        );
      }
      return [...prev, { id, cantidad: clampCantidad(producto, cantidad) }];
    });
  }, []);

  const updateQty = useCallback((id: string, cantidad: number) => {
    const producto = PRODUCTOS_POR_ID.get(id);
    if (!producto) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, cantidad: clampCantidad(producto, cantidad) } : it,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart  = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((it): CartLine[] => {
        const producto = PRODUCTOS_POR_ID.get(it.id);
        if (!producto) return [];
        return [{ producto, cantidad: it.cantidad, subtotal: producto.precio * it.cantidad }];
      }),
    [items],
  );

  const total = useMemo(
    () => lines.reduce((suma, l) => suma + l.subtotal, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.length,
      total,
      ciudad,
      pago,
      isOpen,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      setCiudad,
      setPago,
    }),
    [lines, total, ciudad, pago, isOpen, addItem, updateQty, removeItem, clearCart, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
