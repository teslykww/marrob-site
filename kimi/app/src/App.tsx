import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { ProblemSection } from './sections/ProblemSection';
import { SolutionSection } from './sections/SolutionSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { CatalogSection } from './sections/CatalogSection';
import { GallerySection } from './sections/GallerySection';
import { SpecsSection } from './sections/SpecsSection';
import { PurchaseOptions } from './sections/PurchaseOptions';
import { TrustSection } from './sections/TrustSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F7] relative overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 noise-overlay opacity-50" />
      
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <CatalogSection />
        <GallerySection />
        <SpecsSection />
        <PurchaseOptions />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
