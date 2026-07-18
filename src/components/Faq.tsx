import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq1'); // Default open first

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-beige/10 border-b border-stone-border" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Остались сомнения?</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-950 tracking-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-light">
            Отвечаем на популярные вопросы о демонтаже заборов, подготовке земли, гарантиях и порядке оплаты сметы.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white rounded-none border border-stone-border overflow-hidden transition-all shadow-none"
              >
                
                {/* Accordion Toggle */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-1.5 bg-stone-beige text-primary rounded-none flex-shrink-0 border border-stone-border">
                      <HelpCircle size={16} />
                    </div>
                    <span className="font-serif font-bold text-gray-950 text-sm sm:text-base leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {isOpen ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-stone-border' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 text-xs sm:text-sm text-gray-600 leading-relaxed bg-stone-beige/15 font-light">
                    {faq.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
