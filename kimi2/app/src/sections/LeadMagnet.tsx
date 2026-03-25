import React, { useState } from 'react';
import { FileTextIcon } from '../components/icons/BuildingIcons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { extractRuPhoneDigits10, formatRuPhoneMask, isCompleteRuMobile10 } from '@/lib/phoneRu';
import { cn } from '@/lib/utils';

const inputClass =
  'min-h-11 h-11 py-2.5 text-base md:text-sm border-border focus-visible:ring-primary/30';

const messengers = [
  { value: 'max', label: 'MAX' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
] as const;

const LeadMagnet: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [messenger, setMessenger] = useState<string>('telegram');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const leadFormUrl = import.meta.env.VITE_LEAD_FORM_URL as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(false);
    if (!isCompleteRuMobile10(phone)) {
      setPhoneError(true);
      return;
    }
    setSubmitting(true);
    const payload = {
      name,
      phone,
      messenger,
      source: 'lead-magnet',
      intent: 'price-catalog',
    };
    if (leadFormUrl) {
      try {
        await fetch(leadFormUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        /* сеть / CORS */
      }
    }
    setSubmitting(false);
    setName('');
    setPhone('');
    setMessenger('telegram');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="lead" className="bg-sand-light py-10 md:py-12 px-[var(--section-px)]">
      <div className="container-premium">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-10 shadow-premium border border-border">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center text-primary mx-auto mb-6">
              <FileTextIcon size={28} />
            </div>
            <p className="text-text-muted text-lg m-0 leading-relaxed px-1">
              Получите актуальный прайс-лист и каталог коллекций
            </p>
          </div>

          {sent ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-lg bg-accent/10 text-accent text-sm font-medium px-4 py-3 text-center"
            >
              Заявка принята. Отправим материалы в выбранный мессенджер или свяжемся с вами.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 max-w-md mx-auto w-full text-left">
              <div className="space-y-2">
                <Label htmlFor="lead-name">Имя</Label>
                <Input
                  id="lead-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-phone">
                  Телефон <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  aria-invalid={phoneError}
                  className={
                    phoneError
                      ? `${inputClass} border-destructive focus-visible:ring-destructive/40`
                      : inputClass
                  }
                  value={phone}
                  onChange={(e) => {
                    setPhoneError(false);
                    setPhone(formatRuPhoneMask(extractRuPhoneDigits10(e.target.value)));
                  }}
                />
                {phoneError && (
                  <p className="text-sm text-destructive m-0" role="alert" aria-live="polite">
                    Введите полный номер: 10 цифр после +7
                  </p>
                )}
              </div>
              <fieldset className="space-y-3 min-w-0 border-0 p-0 m-0">
                <legend className="text-sm font-medium text-text mb-0 px-0">
                  Удобный мессенджер для общения
                </legend>
                <RadioGroup value={messenger} onValueChange={setMessenger} className="grid gap-2 sm:grid-cols-3">
                  {messengers.map(({ value, label }) => {
                    const id = `lead-msgr-${value}`;
                    const selected = messenger === value;
                    return (
                      <div
                        key={value}
                        className={cn(
                          'flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm text-text transition-colors',
                          selected ? 'border-primary bg-primary/5' : 'border-border bg-sand-light/60'
                        )}
                      >
                        <RadioGroupItem value={value} id={id} className="shrink-0" />
                        <Label htmlFor={id} className="m-0 flex-1 cursor-pointer font-medium leading-none">
                          {label}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </fieldset>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full btn-premium btn-premium--primary min-h-12 h-12 text-base font-semibold"
              >
                {submitting ? 'Отправка…' : 'Скачать прайс и каталог'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
