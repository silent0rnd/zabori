import React, { useState } from 'react';
import { CATALOG_ITEMS, GATE_ITEMS } from '../data';
import { CatalogItem } from '../types';
import { ShieldCheck, Info, Check, Sparkles } from 'lucide-react';

interface CatalogProps {
  onOrderProduct: (productName: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onOrderProduct }) => {
  const [activeTab, setActiveTab] = useState<'fence' | 'gate'>('fence');
  const [selectedItem, setSelectedItem] = useState<CatalogItem | typeof GATE_ITEMS[0] | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-warm-bg" id="catalog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Наш ассортимент</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-950 tracking-tight">
            Каталог с <span className="text-primary italic font-semibold">реальными</span> ценами
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-light">
            Мы производители, поэтому вы платите честную цену без наценки торговых сетей и дилеров.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-stone-beige p-1 rounded-none inline-flex border border-stone-border">
            <button
              onClick={() => setActiveTab('fence')}
              className={`px-6 py-3 rounded-none font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'fence'
                  ? 'bg-primary text-white shadow-none'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Заборы (Цена под ключ за метр)
            </button>
            <button
              onClick={() => setActiveTab('gate')}
              className={`px-6 py-3 rounded-none font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'gate'
                  ? 'bg-primary text-white shadow-none'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ворота и калитки (За конструкцию)
            </button>
          </div>
        </div>

        {/* Grid Area */}
        {activeTab === 'fence' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATALOG_ITEMS.map((item) => (
              <div 
                key={item.id}
                id={`catalog-item-${item.id}`}
                className="bg-white border border-stone-border rounded-none shadow-none hover:border-primary/50 transition-all overflow-hidden flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white font-medium text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-none shadow-none flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>Скидка действует</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-serif font-bold text-gray-900 text-lg leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed flex-grow font-light">
                    {item.description}
                  </p>

                  {/* Pricing block */}
                  <div className="mt-5 pt-4 border-t border-stone-border flex items-baseline justify-between">
                    <div>
                      <span className="text-gray-400 text-xs line-through block leading-none mb-1">
                        от {item.oldPrice} {item.unit}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        от {item.price} <span className="text-sm font-semibold text-gray-700">{item.unit}</span>
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="border border-stone-border hover:bg-stone-beige/30 text-gray-700 text-xs font-semibold py-3 px-2 rounded-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Info size={14} className="text-primary" />
                      Подробнее
                    </button>
                    <button
                      onClick={() => onOrderProduct(item.title)}
                      className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs py-3 px-2 rounded-none transition-all cursor-pointer text-center border border-primary"
                    >
                      Заказать расчет
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GATE_ITEMS.map((item) => (
              <div 
                key={item.id}
                id={`catalog-gate-${item.id}`}
                className="bg-white border border-stone-border rounded-none shadow-none hover:border-primary/50 transition-all overflow-hidden flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-40 overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-serif font-bold text-gray-900 text-base leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed flex-grow font-light">
                    {item.description}
                  </p>

                  {/* Pricing block */}
                  <div className="mt-4 pt-3 border-t border-stone-border">
                    <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider block">Стоимость сборки</span>
                    <span className="text-lg font-bold text-primary">
                      от {item.price.toLocaleString()} <span className="text-xs font-semibold text-gray-700">{item.unit}</span>
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <button
                      onClick={() => setSelectedItem(item as any)}
                      className="border border-stone-border hover:bg-stone-beige/30 text-gray-700 text-xs font-semibold py-2.5 rounded-none transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Info size={12} className="text-primary" />
                      Тех. параметры
                    </button>
                    <button
                      onClick={() => onOrderProduct(item.title)}
                      className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs py-2.5 rounded-none transition-all cursor-pointer text-center border border-primary"
                    >
                      Рассчитать проект
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal Overlay */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4" id="item-details-modal">
            <div className="bg-white rounded-none border border-stone-border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 hover:bg-stone-beige transition-all cursor-pointer text-xl"
              >
                &times; Close
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mt-4">
                <div className="sm:col-span-5">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-48 sm:h-64 object-cover rounded-none border border-stone-border p-1 bg-stone-beige"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-4 bg-stone-beige/40 p-4 rounded-none border border-stone-border flex items-start gap-2.5">
                    <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase">Стандарты качества</h4>
                      <p className="text-[10px] text-gray-500 mt-1 leading-snug font-light">
                        Материалы соответствуют ГОСТу, толщина заверена микрометром при разгрузке.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">
                      {selectedItem.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed font-light">
                      {selectedItem.description}
                    </p>

                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-6 mb-3 font-serif">
                      Комплектация и характеристики:
                    </h4>
                    <ul className="space-y-2">
                      {selectedItem.features ? selectedItem.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                          <span className="font-light">{feature}</span>
                        </li>
                      )) : (
                        <>
                          <li className="flex items-start gap-2 text-xs text-gray-600">
                            <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-light">Толщина металла каркаса не менее 2 мм по ТУ</span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-gray-600">
                            <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-light">Полный цикл антикоррозийной покраски на производстве</span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-gray-600">
                            <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-light">Установка на качественные сваи или бетонный фундамент</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-border flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Стоимость:</span>
                      <span className="text-xl font-bold text-primary">
                        {selectedItem.price ? `от ${selectedItem.price.toLocaleString()}` : 'от 970'}{' '}
                        <span className="text-xs font-semibold text-gray-700">{selectedItem.unit}</span>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onOrderProduct(selectedItem.title);
                        setSelectedItem(null);
                      }}
                      className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-none transition-all cursor-pointer border border-primary"
                    >
                      Заказать проект
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
