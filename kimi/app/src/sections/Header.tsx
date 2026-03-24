import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';

const navLinks = [
  { label: 'О термопанелях', href: '#about' },
  { label: 'Коллекции', href: '#catalog' },
  { label: 'Объекты', href: '#gallery' },
  { label: 'Параметры', href: '#specs' },
  { label: 'Контакты', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-morphism shadow-soft border-b border-[#E8E4DF]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-[#2A2A2A] tracking-tight font-display transition-colors group-hover:text-[#C45C3E]">
              MAR<span className="text-[#C45C3E]">ROB</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-[#5A5A5A] hover:text-[#C45C3E] transition-colors duration-200 underline-animation"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+79166662335"
              className="flex items-center gap-2 text-sm font-medium text-[#2A2A2A] hover:text-[#C45C3E] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +7 (916) 666-23-35
            </a>
            <MagneticButton
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-[#C45C3E] to-[#E07A5F] text-white hover:shadow-primary font-semibold"
              magneticStrength={0.2}
            >
              Заказать звонок
            </MagneticButton>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-[#2A2A2A]">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-white border-l border-[#E8E4DF]">
              <div className="flex flex-col h-full pt-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold text-[#2A2A2A] font-display">
                    MAR<span className="text-[#C45C3E]">ROB</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-lg font-medium text-[#5A5A5A] hover:text-[#C45C3E] transition-colors text-left py-2"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                  <a
                    href="tel:+79166662335"
                    className="flex items-center gap-2 text-[#2A2A2A] hover:text-[#C45C3E] transition-colors mb-4"
                  >
                    <Phone className="w-5 h-5" />
                    +7 (916) 666-23-35
                  </a>
                  <Button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-gradient-to-r from-[#C45C3E] to-[#E07A5F] text-white hover:shadow-primary font-semibold"
                  >
                    Заказать звонок
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
