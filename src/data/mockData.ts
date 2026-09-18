// Datos de demostración. Precios y textos son de ejemplo: reemplázalos por los reales.

export type Category = "huevo" | "pollo" | "res" | "cerdo";
export type Unit = "kg" | "cono";

export interface Product {
  id: string;
  nombre: string;
  categoria: Category;
  /** Precio en MXN por unidad de venta (kg o cono). */
  precio: number;
  unidad: Unit;
  descripcion: string;
  /** Ruta dentro de /public. */
  imagen: string;
}

/** Cómo se vende cada unidad: incremento del selector y etiquetas. */
export const UNIDADES: Record<
  Unit,
  { step: number; singular: string; plural: string; precioPor: string }
> = {
  kg: { step: 0.5, singular: "kg", plural: "kg", precioPor: "kg" },
  cono: { step: 1, singular: "cono", plural: "conos", precioPor: "cono" },
};

/** Tope por línea de pedido, para evitar capturas accidentales. */
export const MAX_CANTIDAD = 50;

export const IMAGENES = {
  logo: "/images/logo-white.png",
  hero: "/images/hero-gallinas.jpeg",
  pastoreo: "/images/placeholders/proceso-pastoreo.jpeg",
} as const;

export const PRODUCTOS: Product[] = [
  {
    id: "huevo-cono",
    nombre: "Huevo de Pastoreo",
    categoria: "huevo",
    precio: 150,
    unidad: "cono",
    descripcion:
      "Cono de 30 piezas de gallinas que pastorean a diario. Yema intensa y sabor de campo.",
    imagen: "/images/placeholders/cono-huevo.jpeg",
  },
  {
    id: "pollo-entero",
    nombre: "Pollo Entero",
    categoria: "pollo",
    precio: 135,
    unidad: "kg",
    descripcion:
      "Criado en libre pastoreo. Carne firme y de sabor natural, ideal para hornear o asar.",
    imagen: "/images/placeholders/pollo-entero.jpeg",
  },
  {
    id: "piezas-pollo",
    nombre: "Piezas de Pollo",
    categoria: "pollo",
    precio: 155,
    unidad: "kg",
    descripcion:
      "Pechuga, muslo y pierna de pollo de pastoreo, listas para llevar directo a tu cocina.",
    imagen: "/images/placeholders/piezas-pollo.jpeg",
  },
  {
    id: "corte-res",
    nombre: "Corte de Res",
    categoria: "res",
    precio: 260,
    unidad: "kg",
    descripcion:
      "Cortes frescos de res de ganadería regenerativa, criada en pastoreo rotacional.",
    imagen: "/images/placeholders/corte-res.jpeg",
  },
  {
    id: "corte-cerdo",
    nombre: "Corte de Cerdo",
    categoria: "cerdo",
    precio: 185,
    unidad: "kg",
    descripcion:
      "Cortes de cerdo criado al aire libre, con el sabor y la jugosidad de antes.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
  },
  {
    id: "manteca-cerdo",
    nombre: "Manteca de Cerdo",
    categoria: "cerdo",
    precio: 95,
    unidad: "kg",
    descripcion:
      "Manteca de cerdo de pastoreo para cocinar tus recetas tradicionales.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
  },
];

export const CATEGORIAS: { id: "todos" | Category; label: string }[] = [
  { id: "todos", label: "Todos los Productos" },
  { id: "huevo", label: "Huevo de Pastoreo" },
  { id: "pollo", label: "Pollo" },
  { id: "res", label: "Res" },
  { id: "cerdo", label: "Cerdo" },
];

export const CATEGORIA_ETIQUETA: Record<Category, string> = {
  huevo: "Huevo",
  pollo: "Pollo",
  res: "Res",
  cerdo: "Cerdo",
};

export const CIUDADES = [
  "Colima",
  "Tecomán",
  "Manzanillo",
  "Guadalajara",
  "CDMX",
] as const;
export type Ciudad = (typeof CIUDADES)[number];

export const METODOS_PAGO = [
  {
    id: "efectivo-spei",
    label: "Efectivo / SPEI contra entrega",
    descripcion: "Pagas al recibir tu pedido.",
  },
  {
    id: "mercado-pago",
    label: "Tarjeta de Crédito vía Mercado Pago",
    descripcion: "Te enviamos el enlace de pago por WhatsApp.",
  },
] as const;
export type MetodoPagoId = (typeof METODOS_PAGO)[number]["id"];

export const NAV_LINKS = [
  { label: "Catálogo Fresco", href: "#catalogo" },
  { label: "Nuestra Granja", href: "#granja" },
  { label: "Academia / Taller", href: "#academia" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const MODULOS_TALLER = [
  {
    id: "modulo-1",
    titulo: "Módulo 1: Pastoreo Racional",
    resumen:
      "Cómo mover a tus aves por el potrero para que coman pasto fresco y el suelo se regenere.",
    temas: [
      "Diseño de potreros y rotación",
      "Refugios móviles y bienestar animal",
      "Carga animal y descanso del pasto",
    ],
  },
  {
    id: "modulo-2",
    titulo: "Módulo 2: Nutrición Limpia",
    resumen:
      "Alimentación que complementa el pastoreo para tener aves sanas y huevo de calidad.",
    temas: [
      "Qué comen las gallinas en pastoreo",
      "Suplementación y raciones",
      "Agua, salud y prevención",
    ],
  },
  {
    id: "modulo-3",
    titulo: "Módulo 3: Finanzas del Gallinero",
    resumen:
      "Costos, precios y márgenes para que tu granja avícola sea rentable desde el inicio.",
    temas: [
      "Costos de producción por ave",
      "Cómo fijar tu precio de venta",
      "Canales de venta y punto de equilibrio",
    ],
  },
] as const;
