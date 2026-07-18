import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Gift, ShieldCheck, Sparkles } from 'lucide-react';
import { QuizState, Lead } from '../types';

interface QuizProps {
  onQuizComplete: (lead: Lead) => void;
  onClose?: () => void;
}

const INITIAL_QUIZ_STATE: QuizState = {
  material: 'Профнастил',
  height: '2 м',
  length: 40,
  gatesNeeded: 'Ворота и калитка',
  gateType: 'Откатные',
  timing: 'В течение 14 дней',
  deliveryMethod: 'Озвучить по телефону',
  name: '',
  phone: ''
};

export const QuizCalculator: React.FC<QuizProps> = ({ onQuizComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const [formError, setFormError] = useState('');

  const handleSelectOption = (field: keyof QuizState, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 3 && (isNaN(state.length) || state.length <= 0)) {
      setFormError('Пожалуйста, укажите корректную длину забора (больше 0)');
      return;
    }
    setFormError('');
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setFormError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.phone.trim() || state.phone.length < 7) {
      setFormError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    const lead: Lead = {
      id: 'quiz-' + Date.now(),
      type: 'quiz_calculator',
      name: state.name || 'Анонимный заказчик',
      phone: state.phone,
      timestamp: new Date().toLocaleString('ru-RU'),
      details: `Материал: ${state.material}, Высота: ${state.height}, Длина: ${state.length}м, Группа: ${state.gatesNeeded}, Тип ворот: ${state.gateType}, Сроки: ${state.timing}, Ответ: ${state.deliveryMethod}`,
      status: 'new'
    };

    // Save lead to local storage
    const savedLeads = JSON.parse(localStorage.getItem('ecc_leads') || '[]');
    savedLeads.push(lead);
    localStorage.setItem('ecc_leads', JSON.stringify(savedLeads));

    onQuizComplete(lead);
    setStep(9); // Completed screen
  };

  const totalSteps = 8;
  const progressPercent = Math.round(((step - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="bg-white rounded-none border border-stone-border p-6 sm:p-10 max-w-3xl mx-auto overflow-hidden relative" id="quiz-calculator-container">
      
      {/* Header showing progress */}
      {step <= 8 && (
        <div className="mb-8 font-sans">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-[11px] font-semibold uppercase text-primary tracking-wider">
              Шаг {step} из {totalSteps}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Готово на {progressPercent}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-stone-beige rounded-none overflow-hidden">
            <div 
              className="h-full bg-primary rounded-none transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Step Contents */}
      <div>
        
        {/* Step 1: Material */}
        {step === 1 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Какое полотно или материал для забора вы рассматриваете?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Профнастил (профлист)', 'Евроштакетник / Штакетник', 'Кованые секции', 'Смешанный / Комбинированный', '3Д сетка / Сетка Рабица', 'Другой материал'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption('material', opt)}
                  className={`p-4 rounded-none font-semibold text-left text-sm transition-all border flex items-center justify-between cursor-pointer ${
                    state.material === opt
                      ? 'bg-stone-beige/40 border-primary text-primary shadow-none'
                      : 'border-stone-border hover:border-stone-border hover:bg-stone-beige/20 text-gray-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-none flex items-center justify-center border ${
                    state.material === opt ? 'bg-primary border-primary text-white' : 'border-stone-border'
                  }`}>
                    {state.material === opt && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Height */}
        {step === 2 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Укажите желаемую высоту будущего забора
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {['1 м', '1.5 м', '2 м', '2.5 м', '3 м'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption('height', opt)}
                  className={`p-4 rounded-none font-semibold text-center text-sm transition-all border flex flex-col items-center gap-2 cursor-pointer ${
                    state.height === opt
                      ? 'bg-stone-beige/40 border-primary text-primary shadow-none'
                      : 'border-stone-border hover:border-stone-border hover:bg-stone-beige/20 text-gray-700'
                  }`}
                >
                  <span className="text-lg font-serif font-bold">{opt}</span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {opt === '2 м' ? 'Оптимально' : 'Под проект'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Length */}
        {step === 3 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Какая ориентировочная длина забора в метрах?
            </h3>
            
            <div className="flex flex-col items-center justify-center p-6 bg-stone-beige/20 rounded-none border border-stone-border mb-4">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Длина забора:</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSelectOption('length', Math.max(1, state.length - 10))}
                  className="w-12 h-12 rounded-none bg-white border border-stone-border hover:bg-stone-beige/40 text-primary font-bold flex items-center justify-center cursor-pointer shadow-none text-lg select-none"
                >
                  -
                </button>
                <input
                  type="number"
                  value={state.length}
                  onChange={(e) => handleSelectOption('length', parseInt(e.target.value) || 0)}
                  className="w-24 text-center font-bold text-2xl text-primary border-b border-primary focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleSelectOption('length', state.length + 10)}
                  className="w-12 h-12 rounded-none bg-white border border-stone-border hover:bg-stone-beige/40 text-primary font-bold flex items-center justify-center cursor-pointer shadow-none text-lg select-none"
                >
                  +
                </button>
              </div>
              <span className="text-lg font-bold text-primary mt-3">метров</span>
            </div>

            {state.length >= 100 && (
              <div className="bg-stone-beige/40 text-primary border border-stone-border p-4 rounded-none text-xs font-semibold flex items-center gap-2.5">
                <Sparkles size={16} className="text-primary" />
                <span>Вы получаете право на бесплатную КАЛИТКУ (дополнительный подарок за объём от 100м)!</span>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Gates Needed */}
        {step === 4 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Требуются ли ворота или калитка в комплекте?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Без ворот и калитки', 'Только ворота', 'Только калитка', 'Ворота и калитка'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption('gatesNeeded', opt)}
                  className={`p-4 rounded-none font-semibold text-left text-sm transition-all border flex items-center justify-between cursor-pointer ${
                    state.gatesNeeded === opt
                      ? 'bg-stone-beige/40 border-primary text-primary shadow-none'
                      : 'border-stone-border hover:border-stone-border hover:bg-stone-beige/20 text-gray-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-none flex items-center justify-center border ${
                    state.gatesNeeded === opt ? 'bg-primary border-primary text-white' : 'border-stone-border'
                  }`}>
                    {state.gatesNeeded === opt && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Gate Type */}
        {step === 5 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Какой тип ворот вы бы хотели установить?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Автоматические откатные', 'Откатные без автоматики', 'Распашные распадные', 'Секционные ворота'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption('gateType', opt)}
                  className={`p-4 rounded-none font-semibold text-left text-sm transition-all border flex items-center justify-between cursor-pointer ${
                    state.gateType === opt
                      ? 'bg-stone-beige/40 border-primary text-primary shadow-none'
                      : 'border-stone-border hover:border-stone-border hover:bg-stone-beige/20 text-gray-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-none flex items-center justify-center border ${
                    state.gateType === opt ? 'bg-primary border-primary text-white' : 'border-stone-border'
                  }`}>
                    {state.gateType === opt && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Timing */}
        {step === 6 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Когда вы планируете приступать к установке?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['В течение 3 дней', 'В течение 14 дней', 'В течение месяца', 'В течение 3 месяцев'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption('timing', opt)}
                  className={`p-4 rounded-none font-semibold text-left text-sm transition-all border flex items-center justify-between cursor-pointer ${
                    state.timing === opt
                      ? 'bg-stone-beige/40 border-primary text-primary shadow-none'
                      : 'border-stone-border hover:border-stone-border hover:bg-stone-beige/20 text-gray-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-none flex items-center justify-center border ${
                    state.timing === opt ? 'bg-primary border-primary text-white' : 'border-stone-border'
                  }`}>
                    {state.timing === opt && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Delivery method */}
        {step === 7 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight mb-6">
              Как вам удобнее получить итоговый расчет сметы?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Озвучить по телефону', desc: 'Перезвоним и проконсультируем лично' },
                { name: 'Прислать в WhatsApp', desc: 'Отправим смету удобным текстовым файлом' },
                { name: 'Прислать в Viber', desc: 'Удобное сообщение с чертежами' }
              ].map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => handleSelectOption('deliveryMethod', opt.name)}
                  className={`p-4 rounded-none font-semibold text-center text-sm transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    state.deliveryMethod === opt.name
                      ? 'bg-stone-beige/40 border-primary text-primary shadow-none'
                      : 'border-stone-border hover:border-stone-border hover:bg-stone-beige/20 text-gray-700'
                  }`}
                >
                  <span className="text-sm font-semibold block">{opt.name}</span>
                  <span className="text-[10px] text-gray-400 font-medium leading-tight mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Contact information */}
        {step === 8 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="inline-flex p-3 bg-stone-beige text-primary rounded-none mb-3 border border-stone-border">
                <Gift size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-gray-950 tracking-tight">
                Расчёт готов! Зарезервируйте ваши 3 подарка
              </h3>
              <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">
                Для сохранения подарков (Калитка, Антикоррозийная защита и Бесплатная доставка) за вашим номером, введите свои данные ниже.
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto font-sans">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Ваше имя:
                </label>
                <input
                  type="text"
                  placeholder="Иван Иванович"
                  value={state.name}
                  onChange={(e) => handleSelectOption('name', e.target.value)}
                  className="w-full bg-white border border-stone-border rounded-none px-4 py-3 text-sm focus:bg-white focus:border-primary focus:outline-none transition-colors font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Номер телефона или WhatsApp <span className="text-red-500">*</span>:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 999-99-99"
                  value={state.phone}
                  onChange={(e) => handleSelectOption('phone', e.target.value)}
                  className="w-full bg-white border border-stone-border rounded-none px-4 py-3 text-sm focus:bg-white focus:border-primary focus:outline-none transition-colors font-bold text-primary text-lg"
                />
              </div>

              <div className="bg-stone-beige/30 p-3.5 rounded-none border border-stone-border flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-tight">
                  Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных. Мы никогда не рассылаем спам.
                </p>
              </div>
            </div>
          </form>
        )}

        {/* Step 9: Completed success screen */}
        {step === 9 && (
          <div className="text-center py-10">
            <div className="inline-flex p-4 bg-stone-beige text-primary rounded-none mb-4 border border-stone-border">
              <Check size={36} strokeWidth={3} />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-gray-950 tracking-tight">
              Смета рассчитана и отправлена!
            </h3>
            
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-md mx-auto leading-relaxed font-light">
              Спасибо, <strong>{state.name || 'Иван'}</strong>! Ваши персональные подарки зарезервированы. Мы перезвоним или напишем в мессенджер в течение 10–15 минут.
            </p>

            <div className="bg-stone-beige/20 p-6 rounded-none border border-stone-border max-w-sm mx-auto mt-6 flex flex-col gap-3 font-sans">
              <div className="flex items-center gap-2.5 text-xs text-left text-gray-700">
                <div className="w-5 h-5 rounded-none bg-primary text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</div>
                <span>Подарок 1: <strong>Калитка</strong> забронирована</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-left text-gray-700">
                <div className="w-5 h-5 rounded-none bg-primary text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</div>
                <span>Подарок 2: <strong>Защита от ржавчины</strong> забронирована</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-left text-gray-700">
                <div className="w-5 h-5 rounded-none bg-primary text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</div>
                <span>Подарок 3: <strong>Доставка 0 руб.</strong> забронирована</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setState(INITIAL_QUIZ_STATE);
                }}
                className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-none transition-all cursor-pointer border border-primary"
              >
                Рассчитать ещё раз
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-transparent hover:bg-stone-beige/40 text-gray-700 font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-none border border-stone-border transition-all cursor-pointer"
                >
                  Закрыть расчет
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Errors & Buttons Footer */}
      {step <= 8 && (
        <div className="mt-8 pt-6 border-t border-stone-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans">
          
          {/* Form Error display */}
          {formError ? (
            <span className="text-xs font-bold text-red-500">
              {formError}
            </span>
          ) : (
            <span className="text-xs text-gray-400 font-medium">
              * Заполнение полностью конфиденциально
            </span>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-3 ml-auto">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="border border-stone-border hover:bg-stone-beige/30 text-gray-700 font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-none transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                Назад
              </button>
            )}
            
            {step < 8 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-none transition-all flex items-center gap-1.5 cursor-pointer border border-primary"
              >
                Далее
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary-hover text-white font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-none transition-all flex items-center gap-1.5 cursor-pointer border border-primary"
              >
                Получить расчет и подарки
                <ArrowRight size={14} />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
