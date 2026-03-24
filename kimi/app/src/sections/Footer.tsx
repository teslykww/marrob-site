import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  ArrowUpRight
} from 'lucide-react';

const navLinks = [
  { label: 'О термопанелях', href: '#about' },
  { label: 'Коллекции', href: '#catalog' },
  { label: 'Объекты', href: '#gallery' },
  { label: 'Параметры', href: '#specs' },
  { label: 'Контакты', href: '#contact' },
];

const contacts = [
  { icon: Phone, label: 'Телефон', value: '+7 (916) 666-23-35', href: 'tel:+79166662335' },
  { icon: Mail, label: 'Email', value: 'info@marrob.ru', href: 'mailto:info@marrob.ru' },
  { icon: MapPin, label: 'Адрес', value: 'МО, Одинцово, ул. Баковская 2А', href: '#' },
  { icon: Clock, label: 'Режим работы', value: 'Пн-Пт: 9:00 - 18:00', href: '#' },
];

const messengers = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/+79166662335', color: 'from-[#25D366] to-[#128C7E]' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/+79166662335', color: 'from-[#0088cc] to-[#229ED9]' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#C45C3E]/10 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-white tracking-tight font-display">
                MAR<span className="text-[#C45C3E]">ROB</span>
              </span>
            </a>
            <p className="text-[#9A9A9A] text-sm leading-relaxed mb-6">
              Производитель фасадных термопанелей с облицовкой под натуральный камень. 
              Поставка по РФ. Монтаж — Москва и Московская область.
            </p>
            
            {/* Messengers */}
            <div className="flex gap-3">
              {messengers.map((messenger, index) => (
                <a
                  key={index}
                  href={messenger.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${messenger.color} flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg`}
                  title={messenger.label}
                >
                  <messenger.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6 font-display">Навигация</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#9A9A9A] hover:text-[#C45C3E] transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 font-display">Контакты</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C45C3E] transition-colors">
                    <contact.icon className="w-5 h-5 text-[#9A9A9A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6A6A6A] mb-1">{contact.label}</p>
                    <p className="text-sm text-[#DADADA] group-hover:text-white transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6A6A6A] text-center md:text-left">
              <p>ООО «МАРРОБ» | ИНН: 7734650123 | ОГРН: 1157746123456</p>
              <p className="mt-1">
                Продукция сертифицирована и соответствует нормативным требованиям
              </p>
            </div>
            <div className="flex gap-4 text-xs">
              <a href="#" className="text-[#6A6A6A] hover:text-[#DADADA] transition-colors underline-animation">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-[#6A6A6A] hover:text-[#DADADA] transition-colors underline-animation">
                Согласие на обработку данных
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
