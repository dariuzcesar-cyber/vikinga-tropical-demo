"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { IMAGENES, NAV_LINKS } from "@/data/mockData";
import CitySelect from "./CitySelect";

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-forest/75 shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
        <a href="#inicio" aria-label="Vikinga Tropical — Inicio" className="shrink-0">
          <Image
            src={IMAGENES.logo}
            alt="Vikinga Tropical"
            width={960}
            height={1112}
            priority
            className="h-14 w-auto md:h-16"
          />
        </a>

        <nav
          aria-label="Principal"
          className="mx-auto hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3 lg:ml-0">
          <CitySelect id="city-header" className="min-w-0 max-w-[10rem] sm:max-w-none" />

          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir pedido, ${itemCount} ${itemCount === 1 ? "artículo" : "artículos"}`}
            className="relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-cream px-3 font-semibold text-forest transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-4"
          >
            <ShoppingBag aria-hidden="true" className="h-5 w-5" />
            <span className="hidden text-sm sm:inline">Mi pedido</span>
            {itemCount > 0 && (
              <span
                key={itemCount}
                aria-hidden="true"
                className="absolute -right-1 -top-1 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-organic px-1 text-[11px] font-bold text-white ring-2 ring-forest"
              >
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="menu-movil"
          aria-label="Principal (móvil)"
          className="border-t border-white/10 bg-forest/95 px-4 pb-4 pt-2 backdrop-blur-xl lg:hidden"
        >
          <ul className="mx-auto max-w-7xl">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
