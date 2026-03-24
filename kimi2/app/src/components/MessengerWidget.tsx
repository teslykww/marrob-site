import React from 'react';
import { WhatsAppIcon, TelegramIcon } from './icons/BuildingIcons';

const WHATSAPP_URL = 'https://wa.me/79166662335';
const TELEGRAM_URL = 'https://t.me/marrob';

const MessengerWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[52px] h-[52px] rounded-full bg-[#2A2A2A] text-white flex items-center justify-center shadow-premium-lg hover:scale-105 transition-transform"
        aria-label="Написать в WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[52px] h-[52px] rounded-full bg-[#2A2A2A] text-white flex items-center justify-center shadow-premium-lg hover:scale-105 transition-transform"
        aria-label="Написать в Telegram"
      >
        <TelegramIcon size={24} />
      </a>
    </div>
  );
};

export default MessengerWidget;
