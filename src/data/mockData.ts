// ─── Tipos base ────────────────────────────────────────────────────────────────

export type Category = "huevo" | "pollo" | "res" | "cerdo";
export type Unit = "kg" | "carpeta" | "paquete";
export type Frecuencia = "semanal" | "quincenal" | "especial";

// ─── Ubicación del rancho ───────────────────────────────────────────────────────

export const RANCHO = {
  nombre: "Vikinga Tropical",
  direccion: "Carretera Tecomanillo, Tecomán, Colima, México",
  whatsapp: "523121316212",
  web: "vikingatropical.com",
} as const;

// ─── Ciudades y días de entrega ─────────────────────────────────────────────────

export const CIUDADES = [
  "Colima",
  "Tecomán",
  "Manzanillo",
  "Guadalajara",
  "Ciudad Guzmán",
  "Ciudad de México",
  "Tepic",
  "Monterrey",
  "Puerto Vallarta",
  "Otras Ciudades",
] as const;

export type Ciudad = (typeof CIUDADES)[number];

export interface CiudadEntregaInfo {
  dia: string;
  frecuencia: Frecuencia;
  /** Texto completo para el banner de entrega. */
  banner: string;
}

export const CIUDADES_ENTREGA: Record<Ciudad, CiudadEntregaInfo> = {
  "Colima":           { dia: "Miércoles",          frecuencia: "semanal",    banner: "Entregas en Colima: Miércoles · Semanal" },
  "Tecomán":          { dia: "Jueves",              frecuencia: "semanal",    banner: "Entregas en Tecomán: Jueves · Semanal" },
  "Manzanillo":       { dia: "Viernes",             frecuencia: "semanal",    banner: "Entregas en Manzanillo: Viernes · Semanal" },
  "Guadalajara":      { dia: "Jueves o Viernes",    frecuencia: "quincenal",  banner: "Entregas en Guadalajara: Jueves o Viernes · Quincenal" },
  "Ciudad Guzmán":    { dia: "A confirmar",         frecuencia: "quincenal",  banner: "Entregas en Ciudad Guzmán: quincenal · contáctanos para tu fecha" },
  "Ciudad de México": { dia: "Lunes",               frecuencia: "quincenal",  banner: "Entregas en CDMX: Lunes · Quincenal" },
  "Tepic":            { dia: "A confirmar",         frecuencia: "quincenal",  banner: "Entregas en Tepic: quincenal · contáctanos para tu fecha" },
  "Monterrey":        { dia: "Miércoles",           frecuencia: "quincenal",  banner: "Entregas en Monterrey: Miércoles · Quincenal" },
  "Puerto Vallarta":  { dia: "Miércoles",           frecuencia: "quincenal",  banner: "Entregas en Puerto Vallarta: Miércoles · Quincenal" },
  "Otras Ciudades":   { dia: "A coordinar",         frecuencia: "especial",   banner: "Envío especial a tu ciudad · Contáctanos" },
};

// ─── Productos ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  nombre: string;
  /** Nombre de línea de marketing: "Pollo de Pastoreo", "Puerco de Campo", etc. */
  linea: string;
  categoria: Category;
  precio: number;
  unidad: Unit;
  /** Etiqueta del empaque cuando unidad = "paquete": "500g", "1kg", "250g", "par". */
  packageLabel?: string;
  descripcion: string;
  imagen: string;
  /** Chip de atributo que aparece en la tarjeta: "Congelado al vacío", etc. */
  badge?: string;
}

/** Configuración del selector de cantidad por unidad. */
export const UNIDADES: Record<
  Unit,
  { step: number; singular: string; plural: string; precioPor: string }
> = {
  kg:      { step: 0.5, singular: "kg",      plural: "kg",       precioPor: "kg" },
  carpeta: { step: 1,   singular: "carpeta", plural: "carpetas", precioPor: "carpeta (30 pzas)" },
  paquete: { step: 1,   singular: "paquete", plural: "paquetes", precioPor: "paquete" },
};

export const MAX_CANTIDAD = 50;

export const IMAGENES = {
  logo:     "/images/logo-white.png",
  hero:     "/images/hero-gallinas.jpeg",
  pastoreo: "/images/placeholders/proceso-pastoreo.jpeg",
} as const;

export const PRODUCTOS: Product[] = [
  // ── Huevo de Pastoreo ──────────────────────────────────────────
  {
    id: "carpeta-huevo",
    nombre: "Carpeta de 30 Huevos",
    linea: "Huevo de Pastoreo",
    categoria: "huevo",
    precio: 150,
    unidad: "carpeta",
    descripcion:
      "30 huevos de gallinas que pastorean a diario en Tecomanillo. Yema densa, anaranjada y llena de sabor de campo.",
    imagen: "/images/placeholders/carpeta-huevo.png",
    badge: "Libre Pastoreo",
  },

  // ── Pollo de Pastoreo (rotacional) ────────────────────────────
  {
    id: "pollo-entero",
    nombre: "Pollo Entero",
    linea: "Pollo de Pastoreo",
    categoria: "pollo",
    precio: 130,
    unidad: "kg",
    descripcion:
      "Pollo entero de pastoreo rotacional. Carne firme, de piel dorada natural y sabor auténtico.",
    imagen: "/images/placeholders/pollo-entero.jpeg",
    badge: "Pastoreo Rotacional",
  },
  {
    id: "pollo-partido",
    nombre: "Pollo Partido",
    linea: "Pollo de Pastoreo",
    categoria: "pollo",
    precio: 135,
    unidad: "kg",
    descripcion:
      "Pollo entero partido en piezas (muslo, pierna, pechuga, ala), listo para cocinar.",
    imagen: "/images/placeholders/piezas-pollo.jpeg",
    badge: "Pastoreo Rotacional",
  },
  {
    id: "pollo-partido-sp",
    nombre: "Pollo Partido Sin Piel",
    linea: "Pollo de Pastoreo",
    categoria: "pollo",
    precio: 145,
    unidad: "kg",
    descripcion:
      "Piezas de pollo de pastoreo sin piel, ideales para recetas más limpias y saludables.",
    imagen: "/images/placeholders/piezas-pollo.jpeg",
    badge: "Sin Piel",
  },
  {
    id: "pechuga-deshuesada",
    nombre: "Pechuga Deshuesada",
    linea: "Pollo de Pastoreo",
    categoria: "pollo",
    precio: 110,
    unidad: "paquete",
    packageLabel: "par (≈600 g)",
    descripcion:
      "Par de pechugas deshuesadas de pollo de pastoreo. Carne blanca magra y jugosa.",
    imagen: "/images/placeholders/piezas-pollo.jpeg",
    badge: "Pastoreo Rotacional",
  },

  // ── Puerco de Campo (selva caducifolia, congelado al vacío) ───
  {
    id: "costilla-puerco",
    nombre: "Costilla de Puerco",
    linea: "Puerco de Campo",
    categoria: "cerdo",
    precio: 95,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Costilla de puerco criado en selva caducifolia. Empacada al vacío y congelada, también disponible en 1 kg.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
    badge: "Congelado al Vacío",
  },
  {
    id: "lomo-puerco",
    nombre: "Lomo de Puerco",
    linea: "Puerco de Campo",
    categoria: "cerdo",
    precio: 90,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Lomo de puerco de campo, tierno y magro. Congelado al vacío para máxima frescura.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
    badge: "Congelado al Vacío",
  },
  {
    id: "espaldilla-puerco",
    nombre: "Espaldilla de Puerco",
    linea: "Puerco de Campo",
    categoria: "cerdo",
    precio: 80,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Espaldilla de puerco con buena veta de grasa natural. Ideal para birria, adobo o guisados.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
    badge: "Congelado al Vacío",
  },
  {
    id: "chuleta-puerco",
    nombre: "Chuleta de Puerco",
    linea: "Puerco de Campo",
    categoria: "cerdo",
    precio: 92,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Chuletas de puerco de campo, perfectas para la parrilla o al sartén.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
    badge: "Congelado al Vacío",
  },
  {
    id: "pierna-puerco",
    nombre: "Pierna de Puerco",
    linea: "Puerco de Campo",
    categoria: "cerdo",
    precio: 78,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Pierna de puerco de campo para carnitas, horneado o ahumado. También disponible en 1 kg.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
    badge: "Congelado al Vacío",
  },
  {
    id: "tocino-puerco",
    nombre: "Tocino de Puerco",
    linea: "Puerco de Campo",
    categoria: "cerdo",
    precio: 65,
    unidad: "paquete",
    packageLabel: "250 g",
    descripcion:
      "Tocino natural de puerco de campo, sin nitratos ni conservadores artificiales. Paquete de 250 g.",
    imagen: "/images/placeholders/corte-cerdo.jpeg",
    badge: "Sin Conservadores",
  },

  // ── Vacas de Libre Pastoreo (100% pasto, congelado al vacío) ──
  {
    id: "molida-res",
    nombre: "Molida de Res",
    linea: "Vacas de Libre Pastoreo",
    categoria: "res",
    precio: 95,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Carne molida de res 100% pasto. Rica en Omega-3 y CLA. Congelada al vacío en paquetes de 500 g.",
    imagen: "/images/placeholders/corte-res.jpeg",
    badge: "100% Pasto · Vacío",
  },
  {
    id: "hueso-res",
    nombre: "Hueso de Res",
    linea: "Vacas de Libre Pastoreo",
    categoria: "res",
    precio: 65,
    unidad: "paquete",
    packageLabel: "1 kg",
    descripcion:
      "Huesos de res de pastoreo para caldo de hueso rico en colágeno y minerales. Paquete de 1 kg.",
    imagen: "/images/placeholders/corte-res.jpeg",
    badge: "100% Pasto · Vacío",
  },
  {
    id: "visceras-res",
    nombre: "Vísceras de Res",
    linea: "Vacas de Libre Pastoreo",
    categoria: "res",
    precio: 75,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Hígado, corazón u otras vísceras de res de pastoreo. Superalimento denso en nutrientes. Disponibles en 500 g y 1 kg.",
    imagen: "/images/placeholders/corte-res.jpeg",
    badge: "100% Pasto · Vacío",
  },
  {
    id: "bistec-res",
    nombre: "Bistec de Res",
    linea: "Vacas de Libre Pastoreo",
    categoria: "res",
    precio: 135,
    unidad: "paquete",
    packageLabel: "500 g",
    descripcion:
      "Bistec de res de libre pastoreo, tierno y con sabor profundo. Congelado al vacío en paquetes de 500 g.",
    imagen: "/images/placeholders/corte-res.jpeg",
    badge: "100% Pasto · Vacío",
  },
];

// ─── Categorías para el filtro del catálogo ─────────────────────────────────────

export const CATEGORIAS: { id: "todos" | Category; label: string }[] = [
  { id: "todos",  label: "Todos los Productos" },
  { id: "huevo",  label: "Huevo" },
  { id: "pollo",  label: "Pollo" },
  { id: "res",    label: "Res" },
  { id: "cerdo",  label: "Puerco" },
];

export const CATEGORIA_ETIQUETA: Record<Category, string> = {
  huevo: "Huevo de Pastoreo",
  pollo: "Pollo de Pastoreo",
  res:   "Vacas de Libre Pastoreo",
  cerdo: "Puerco de Campo",
};

// ─── Métodos de pago ────────────────────────────────────────────────────────────

export const METODOS_PAGO = [
  {
    id: "efectivo-spei",
    label: "Efectivo / SPEI contra entrega",
    descripcion: "Pagas al recibir tu pedido (en efectivo o transferencia).",
  },
  {
    id: "mercado-pago",
    label: "Tarjeta de Crédito / Débito vía Mercado Pago",
    descripcion: "Te enviamos el enlace de pago por WhatsApp.",
  },
] as const;
export type MetodoPagoId = (typeof METODOS_PAGO)[number]["id"];

// ─── Navegación ─────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Catálogo Fresco", href: "#catalogo" },
  { label: "Nuestra Granja",  href: "#granja" },
  { label: "Academia / Taller", href: "#academia" },
  { label: "Preguntas",       href: "#faq" },
  { label: "Contacto",        href: "#contacto" },
] as const;

// ─── Academia / Taller avícola ──────────────────────────────────────────────────

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

// ─── FAQ ────────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    id: "que-productos",
    pregunta: "¿Qué tipo de productos ofrecen?",
    respuesta:
      "Ofrecemos cuatro líneas de alimentos regenerativos: Huevo de Pastoreo (carpetas de 30 piezas), Pollo de Pastoreo rotacional (entero, partido, sin piel y pechuga deshuesada), Puerco de Campo de selva caducifolia (costilla, lomo, espaldilla, chuleta, pierna y tocino) y Vacas de Libre Pastoreo 100% pasto (molida, hueso, vísceras y bistec). Los productos de puerco y res se empacan al vacío y se envían congelados.",
  },
  {
    id: "como-pedir",
    pregunta: "¿Cómo puedo hacer mi pedido?",
    respuesta:
      "Arma tu pedido en esta página: elige tu ciudad, agrega productos al carrito con el botón "Agregar al Pedido" y ajusta las cantidades. Al terminar, abre el carrito y pulsa "Confirmar Pedido por WhatsApp". Te llegará un mensaje listo con todo tu pedido y te contactamos para coordinar la entrega.",
  },
  {
    id: "cuando-entregan",
    pregunta: "¿Cuándo me entregan?",
    respuesta:
      "Los días de entrega por ciudad son: Colima → Miércoles (semanal) · Tecomán → Jueves (semanal) · Manzanillo → Viernes (semanal) · Guadalajara → Jueves o Viernes (quincenal) · Ciudad de México → Lunes (quincenal) · Monterrey, Tepic y Puerto Vallarta → Miércoles (quincenal). Para otras ciudades coordinamos un envío especial. Selecciona tu ciudad en el selector del catálogo para ver tu día de entrega.",
  },
  {
    id: "como-pagan",
    pregunta: "¿Cómo puedo pagar?",
    respuesta:
      "Aceptamos efectivo o SPEI (transferencia bancaria) contra entrega, y tarjeta de crédito o débito mediante Mercado Pago. Para pedidos foráneos te enviamos el enlace de pago por WhatsApp antes de enviar tu pedido.",
  },
  {
    id: "visita-rancho",
    pregunta: "¿Puedo visitar el rancho en Tecomán?",
    respuesta:
      "¡Claro! Nos encontramos en Carretera Tecomanillo, Tecomán, Colima, México. Las visitas son con cita previa para que puedas ver de cerca el pastoreo, el gallinero y la producción regenerativa. Escríbenos por WhatsApp y agendamos tu recorrido guiado.",
  },
] as const;
