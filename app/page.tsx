import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Welcome } from "@/components/Welcome";
import { News } from "@/components/News";
import { CampusBento } from "@/components/CampusBento";
import { Team } from "@/components/Team";
import { AdmissionsCTA } from "@/components/AdmissionsCTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Welcome />
        <News />
        <CampusBento />
        <Team />
        <AdmissionsCTA />
      </main>
      <Footer />
    </>
  );
}
