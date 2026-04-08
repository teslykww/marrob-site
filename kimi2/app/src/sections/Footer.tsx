import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon } from '../components/icons/BuildingIcons';
import { handleSectionLinkClick } from '@/lib/scrollToSection';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const footerLinks = [
    {
      title: 'Навигация',
      links: [
        { label: 'О термопанелях', href: '#about' },
        { label: 'Коллекции', href: '#catalog' },
        { label: 'Объекты', href: '#gallery' },
        { label: 'Сертификаты', href: '#certs' },
        { label: 'Контакты', href: '#contact' },
        { label: 'Дилерам', to: '/dealers' },
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
                src={`${import.meta.env.BASE_URL}logo.webp`}
                alt=""
                width={160}
                height={40}
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
              <a href="tel:+74996475910" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors">
                <PhoneIcon size={16} />
                +7(499)647-59-10
              </a>
              <a href="mailto:sale@marrob.ru" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors">
                <MailIcon size={16} />
                sale@marrob.ru
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
                    {'to' in link && link.to ? (
                      <Link
                        to={link.to}
                        className="text-white/90 text-sm hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) =>
                          link.href
                            ? handleSectionLinkClick(e, link.href, {
                            navigate,
                            location,
                              })
                            : undefined
                        }
                        className="text-white/90 text-sm hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
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
            <p>© {new Date().getFullYear()} MARROB. Все права защищены.</p>
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
