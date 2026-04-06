import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLeadModal } from '@/hooks/useLeadModal';
import { postLeadJson } from '@/lib/postLead';
import { formatRuPhoneMask, extractRuPhoneDigits10, isCompleteRuMobile10 } from '@/lib/phoneRu';


const LeadModal: React.FC = () => {
  const { isOpen, close, intent } = useLeadModal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(false);
    setError(null);

    if (!isCompleteRuMobile10(phone)) {
      setPhoneError(true);
      return;
    }

    setSubmitting(true);
    const payload = {
      name,
      phone,
      source: 'modal-form',
      intent,
      page_url: window.location.href,
    };

    const result = await postLeadJson(undefined, payload);
    setSubmitting(false);

    if (result.success) {
      setSent(true);
      setName('');
      setPhone('');
      // Close after 3 seconds or on user button click
      setTimeout(() => {
        setSent(false);
        close();
      }, 3000);
    } else {
      setError(result.errorMessage);
    }
  };

  const getTitle = () => {
    switch (intent) {
      case 'calculate': return 'Рассчитать стоимость фасада';
      case 'callback': return 'Заказать обратный звонок';
      case 'catalog': return 'Получить каталог и прайс';
      default: return 'Оставить заявку';
    }
  };

  const getDescription = () => {
    switch (intent) {
      case 'calculate': return 'Оставьте контакты — мы свяжемся для уточнения деталей и расчёта.';
      case 'callback': return 'Наш специалист перезвонит вам в течение 15 минут.';
      case 'catalog': return 'Отправим актуальный каталог и прайс на ваш номер.';
      default: return 'Менеджер свяжется с вами для консультации.';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{sent ? 'Заявка отправлена!' : getTitle()}</DialogTitle>
          <DialogDescription>
            {sent ? 'Спасибо! Мы свяжемся с вами в ближайшее время.' : getDescription()}
          </DialogDescription>
        </DialogHeader>

        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {error && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-lg text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="modal-name">Ваше имя</Label>
              <Input
                id="modal-name"
                placeholder="Иван"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modal-phone">Телефон <span className="text-destructive">*</span></Label>
              <Input
                id="modal-phone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => {
                  setPhoneError(false);
                  setPhone(formatRuPhoneMask(extractRuPhoneDigits10(e.target.value)));
                }}
                className={phoneError ? 'border-destructive focus-visible:ring-destructive/30' : ''}
              />
              {phoneError && (
                <p className="text-xs text-destructive">Введите полный номер (10 цифр)</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full btn-premium btn-premium--primary h-12"
            >
              {submitting ? 'Отправка...' : 'Отправить'}
            </Button>
            <p className="text-[10px] text-center text-text-light">
              Нажимая «Отправить», вы соглашаетесь с Политикой конфиденциальности.
            </p>
          </form>
        )}

        {sent && (
          <div className="flex justify-center py-4">
            <Button onClick={close} variant="outline" className="w-full">Закрыть</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;
