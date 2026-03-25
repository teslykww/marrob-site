import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, PhoneIcon } from '../components/icons/BuildingIcons';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isInnerPage = location.pathname === '/dealers' || location.pathname === '/catalog';
  const headerSolid = isScrolled || isInnerPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'О термопанелях' },
    { href: '#catalog', label: 'Коллекции' },
    { href: '#gallery', label: 'Объекты' },
    { href: '#certs', label: 'Сертификаты' },
    { href: '#contact', label: 'Контакты' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-bg-dark text-text-light text-xs py-2">
        <div className="container-premium flex justify-between items-center">
          <div className="flex gap-6">
            <span>МО, Одинцово, ул. Баковская 2А</span>
            <span className="text-primary">Собственное производство</span>
            <span>Срок службы панелей 30 лет</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+79166662335" className="whitespace-nowrap hover:text-primary transition-colors flex items-center gap-1.5">
              <PhoneIcon size={14} />
              +7 (916) 666-23-35
            </a>
            <a href="mailto:info@marrob.ru" className="hover:text-primary transition-colors">
              info@marrob.ru
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 lg:top-[36px] left-0 right-0 z-50 transition-all duration-300 ${
          headerSolid
            ? 'bg-white/95 backdrop-blur-md shadow-premium'
            : 'bg-gradient-to-b from-black/55 via-black/25 to-transparent backdrop-blur-[2px]'
        }`}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span
                className={`inline-flex rounded-xl transition-all duration-300 ${
                  headerSolid ? '' : 'bg-white/92 p-1.5 shadow-md ring-1 ring-white/40'
                }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="MARROB"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </span>
              <div className="hidden sm:block">
                <span
                  className={`font-display font-semibold text-lg transition-colors duration-300 ${
                    headerSolid ? 'text-text' : 'text-white drop-shadow-md'
                  }`}
                >
                  MARROB
                </span>
                <p
                  className={`text-xs -mt-1 transition-colors duration-300 ${
                    headerSolid ? 'text-text-light' : 'text-white/90 drop-shadow-sm'
                  }`}
                >
                  Фасадные термопанели
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal transition-colors ${
                    headerSolid
                      ? 'text-text-muted hover:text-primary'
                      : 'text-white hover:text-primary-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/dealers"
                className={`text-sm font-normal transition-colors ${
                  headerSolid
                    ? 'text-text-muted hover:text-primary'
                    : 'text-white hover:text-primary-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                }`}
              >
                Дилерам
              </Link>
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center">
              {isInnerPage ? (
                <a
                  href="tel:+79166662335"
                  className="btn-premium btn-premium--primary text-sm py-3 px-6"
                >
                  Позвонить
                </a>
              ) : (
                <a
                  href="#contact"
                  className="btn-premium btn-premium--primary text-sm py-3 px-6"
                >
                  Заказать звонок
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                headerSolid ? 'text-text' : 'text-white drop-shadow-md'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 right-0 w-full max-w-sm bg-white shadow-premium-lg rounded-l-2xl p-6 transition-transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-normal text-text py-2 border-b border-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/dealers"
              className="text-lg font-normal text-text py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Дилерам
            </Link>
          </nav>
          <div className="mt-6 pt-6 border-t border-border">
            <a
              href="tel:+79166662335"
              className="flex items-center gap-2 text-lg font-medium text-text mb-4"
            >
              <PhoneIcon size={20} />
              +7 (916) 666-23-35
            </a>
            {isInnerPage ? (
              <a
                href="tel:+79166662335"
                className="btn-premium btn-premium--primary w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Позвонить
              </a>
            ) : (
              <a
                href="#contact"
                className="btn-premium btn-premium--primary w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Заказать звонок
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
