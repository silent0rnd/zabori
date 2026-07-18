import React from 'react';
import { FOUNDER_IMAGE_URL } from '../data';
import { Send, Phone, MessageSquare } from 'lucide-react';

interface FounderBlockProps {
  onOpenConsultModal: () => void;
}

export const FounderBlock: React.FC<FounderBlockProps> = ({ onOpenConsultModal }) => {
  return (
    <section className="py-16 sm:py-20 bg-warm-bg border-b border-stone-border" id="founder-block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-none border border-stone-border overflow-hidden p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Image & Details */}
            <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="relative">
                <div className="absolute inset-0 bg-stone-beige rounded-none transform rotate-2 scale-102 opacity-40"></div>
                <img
                  src={FOUNDER_IMAGE_URL}
                  alt="Александр — Основатель ЕСС"
                  className="relative w-48 h-48 sm:w-60 sm:h-60 object-cover rounded-none border border-stone-border bg-stone-beige p-1.5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-950 mt-6 mb-1">Александр</h3>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                Основатель Единой Строительной Службы
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-sans">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>На связи с клиентами лично</span>
              </div>
            </div>

            {/* Founder Message Content */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              
              <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">
                Честный подход к делу
              </span>
              
              <h4 className="text-2xl sm:text-3xl font-serif font-normal text-gray-950 tracking-tight mb-6">
                Обращение от основателя компании
              </h4>

              <div className="text-gray-600 space-y-4 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  Для меня забор и ворота — это не просто ограждение по периметру. Это <strong>порядок на участке</strong>, <strong>безопасность для семьи</strong> и ощущение, что дом наконец-то стал завершённым и по-настоящему вашим.
                </p>
                <p>
                  Мы работаем по простому принципу: <strong>делать так, чтобы потом не было стыдно</strong> ни перед клиентом, ни перед собой. Поэтому заранее детально считаем смету, подбираем правильный металл под уральский климат и грунт, фиксируем все договорённости в официальном договоре и показываем этапы работ в фото- и видеоотчётах.
                </p>
                <p className="bg-stone-beige/40 border-l-2 border-primary p-4 rounded-none text-gray-800 italic font-serif text-sm sm:text-base">
                  «Я никогда не обещаю “самую низкую цену на рынке”. Обычно за такими обещаниями скрывается слишком тонкий металл, слабые опоры, спешка замерщиков и переделки забора за свой счёт уже через сезон. Вместо этого мы делаем понятный, надёжный расчёт и аккуратный монтаж, который спокойно служит десятилетиями!»
                </p>
                <p>
                  Если вы хотите понять, какой забор подойдёт именно вашему грунту и бюджету, оставьте заявку — я или наши технические специалисты рассчитаем стоимость проекта и подскажем оптимальный шаг опор и марку профнастила.
                </p>
              </div>

              {/* Action buttons to call Alexander */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenConsultModal}
                  className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold tracking-wide uppercase px-6 py-3.5 rounded-none transition-all cursor-pointer flex items-center gap-2 border border-primary"
                >
                  <MessageSquare size={15} />
                  Обсудить проект с Александром
                </button>
                <a
                  href="tel:+79377372153"
                  className="bg-white hover:bg-stone-beige/50 border border-stone-border text-gray-800 text-xs sm:text-sm font-semibold tracking-wide uppercase px-6 py-3.5 rounded-none transition-all flex items-center gap-2"
                >
                  <Phone size={15} className="text-primary" />
                  Позвонить напрямую
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
