import React, { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { postLeadJson } from '@/lib/postLead';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CheckCircleIcon,
} from '../components/icons/BuildingIcons';
import { extractRuPhoneDigits10, formatRuPhoneMask, isCompleteRuMobile10 } from '@/lib/phoneRu';

const Contact: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;
  const officePhoto = `${assetBase}images/contact-office.webp`;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const contactFormUrl = import.meta.env.VITE_CONTACT_FORM_URL as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(false);
    setSubmitError(null);
    if (!isCompleteRuMobile10(formData.phone)) {
      setPhoneError(true);
      return;
    }
    setSubmitting(true);
    const result = await postLeadJson(contactFormUrl, {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      source: 'contact',
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
      return;
    }
    setSubmitError(result.errorMessage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setPhoneError(false);
      setFormData({
        ...formData,
        phone: formatRuPhoneMask(extractRuPhoneDigits10(value)),
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const contacts = [
    {
      icon: <PhoneIcon size={24} />,
      title: 'Телефон',
      value: '+7(499)647-59-10',
      href: 'tel:+74996475910',
    },
    {
      icon: <MailIcon size={24} />,
      title: 'Email',
      value: 'sale@marrob.ru',
      href: 'mailto:sale@marrob.ru',
    },
    {
      icon: <MapPinIcon size={24} />,
      title: 'Адрес',
      value: 'МО, Одинцово, ул. Баковская 2А',
      href: 'https://yandex.ru/maps/10716/odintsovo/house/bakovskaya_ulitsa_2a/Z04Yfg5jT0QBQFtvfX5wdH1hZA==/?ll=37.270970%2C55.679857&z=17',
    },
  ];

  return (
    <section id="contact" className="section-premium bg-sand-light relative overflow-hidden main-rhythm-rule">
      {/* Decorative blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge-premium mb-4">Контакты</span>
            <h2 className="type-section-title mb-4">
              Свяжитесь с нами
            </h2>
            <p className="type-section-lead mb-6">
              Получите бесплатную консультацию и расчёт стоимости вашего фасада
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-premium hover:shadow-premium-md transition-all group"
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-text-light text-xs uppercase tracking-wider mb-1">
                      {contact.title}
                    </p>
                    <p className="font-display font-medium text-text">
                      {contact.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Форма + фото: колонка со снимком слева только с lg; на узком экране — полоса фото сверху, без фона за формой */}
          <div className="rounded-2xl overflow-hidden shadow-premium-lg bg-white flex flex-col lg:flex-row lg:items-stretch lg:min-h-[min(520px,72vh)]">
            <figure className="relative w-full shrink-0 min-h-[200px] sm:min-h-[240px] lg:w-[42%] lg:max-w-md lg:min-h-0">
              <img
                src={officePhoto}
                alt="Офис MARROB в Одинцово — переговорная для встреч с клиентами"
                className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 via-black/35 to-transparent">
                <span className="text-sm font-medium text-white/95">Наш офис · Одинцово</span>
                <span className="block text-xs text-white/75 mt-0.5">Ждём вас на консультацию</span>
              </figcaption>
            </figure>

            <div className="flex flex-1 flex-col justify-center bg-white p-6 md:p-8">
            <h3 className="type-card-title mb-6">Оставить заявку</h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon size={32} className="text-green-600" />
                </div>
                <h4 className="type-card-title mb-2">Заявка отправлена!</h4>
                <p className="text-text-muted">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 text-red-700 text-sm font-medium px-4 py-3 text-center"
                  >
                    {submitError}
                  </div>
                )}
                <div>
                  <label className="type-label mb-2 block text-text-muted">Ваше имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 bg-sand-light rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="type-label mb-2 block text-text-muted">Телефон *</label>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    aria-invalid={phoneError}
                    className={`w-full px-4 py-3 bg-sand-light rounded-xl border focus:outline-none transition-colors ${
                      phoneError ? 'border-destructive' : 'border-transparent focus:border-primary'
                    }`}
                    required
                  />
                  {phoneError && (
                    <p className="text-sm text-destructive mt-1.5 m-0">Введите полный номер из 10 цифр после +7</p>
                  )}
                </div>
                <div>
                  <label className="type-label mb-2 block text-text-muted">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    className="w-full px-4 py-3 bg-sand-light rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="type-label mb-2 block text-text-muted">Сообщение</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Опишите ваш проект или задайте вопрос..."
                    rows={4}
                    className="w-full px-4 py-3 bg-sand-light rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-premium btn-premium--primary disabled:opacity-60"
                >
                  {submitting ? 'Отправка…' : 'Отправить заявку'}
                </button>
                <p className="text-xs text-text-light text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
