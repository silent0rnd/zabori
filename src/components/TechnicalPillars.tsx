import React, { useState } from 'react';
import { ShieldCheck, Wind, HelpCircle, Activity, Ruler } from 'lucide-react';

export const TechnicalPillars: React.FC = () => {
  const [activeParam, setActiveParam] = useState<'frost' | 'wind' | 'terrain'>('frost');

  return (
    <section className="py-16 sm:py-20 bg-stone-beige/10 border-b border-stone-border" id="tech-pillars-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Наши инженерные стандарты</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-950 tracking-tight">
            3 параметра <span className="text-primary italic font-semibold">абсолютной устойчивости</span> забора
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-light">
            Мы строим на совесть. Каждый забор устанавливается по строгим нормам СНиП с учётом уральского климата.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Interactive Navigation and Descriptions */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Frost */}
            <button
              onClick={() => setActiveParam('frost')}
              className={`w-full p-5 text-left rounded-none border transition-all cursor-pointer flex gap-4 ${
                activeParam === 'frost'
                  ? 'bg-white border-primary shadow-none ring-0'
                  : 'bg-transparent border-stone-border hover:bg-stone-beige/20'
              }`}
            >
              <div className={`p-3 rounded-none border flex-shrink-0 ${
                activeParam === 'frost' ? 'bg-primary border-primary text-white' : 'bg-stone-beige border-stone-border text-gray-500'
              }`}>
                <Activity size={20} />
              </div>
              <div className="font-sans">
                <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base">Глубокое замерзание грунта (1.2 м)</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">
                  Бетонируем столбы строго ниже уровня промерзания почвы Свердловской области. Засыпаем дренажем, чтобы весной опору не выдавило.
                </p>
              </div>
            </button>

            {/* Wind */}
            <button
              onClick={() => setActiveParam('wind')}
              className={`w-full p-5 text-left rounded-none border transition-all cursor-pointer flex gap-4 ${
                activeParam === 'wind'
                  ? 'bg-white border-primary shadow-none ring-0'
                  : 'bg-transparent border-stone-border hover:bg-stone-beige/20'
              }`}
            >
              <div className={`p-3 rounded-none border flex-shrink-0 ${
                activeParam === 'wind' ? 'bg-primary border-primary text-white' : 'bg-stone-beige border-stone-border text-gray-500'
              }`}>
                <Wind size={20} />
              </div>
              <div className="font-sans">
                <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base">Расчёт ветровой нагрузки</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">
                  Подбираем оптимальный шаг столбов, глубину врезки и толщину лаг, чтобы забор выдержал мощнейшие порывы ураганного ветра.
                </p>
              </div>
            </button>

            {/* Terrain */}
            <button
              onClick={() => setActiveParam('terrain')}
              className={`w-full p-5 text-left rounded-none border transition-all cursor-pointer flex gap-4 ${
                activeParam === 'terrain'
                  ? 'bg-white border-primary shadow-none ring-0'
                  : 'bg-transparent border-stone-border hover:bg-stone-beige/20'
              }`}
            >
              <div className={`p-3 rounded-none border flex-shrink-0 ${
                activeParam === 'terrain' ? 'bg-primary border-primary text-white' : 'bg-stone-beige border-stone-border text-gray-500'
              }`}>
                <Ruler size={20} />
              </div>
              <div className="font-sans">
                <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base">Компенсация неровностей участка</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">
                  Проводим предварительный геодезический замер перепадов высот. Собираем секции забора ступенчато или в уровень для идеального силуэта.
                </p>
              </div>
            </button>

          </div>

          {/* Interactive Technical Schematic Diagram */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-white rounded-none border border-stone-border p-6 sm:p-8 shadow-none max-w-sm w-full">
              
              <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-6 text-center font-sans">
                Чертеж установки опорного столба
              </h4>

              {/* Dynamic Schematic Graphic */}
              <div className="relative h-80 bg-stone-beige/20 border border-stone-border rounded-none overflow-hidden p-4 flex flex-col justify-between font-mono text-[9px] text-gray-500">
                
                {/* Steel Post */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-4 bg-gray-400 border-x border-gray-600 rounded-none h-72 z-20 flex flex-col justify-between items-center py-10 text-[8px] text-white">
                  <span className="rotate-90">60x60мм</span>
                </div>

                {/* Ground Level Line */}
                <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/40 z-10 flex justify-between px-2">
                  <span className="-mt-3.5 font-bold text-primary">Уровень почвы</span>
                  <span className="-mt-3.5 font-bold text-gray-400">0.00м</span>
                </div>

                {/* Frost Line Indicator */}
                <div className="absolute top-48 left-0 right-0 h-0.5 bg-blue-500/40 border-dashed z-10 flex justify-between px-2">
                  <span className="-mt-3.5 text-blue-600 font-bold">Линия промерзания (1.0м)</span>
                </div>

                {/* Concrete Pile */}
                <div className="absolute left-1/2 -translate-x-1/2 top-24 w-12 bg-gray-300 border border-gray-400 h-52 z-0 flex items-end justify-center pb-4">
                  <span className="text-[7px] font-black text-gray-600 tracking-tight text-center leading-none">БЕТОН<br />М-300</span>
                </div>

                {/* Gravel Drainage base */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 bg-amber-900/10 border border-amber-900/20 h-10 z-0 flex items-center justify-center">
                  <span className="text-[8px] text-amber-800 font-bold">ГРАВИЙНЫЙ ДРЕНАЖ</span>
                </div>

                {/* Measurements annotations */}
                <div className="absolute right-4 top-24 bottom-10 w-0.5 bg-gray-300 z-10 flex flex-col justify-between">
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 bg-white px-1 py-0.5 rounded border border-gray-200 font-bold text-gray-700 text-[8px]">
                    1.2м глубина
                  </div>
                </div>

                <div className="absolute left-4 top-24 bottom-10 text-[8px] leading-tight space-y-2 max-w-[80px]">
                  <p className="text-gray-400">✓ Заглубление ниже промерзания исключает выдавливание весной</p>
                  <p className="text-gray-400">✓ Гравийная подушка отводит излишки грунтовых вод</p>
                </div>

              </div>

              {/* Explanatory summary under schematic */}
              <div className="mt-6 text-center font-sans">
                <span className="text-xs font-bold text-gray-950 font-serif">Стабильность по ГОСТу</span>
                <p className="text-[10px] text-gray-400 mt-1">
                  На все сварные соединения опор мы даем пожизненную письменную гарантию.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
