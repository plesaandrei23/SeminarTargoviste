import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CampusZoneNotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pt-40 pb-24">
        <div className="wrap mx-auto max-w-xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-[clamp(2.2rem,4.6vw,3.4rem)]">
            Zona de campus nu a fost găsită
          </h1>
          <p className="mt-4 text-muted text-pretty">
            Pagina nu există sau a fost mutată. Aruncă o privire peste
            celelalte zone ale campusului.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/campus"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-soft"
            >
              Toate zonele campusului
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              Pagina principală
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
