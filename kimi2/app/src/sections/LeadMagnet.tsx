import React, { useState } from 'react';
import { FileTextIcon } from '../components/icons/BuildingIcons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const LeadMagnet: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <section id="lead" className="section-premium bg-sand-light">
      <div className="container-premium">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-10 shadow-premium text-center">
          <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center text-primary mx-auto mb-6">
            <FileTextIcon size={28} />
          </div>
          <p className="text-text-muted text-lg mb-6">
            Получите актуальный прайс-лист и каталог коллекций
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-premium btn-premium--primary"
          >
            Скачать прайс и каталог
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Скачать прайс и каталог</DialogTitle>
            <DialogDescription>
              Оставьте контакты — отправим материалы на почту или в мессенджер.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 pt-2">
            <div>
              <label htmlFor="lead-name" className="block text-sm font-medium text-text mb-1.5">
                Имя
              </label>
              <Input id="lead-name" name="name" placeholder="Ваше имя" className="h-11" />
            </div>
            <div>
              <label htmlFor="lead-phone" className="block text-sm font-medium text-text mb-1.5">
                Телефон <span className="text-destructive">*</span>
              </label>
              <Input
                id="lead-phone"
                name="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                required
                className="h-11"
              />
            </div>
            <button type="submit" className="btn-premium btn-premium--primary w-full mt-2">
              Отправить
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LeadMagnet;
