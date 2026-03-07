import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-right">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />

      {/* Footer-like section */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} كالكوايز. البنية التحتية للتداول الاحترافي.
        </p>
      </footer>
    </main>
  );
}



