import Image from "next/image";
import { MapPin } from "lucide-react";
import { IMAGENES, NAV_LINKS, RANCHO } from "@/data/mockData";

export default function Footer() {
  return (
    <footer className="bg-forest text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Logo + datos */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Image
              src={IMAGENES.logo}
              alt="Vikinga Tropical"
              width={960}
              height={1112}
              className="h-16 w-auto"
            />
            <p className="max-w-xs text-sm">
              Alimentos de libre pastoreo y ganadería regenerativa.
            </p>
            <address className="not-italic">
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-organic/80" />
                {RANCHO.direccion}
              </p>
            </address>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página" className="shrink-0">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Vikinga Tropical · {RANCHO.web} · Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
