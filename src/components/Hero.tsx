import React, { useState, useEffect } from 'react';
import { HERO_IMAGE_URL } from '../data';
import { ShieldCheck, Award, Calendar, Zap, Gift, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onOpenMeasurerModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz, onOpenMeasurerModal }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Calculate normalized position from center (-1 to 1)
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      // Set offset amount (max 18 pixels translation)
      setMousePos({ x: dx * 18, y: dy * 18 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative bg-[#253629] text-white overflow-hidden" id="hero-section">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Красивый забор ЕСС в Екатеринбурге"
          className="w-full h-full object-cover object-center opacity-25 transform scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17241b] via-[#24362a]/95 to-[#24362a]/40"></div>
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-warm-bg via-warm-bg/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subheading, CTAs and Pillars */}
          <div className="lg:col-span-7">
            
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-6">
              Установка заборов <span className="font-semibold text-stone-beige italic">ПОД КЛЮЧ</span> <br className="hidden sm:inline" />
              в Екатеринбурге и до 100 км вокруг
            </h2>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed font-sans font-light">
              Изготавливаем и монтируем надежные, ровные ограждения напрямую от производителя. Без наценок посредников, переделок и скрытых платежей!
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                onClick={onStartQuiz}
                className="bg-primary hover:bg-primary-hover text-white border border-stone-beige/30 font-semibold uppercase text-xs sm:text-sm tracking-wider px-8 py-4 rounded-none transition-all cursor-pointer text-center"
              >
                Рассчитать стоимость & получить подарки
              </button>
              <button
                onClick={onOpenMeasurerModal}
                className="bg-stone-beige/10 hover:bg-stone-beige/20 border border-white/20 text-white font-semibold uppercase text-xs sm:text-sm tracking-wider px-6 py-4 rounded-none transition-all cursor-pointer text-center backdrop-blur-sm"
              >
                Вызвать замерщика сегодня
              </button>
            </div>

            {/* Pillars grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-8">
              
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white/5 border border-white/10 rounded-none text-stone-beige flex-shrink-0 mt-0.5">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Цена производителя</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Без наценки посредников, выгода до 30%</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white/5 border border-white/10 rounded-none text-stone-beige flex-shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Гарантия до 20 лет</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Официальный договор, работаем строго по ГОСТ</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white/5 border border-white/10 rounded-none text-stone-beige flex-shrink-0 mt-0.5">
                  <Calendar size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Быстрый замер</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Выезд на замер в день вашего обращения</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white/5 border border-white/10 rounded-none text-stone-beige flex-shrink-0 mt-0.5">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Монтаж за 2 дня</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Собственные обученные русские бригады</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Animated Interactive Parallax Gift Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <div 
              className="relative p-8 w-full max-w-sm bg-[#1c2e22]/85 border border-[#d4af37]/40 rounded-none shadow-2xl backdrop-blur-md overflow-hidden group transition-all duration-300 ease-out cursor-pointer"
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px) rotateX(${-mousePos.y * 0.35}deg) rotateY(${mousePos.x * 0.35}deg)`,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              onClick={onStartQuiz}
            >
              {/* Golden glows */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Gift icon with custom background */}
                <div className="relative mb-6 transform transition-transform group-hover:scale-110 duration-500">
                  <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative p-5 bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#8b6508] border border-stone-beige/40 text-white rounded-none shadow-lg">
                    <Gift size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Tagline */}
                <span className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase font-sans mb-1.5 block">
                  АКЦИЯ ЭТОЙ НЕДЕЛИ
                </span>

                {/* Custom Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 tracking-tight">
                  Калитка в подарок!
                </h3>

                {/* Subtitle / text description */}
                <p className="text-xs text-gray-300 leading-relaxed font-sans font-light mb-6">
                  Пройдите быстрый расчет стоимости забора в калькуляторе и зафиксируйте за собой <span className="font-semibold text-stone-beige italic">подарочную калитку под ключ</span> при заказе!
                </p>

                {/* Premium Active Action Button */}
                <div className="w-full bg-[#d4af37] hover:bg-[#c5a02c] text-gray-950 font-serif font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-xl">
                  <span>Получить подарок</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
