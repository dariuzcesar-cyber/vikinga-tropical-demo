import Academy from "@/components/Academy";
import CartDrawer from "@/components/CartDrawer";
import Catalog from "@/components/Catalog";
import Contact from "@/components/Contact";
import Farm from "@/components/Farm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Farm />
        <Academy />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
