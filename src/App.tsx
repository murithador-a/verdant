import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Transformation from "./components/Transformation";
import Services from "./components/Services";
import WhyVerdant from "./components/WhyVerdant";
import BeforeAfter from "./components/BeforeAfter";
import Process from "./components/Process";
import Plans from "./components/Plans";
import Commercial from "./components/Commercial";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Locations from "./components/Locations";
import Journal from "./components/Journal";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { WhatsAppFloat } from "./components/WhatsAppCTA";
import { prefersReducedMotion, registerGsap, setLenis } from "./lib/motion";

export default function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    registerGsap();
    const reduced = prefersReducedMotion();

    const refresh = (): void => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) {
      void document.fonts.ready.then(refresh);
    }

    if (reduced) {
      setStarted(true);
      return () => window.removeEventListener("load", refresh);
    }

    /* Buttery smooth scrolling, driven by GSAP's ticker */
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const t = window.setTimeout(() => setStarted(true), 1150);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-cream"
      >
        Skip to content
      </a>

      <Loader done={started} />
      <div aria-hidden="true" className="grain-layer" />
      <Navbar />

      <main id="main">
        <Hero started={started} />
        <Marquee />
        <Transformation />
        <Services />
        <WhyVerdant />
        <BeforeAfter />
        <Process />
        <Plans />
        <Commercial />
        <Stats />
        <Testimonials />
        <Team />
        <Locations />
        <Journal />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
