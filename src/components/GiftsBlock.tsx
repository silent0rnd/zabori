import React from 'react';
import { GIFTS } from '../data';
import { Gift, ShieldCheck, DoorOpen, Truck, HelpCircle, CheckCircle } from 'lucide-react';

interface GiftsBlockProps {
  onClaimGifts: () => void;
}

export const GiftsBlock: React.FC<GiftsBlockProps> = ({ onClaimGifts }) => {
  
  // Custom icon renderer using Lucide
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Door':
        return <DoorOpen size={30} className="text-primary" />;
      case 'ShieldCheck':
        return <ShieldCheck size={30} className="text-primary" />;
      case 'Truck':
        return <Truck size={30} className="text-primary" />;
      default:
        return <Gift size={30} className="text-primary" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-beige/25 border-b border-stone-border relative" id="gifts-promo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Акция этой недели</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-950 tracking-tight leading-tight">
            Оставьте заявку сейчас и <span className="text-primary italic font-semibold">получите все 3 подарка</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-light">
            Мы дарим гарантированные подарки общей ценностью <strong className="text-gray-950 font-semibold">78 000 рублей</strong> при оформлении договора на монтаж забора. Без скрытых условий!
          </p>
        </div>

        {/* Bento-grid structure for Gifts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {GIFTS.map((gift) => (
            <div 
              key={gift.id}
              className="bg-white rounded-none border border-stone-border p-6 shadow-none hover:border-primary/40 transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                
                {/* Gift Value Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="p-3 bg-stone-beige rounded-none border border-stone-border">
                    {renderIcon(gift.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-medium line-through block">
                      {gift.value.toLocaleString()} ₽
                    </span>
                    <span className="text-lg font-bold text-primary block">
                      БЕСПЛАТНО
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
                  {gift.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4 font-light">
                  {gift.description}
                </p>

              </div>

              {/* Specific guarantee tag if present */}
              {gift.guarantee && (
                <div className="mt-4 pt-3 border-t border-stone-border flex items-center gap-1.5 text-[10px] font-semibold text-primary">
                  <CheckCircle size={12} className="text-primary" />
                  <span>{gift.guarantee}</span>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Footer Call to Action for Gifts */}
        <div className="text-center bg-white rounded-none border border-stone-border p-6 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-none">
          <div className="text-left font-sans">
            <h4 className="text-sm font-bold text-gray-950 font-serif">Забронировать пакет подарков?</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Количество пакетов ограничено загрузкой завода</p>
          </div>
          <button
            onClick={onClaimGifts}
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-none transition-all cursor-pointer border border-primary"
          >
            Забрать все подарки
          </button>
        </div>

      </div>
    </section>
  );
};
