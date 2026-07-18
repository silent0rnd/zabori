import React from 'react';
import { WORK_STEPS } from '../data';
import { PhoneCall, FileSpreadsheet, FileSignature, HardHat, Hammer, CheckSquare } from 'lucide-react';

export const Workflow: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white" id="workflow-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Этапы сотрудничества</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-950 tracking-tight">
            Порядок работы: <span className="text-primary italic font-semibold">всего 8 шагов</span> до нового забора
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-light">
            С момента звонка до сдачи готового объекта на вашем участке — прозрачные условия и контроль на каждом этапе.
          </p>
        </div>

        {/* Timeline Sequence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {WORK_STEPS.map((step, idx) => (
            <div 
              key={step.num}
              className="bg-white hover:bg-stone-beige/20 rounded-none border border-stone-border hover:border-primary/40 p-6 shadow-none transition-all relative group"
            >
              
              {/* Step number */}
              <div className="absolute top-4 right-4 text-4xl font-black text-primary/10 group-hover:text-primary/20 transition-colors font-sans select-none">
                {step.num}
              </div>

              {/* Icon marker */}
              <div className="w-10 h-10 rounded-none bg-stone-beige text-primary font-bold text-xs flex items-center justify-center mb-6 border border-stone-border">
                {step.num}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                {step.desc}
              </p>

            </div>
          ))}

        </div>

        {/* Technical Safety Tagline */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-beige/30 text-primary border border-stone-border rounded-none text-xs font-semibold font-sans">
            <span className="w-2 h-2 rounded-none bg-primary"></span>
            <span>Фиксированная цена: стоимость забора не увеличится после проведения замера</span>
          </div>
        </div>

      </div>
    </section>
  );
};
