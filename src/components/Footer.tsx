import Image from "next/image";
import { IMAGENES, NAV_LINKS } from "@/data/mockData";

export default function Footer() {
  return (
    <footer className="bg-forest text-white/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <div className="flex items-center gap-4">
          <Image
            src={IMAGENES.logo}
            alt="Vikinga Tropical"
            width={960}
            height={1112}
            className="h-16 w-auto"
          />
          <p className="max-w-xs text-sm">
            Alimentos de libre pastoreo y ganadería regenerativa en Colima, México.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
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
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Vikinga Tropical. Todos los derechos reservados.
      </div>
    </footer>
  );
}
