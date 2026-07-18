import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenMeasurerModal: () => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMeasurerModal, onOpenCalculator }) => {
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const hours = new Date().getHours();
    // Working hours: 8:00 to 21:00
    setIsOpenNow(hours >= 8 && hours < 21);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-warm-bg/95 backdrop-blur-md border-b border-stone-border transition-all" id="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo and Business claim */}
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white font-serif font-bold text-xl px-3 py-1 flex items-center justify-center tracking-normal">
            ЕСС
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-serif font-bold text-gray-900 tracking-tight leading-none">
              Единая Строительная Служба
            </h1>
            <p className="text-[11px] text-gray-500 mt-0.5 max-w-[240px] leading-tight font-sans">
              Производитель заборов и ворот в Екатеринбурге с 2007 года
            </p>
          </div>
        </div>

        {/* Schedule & Working Hours */}
        <div className="hidden md:flex items-center gap-2.5 text-xs text-gray-600">
          <div className="p-2 bg-stone-beige text-primary rounded-none">
            <Clock size={15} />
          </div>
          <div>
            <div className="font-semibold text-gray-800">Ежедневно: 8:00 – 21:00</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-primary animate-pulse' : 'bg-red-400'}`}></span>
              <span className="text-[10px] text-gray-400 font-medium">
                {isOpenNow ? 'Офис открыт, звоните!' : 'Офис закрыт, напишите нам'}
              </span>
            </div>
          </div>
        </div>

        {/* Office Location */}
        <div className="hidden lg:flex items-center gap-2.5 text-xs text-gray-600">
          <div className="p-2 bg-stone-beige text-primary rounded-none">
            <MapPin size={15} />
          </div>
          <div>
            <div className="font-semibold text-gray-800">Екатеринбург</div>
            <div className="text-[11px] text-gray-400 mt-0.5">ул. Малышева, 51 (БЦ Высоцкий)</div>
          </div>
        </div>

        {/* Call-to-action details */}
        <div className="flex items-center gap-4 ml-auto sm:ml-0">
          <div className="text-right">
            <a 
              href="tel:+79377372153" 
              className="block text-base sm:text-lg font-bold text-gray-950 hover:text-primary transition-colors tracking-tight leading-none"
              aria-label="Позвонить в ЕСС"
            >
              +7 (937) 737-21-53
            </a>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
              Звонок по Свердловской обл. бесплатный
            </span>
          </div>

          <button
            onClick={onOpenMeasurerModal}
            id="header-cta-btn"
            className="hidden sm:inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-none transition-all cursor-pointer border border-primary"
          >
            Вызвать замерщика
          </button>
        </div>

      </div>
    </header>
  );
};
