import React, { useState } from 'react';
import { FileTextIcon } from '@/components/icons/BuildingIcons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { extractRuPhoneDigits10, formatRuPhoneMask, isCompleteRuMobile10 } from '@/lib/phoneRu';
import { postLeadJson } from '@/lib/postLead';
import { cn } from '@/lib/utils';

const inputClass =
  'min-h-11 h-11 py-2.5 text-base md:text-sm border-border focus-visible:ring-primary/30';

const messengers = [
  { value: 'max', label: 'MAX' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
] as const;

export type MagnetLeadFormProps = {
  /** Префикс id полей (уникален на странице, если несколько форм) */
  idPrefix: string;
  /** Источник в CRM (POST /leads/magnet) */
  source: string;
  intent?: string;
  className?: string;
  cardClassName?: string;
  title?: string;
  description?: string;
  showTopIcon?: boolean;
  submitLabel?: string;
  /** Крупное фото слева (на lg), на мобиле — блок над формой */
  sideImageSrc?: string;
  sideImageAlt?: string;
};

const MagnetLeadForm: React.FC<MagnetLeadFormProps> = ({
  idPrefix,
  source,
  intent = 'price-catalog',
  className,
  cardClassName,
  title,
  description,
  showTopIcon = true,
  submitLabel = 'Скачать прайс и каталог',
  sideImageSrc,
  sideImageAlt = 'Пример застройки с фасадными термопанелями',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [messenger, setMessenger] = useState<string>('telegram');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const leadFormUrl = import.meta.env.VITE_LEAD_FORM_URL as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(false);
    setSubmitError(null);
    if (!isCompleteRuMobile10(phone)) {
      setPhoneError(true);
      return;
    }
    setSubmitting(true);
    const payload = {
      name,
      phone,
      messenger,
      source,
      intent,
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
    const result = await postLeadJson(leadFormUrl, payload);
    setSubmitting(false);
    if (result.success) {
      setName('');
      setPhone('');
      setMessenger('telegram');
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      return;
    }
    setSubmitError(result.errorMessage);
  };

  const hasSideImage = Boolean(sideImageSrc);

  const headerBlock =
    (showTopIcon || title || description) && (
      <div
        className={cn('mb-6 md:mb-8', hasSideImage ? 'text-left' : 'text-center')}
      >
        {showTopIcon && (
          <div
            className={cn(
              'mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary',
              !hasSideImage && 'mx-auto',
            )}
          >
            <FileTextIcon size={28} />
          </div>
        )}
        {title && (
          <h3 className={cn('type-section-subtitle m-0 mb-2', hasSideImage ? 'text-left' : 'text-center')}>
            {title}
          </h3>
        )}
        {description && (
          <p className={cn('type-section-lead m-0', hasSideImage ? 'px-0 text-left' : 'px-1 text-center')}>
            {description}
          </p>
        )}
      </div>
    );

  const formBlock = sent ? (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl bg-accent/10 px-4 py-4 text-center text-sm font-medium text-accent sm:py-3"
    >
      Заявка принята. Отправим материалы в выбранный мессенджер или свяжемся с вами.
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-4 text-left sm:space-y-5 lg:max-w-none">
      {submitError && (
        <div
          role="alert"
          className="rounded-lg bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-destructive"
        >
          {submitError}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-name`} className="type-label">
          Имя
        </Label>
        <Input
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-phone`} className="type-label">
          Телефон <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}-phone`}
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
          <p className="m-0 text-sm text-destructive" role="alert" aria-live="polite">
            Введите полный номер: 10 цифр после +7
          </p>
        )}
      </div>
      <fieldset className="m-0 min-w-0 space-y-3 border-0 p-0">
        <legend className="type-label mb-0 px-0">Удобный мессенджер для общения</legend>
        <RadioGroup value={messenger} onValueChange={setMessenger} className="grid gap-2 sm:grid-cols-3">
          {messengers.map(({ value, label }) => {
            const id = `${idPrefix}-msgr-${value}`;
            const selected = messenger === value;
            return (
              <div
                key={value}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm text-text transition-colors',
                  selected ? 'border-primary bg-primary/5' : 'border-border bg-sand-light/60',
                )}
              >
                <RadioGroupItem value={value} id={id} className="shrink-0" />
                <Label htmlFor={id} className="m-0 flex-1 cursor-pointer font-medium leading-tight">
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
        className="btn-premium btn-premium--primary h-12 min-h-12 w-full text-base font-semibold"
      >
        {submitting ? 'Отправка…' : submitLabel}
      </Button>
    </form>
  );

  if (hasSideImage) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-3xl border border-border/90 bg-white shadow-premium-lg ring-1 ring-black/[0.04]',
          className,
        )}
      >
        <div className="grid min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:min-h-[min(520px,70vh)]">
          <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
            <img
              src={sideImageSrc}
              alt={sideImageAlt}
              className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#2a2825]/75 via-[#2a2825]/15 to-transparent lg:bg-gradient-to-r lg:from-[#2a2825]/50 lg:via-[#2a2825]/10 lg:to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-[#faf9f7] via-[#faf9f7]/85 to-transparent lg:block"
              aria-hidden
            />
            <div className="absolute bottom-5 left-5 right-5 max-w-[90%] lg:bottom-8 lg:left-8">
              <p className="type-trust-label m-0 font-semibold uppercase tracking-[0.18em] text-white/90 drop-shadow-md">
                MARROB
              </p>
              <p className="mt-1.5 max-w-sm text-base font-medium leading-snug text-white drop-shadow-md sm:text-lg">
                Тёплый дом с фасадом, который служит десятилетиями
              </p>
            </div>
          </div>

          <div
            className={cn(
              'relative flex flex-col justify-center bg-gradient-to-br from-white via-[#faf9f7] to-primary-light/25 p-6 sm:p-8 md:p-10',
              cardClassName,
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_80%_20%,rgba(124,154,107,0.12),transparent_45%)]" />
            <div className="relative z-[1]">
              {headerBlock}
              {formBlock}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl border border-border bg-white p-6 shadow-premium sm:p-8 md:p-10', cardClassName, className)}>
      {headerBlock}
      {formBlock}
    </div>
  );
};

export default MagnetLeadForm;
