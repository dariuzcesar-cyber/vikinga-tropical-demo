import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vikinga Tropical | Alimentos de libre pastoreo en Colima",
  description:
    "Huevo, pollo, res y cerdo de libre pastoreo y ganadería regenerativa. Frescura local en Colima, Tecomán, Manzanillo, Guadalajara y CDMX.",
};

export const viewport: Viewport = {
  themeColor: "#1B3B22",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
