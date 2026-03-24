import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon } from '../components/icons/BuildingIcons';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Навигация',
      links: [
        { label: 'О термопанелях', href: '#about' },
        { label: 'Преимущества', href: '#benefits' },
        { label: 'Коллекции', href: '#catalog' },
        { label: 'Объекты', href: '#gallery' },
        { label: 'Сертификаты', href: '#certs' },
        { label: 'Параметры', href: '#specs' },
        { label: 'Как мы работаем', href: '#stages' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { label: 'Гарантия', href: '#' },
        { label: 'Производство', href: '#' },
        { label: 'Доставка', href: '#' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
  ];

  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Main Footer */}
      <div className="container-premium py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="MARROB"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <div>
                <span className="font-display font-semibold text-lg text-white">MARROB</span>
                <p className="text-white/80 text-xs -mt-1">Фасадные термопанели</p>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-6 max-w-sm">
              Производство и монтаж фасадных термопанелей с облицовкой под натуральный камень. 
              Собственное производство в Московской области.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+79166662335" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors">
                <PhoneIcon size={16} />
                +7 (916) 666-23-35
              </a>
              <a href="mailto:info@marrob.ru" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors">
                <MailIcon size={16} />
                info@marrob.ru
              </a>
              <span className="flex items-center gap-2 text-white/90">
                <MapPinIcon size={16} />
                МО, Одинцово, ул. Баковская 2А
              </span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-white">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-white/90 text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/90">
            <p>© 2024 MARROB. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/90 hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-white/90 hover:text-primary transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
