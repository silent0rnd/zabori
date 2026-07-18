import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FounderBlock } from './components/FounderBlock';
import { QuizCalculator } from './components/QuizCalculator';
import { Catalog } from './components/Catalog';
import { GiftsBlock } from './components/GiftsBlock';
import { TechnicalPillars } from './components/TechnicalPillars';
import { Workflow } from './components/Workflow';
import { Faq } from './components/Faq';
import { Lead } from './types';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Check, 
  X, 
  Award, 
  MessageSquare, 
  FileText, 
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Modal states
  const [isMeasurerOpen, setIsMeasurerOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isBookletSuccess, setIsBookletSuccess] = useState(false);

  // Form input states
  const [measurerName, setMeasurerName] = useState('');
  const [measurerPhone, setMeasurerPhone] = useState('');
  const [measurerSuccess, setMeasurerSuccess] = useState(false);

  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultSuccess, setConsultSuccess] = useState(false);

  const [bookletPhone, setBookletPhone] = useState('');

  // Scroll references
  const quizRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleScrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleOrderProduct = (productName: string) => {
    setConsultName('');
    setConsultPhone('');
    setConsultSuccess(false);
    setIsConsultOpen(true);
    // Auto-fill consult details or notes
  };

  // Submit site measurer lead
  const handleMeasurerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!measurerPhone.trim()) return;

    const lead: Lead = {
      id: 'measurer-' + Date.now(),
      type: 'site_measurer',
      name: measurerName || 'Анонимный заказчик',
      phone: measurerPhone,
      timestamp: new Date().toLocaleString('ru-RU'),
      details: 'Заявка на бесплатный выезд замерщика',
      status: 'new'
    };

    const saved = JSON.parse(localStorage.getItem('ecc_leads') || '[]');
    saved.push(lead);
    localStorage.setItem('ecc_leads', JSON.stringify(saved));

    setMeasurerSuccess(true);
    setTimeout(() => {
      setIsMeasurerOpen(false);
      setMeasurerSuccess(false);
      setMeasurerName('');
      setMeasurerPhone('');
    }, 3000);
  };

  // Submit personal consultation lead
  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultPhone.trim()) return;

    const lead: Lead = {
      id: 'consult-' + Date.now(),
      type: 'consultation',
      name: consultName || 'Анонимный заказчик',
      phone: consultPhone,
      timestamp: new Date().toLocaleString('ru-RU'),
      details: 'Заявка на личную консультацию с Александром / расчет проекта',
      status: 'new'
    };

    const saved = JSON.parse(localStorage.getItem('ecc_leads') || '[]');
    saved.push(lead);
    localStorage.setItem('ecc_leads', JSON.stringify(saved));

    setConsultSuccess(true);
    setTimeout(() => {
      setIsConsultOpen(false);
      setConsultSuccess(false);
      setConsultName('');
      setConsultPhone('');
    }, 3000);
  };

  // Submit booklet lead
  const handleBookletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookletPhone.trim()) return;

    const lead: Lead = {
      id: 'booklet-' + Date.now(),
      type: 'consultation',
      name: 'Получатель брошюры',
      phone: bookletPhone,
      timestamp: new Date().toLocaleString('ru-RU'),
      details: 'Скачал буклет "Топ 10 ошибок при установке забора"',
      status: 'new'
    };

    const saved = JSON.parse(localStorage.getItem('ecc_leads') || '[]');
    saved.push(lead);
    localStorage.setItem('ecc_leads', JSON.stringify(saved));

    setIsBookletSuccess(true);
    setBookletPhone('');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-800 bg-[#fcfcfd]" id="app-root">
      
      {/* Floating Header */}
      <Header 
        onOpenMeasurerModal={() => {
          setMeasurerSuccess(false);
          setIsMeasurerOpen(true);
        }}
        onOpenCalculator={handleScrollToQuiz}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero 
          onStartQuiz={handleScrollToQuiz}
          onOpenMeasurerModal={() => {
            setMeasurerSuccess(false);
            setIsMeasurerOpen(true);
          }}
        />

        {/* Brand / Founder Statement */}
        <FounderBlock 
          onOpenConsultModal={() => {
            setConsultSuccess(false);
            setIsConsultOpen(true);
          }}
        />

        {/* Interactive Quiz Calculator Section */}
        <section className="py-16 sm:py-20 bg-white border-b border-stone-border" id="quiz-calculator-section" ref={quizRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Онлайн калькулятор</span>
              <h2 className="text-3xl font-serif font-normal text-gray-950 tracking-tight">
                Рассчитайте стоимость забора
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-light">
                Ответьте на 7 простых вопросов и получите детальный расчёт сметы и 3 ценных подарка прямо сейчас!
              </p>
            </div>

            {/* Render Quiz */}
            <QuizCalculator 
              onQuizComplete={(lead) => {
                console.log('Quiz finished, registered lead:', lead);
              }}
            />
          </div>
        </section>

        {/* Product Catalog Grid */}
        <div ref={catalogRef}>
          <Catalog onOrderProduct={handleOrderProduct} />
        </div>

        {/* 3 Gifts Section */}
        <GiftsBlock onClaimGifts={handleScrollToQuiz} />

        {/* Engineering standards Block */}
        <TechnicalPillars />

        {/* Timeline Sequence Block */}
        <Workflow />

        {/* Frequently Asked Questions */}
        <Faq />

        {/* Booklet / PDF lead-magnet section */}
        <section className="py-16 sm:py-20 bg-primary text-white" id="booklet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 border border-white/20 rounded-none p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
              
              <div className="max-w-lg">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-beige block mb-3">Полезные материалы</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight text-white mb-4 leading-tight">
                  Получите буклет <br />
                  «Топ-10 ошибок при установке забора»
                </h2>
                <p className="text-xs sm:text-sm text-stone-beige/90 leading-relaxed font-light">
                  Прочитайте это руководство перед тем, как нанимать строителей. Вы узнаете, как защитить опоры от морозов, какую марку полимера выбрать и как сэкономить до 15% на монтаже без ущерба прочности.
                </p>
              </div>

              {/* Booklet Form */}
              <div className="bg-white text-gray-950 rounded-none border border-stone-border p-6 sm:p-8 w-full max-w-sm shadow-none">
                {!isBookletSuccess ? (
                  <form onSubmit={handleBookletSubmit} className="space-y-4">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-gray-950">Скачать книгу бесплатно</h4>
                    <p className="text-[11px] text-gray-500 leading-tight">Введите ваш номер телефона для отправки файла:</p>
                    
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (999) 999-99-99"
                        value={bookletPhone}
                        onChange={(e) => setBookletPhone(e.target.value)}
                        className="w-full bg-white border border-stone-border rounded-none px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors font-bold text-gray-950"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-white font-semibold uppercase text-xs py-3.5 rounded-none border border-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Получить руководство</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 rounded-none border border-stone-border bg-stone-beige text-primary flex items-center justify-center mx-auto mb-3">
                      <Check size={24} strokeWidth={3} />
                    </div>
                    <h4 className="font-serif font-bold text-gray-950 text-sm">Файл успешно забронирован!</h4>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                      Ссылка на скачивание буклета отправлена на ваш телефон. Приятного чтения!
                    </p>
                    <button
                      onClick={() => setIsBookletSuccess(false)}
                      className="text-xs font-bold text-primary hover:underline mt-4 cursor-pointer"
                    >
                      Скачать ещё раз
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Contacts details & Location */}
        <section className="py-16 bg-white border-t border-stone-border" id="contacts-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Contact Information Details */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">Контакты ЕСС</span>
                  <h2 className="text-3xl font-serif font-normal text-gray-950 tracking-tight mb-8">
                    Мы всегда на связи
                  </h2>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="p-3 bg-stone-beige text-primary rounded-none border border-stone-border flex-shrink-0 self-start">
                        <Phone size={18} />
                      </div>
                      <div className="font-sans">
                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Номер телефона:</h4>
                        <a href="tel:+79377372153" className="text-base sm:text-lg font-bold text-gray-950 hover:text-primary transition-colors">
                          +7 (937) 737-21-53
                        </a>
                        <span className="text-[10px] text-gray-400 block mt-0.5 font-light">Ежедневно с 8:00 до 21:00</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-3 bg-stone-beige text-primary rounded-none border border-stone-border flex-shrink-0 self-start">
                        <MapPin size={18} />
                      </div>
                      <div className="font-sans">
                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Адрес офиса:</h4>
                        <p className="text-sm font-bold text-gray-950 mt-1">
                          г. Екатеринбург, ул. Малышева, 51
                        </p>
                        <span className="text-[10px] text-gray-400 block mt-0.5 font-light">Бизнес-центр «Высоцкий» (Посещение по согласованию встречи)</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-3 bg-stone-beige text-primary rounded-none border border-stone-border flex-shrink-0 self-start">
                        <Mail size={18} />
                      </div>
                      <div className="font-sans">
                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Электронная почта:</h4>
                        <p className="text-sm font-bold text-gray-950 mt-1">
                          info@ess-zabor-ekb.ru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-border flex items-center gap-3 font-sans">
                  <div className="p-2 bg-stone-beige text-primary border border-stone-border rounded-none flex-shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight font-light">
                    ООО «ЕСС Екатеринбург» гарантирует соблюдение СНиП и несёт полную финансовую ответственность по договору.
                  </p>
                </div>
              </div>

              {/* Map block - high-end custom placeholder/drawing for Vysotsky map layout */}
              <div className="lg:col-span-8 bg-stone-beige/10 rounded-none border border-stone-border overflow-hidden min-h-[320px] flex flex-col justify-between p-6 sm:p-8 relative">
                
                <div className="relative z-10 font-sans">
                  <h3 className="font-serif font-bold text-gray-950 text-sm sm:text-base mb-1">Схема проезда и визита</h3>
                  <p className="text-xs text-gray-500 font-light">Поскольку мы часто находимся на строительных площадках области, просим согласовать время встречи перед визитом в офис по телефону.</p>
                </div>

                <div className="relative z-10 bg-white p-5 rounded-none border border-stone-border shadow-none mt-4 flex-grow flex flex-col justify-center items-center text-center font-sans">
                  <MapPin size={32} className="text-primary mb-3" />
                  <h4 className="font-serif font-bold text-gray-950 text-sm">ул. Малышева, 51 • БЦ Высоцкий</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm leading-relaxed font-light">
                    Удобная охраняемая парковка, 5 минут пешком от площади 1905 года. Бесплатно забронируем пропуск на ресепшене для вас!
                  </p>
                  <a
                    href="tel:+79377372153"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Заказать пропуск в офис
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer copyright with Lead testing CTA */}
      <footer className="bg-[#1C251F] text-[#E5E1D8] border-t border-stone-border py-10" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
            
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white font-serif font-semibold text-xs px-2.5 py-1 rounded-none border border-white/10">
                ЕСС
              </div>
              <p className="text-xs text-gray-400 font-light">
                © 2026 ЕСС . Все права защищены • Екатеринбург Заборы под ключ
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-medium font-sans">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            </div>

          </div>
        </div>
      </footer>

      {/* MODAL 1: SITE MEASURER BOOKING */}
      {isMeasurerOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4" id="measurer-modal">
          <div className="bg-white rounded-none border border-stone-border shadow-none max-w-sm w-full p-6 relative">
            
            <button
              onClick={() => setIsMeasurerOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-none border border-stone-border transition-all cursor-pointer bg-white"
            >
              <X size={16} />
            </button>

            {!measurerSuccess ? (
              <form onSubmit={handleMeasurerSubmit} className="space-y-4">
                <div className="text-center font-sans">
                  <div className="w-12 h-12 rounded-none border border-stone-border bg-stone-beige text-primary flex items-center justify-center mx-auto mb-3">
                    <Award size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-gray-950 text-base leading-snug">Заявка на бесплатный замер</h3>
                  <p className="text-[10px] text-gray-400 mt-1 max-w-[220px] mx-auto leading-tight font-light">
                    Инженер приедет со всеми каталогами и образцами материалов уже сегодня!
                  </p>
                </div>

                <div className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Имя загородного хозяина:</label>
                    <input
                      type="text"
                      placeholder="Сергей Петрович"
                      value={measurerName}
                      onChange={(e) => setMeasurerName(e.target.value)}
                      className="w-full bg-white border border-stone-border rounded-none px-4 py-2.5 text-xs focus:border-primary focus:outline-none transition-colors font-semibold text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Контактный телефон <span className="text-red-500">*</span>:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 999-99-99"
                      value={measurerPhone}
                      onChange={(e) => setMeasurerPhone(e.target.value)}
                      className="w-full bg-white border border-stone-border rounded-none px-4 py-2.5 text-xs focus:border-primary focus:outline-none transition-colors font-bold text-gray-950"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold uppercase text-xs py-3 rounded-none border border-primary transition-all cursor-pointer text-center"
                >
                  Вызвать БЕСПЛАТНО
                </button>
              </form>
            ) : (
              <div className="text-center py-6 font-sans">
                <div className="w-12 h-12 rounded-none border border-stone-border bg-stone-beige text-primary flex items-center justify-center mx-auto mb-3">
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-serif font-bold text-gray-950 text-sm">Заявка принята!</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                  Мы свяжемся с вами в течение 10–15 минут для подтверждения времени выезда замерщика.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL 2: FOUNDER / PERSONAL DISCUSS */}
      {isConsultOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4" id="consultation-modal">
          <div className="bg-white rounded-none border border-stone-border shadow-none max-w-sm w-full p-6 relative">
            
            <button
              onClick={() => setIsConsultOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-none border border-stone-border transition-all cursor-pointer bg-white"
            >
              <X size={16} />
            </button>

            {!consultSuccess ? (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="text-center font-sans">
                  <div className="w-12 h-12 rounded-none border border-stone-border bg-stone-beige text-primary flex items-center justify-center mx-auto mb-3">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-gray-950 text-base leading-snug">Обсудить проект забора</h3>
                  <p className="text-[10px] text-gray-400 mt-1 leading-tight font-light">
                    Александр или главный технолог проконсультируют по выбору материала и толщине опор.
                  </p>
                </div>

                <div className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Как к вам обращаться:</label>
                    <input
                      type="text"
                      placeholder="Алексей"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full bg-white border border-stone-border rounded-none px-4 py-2.5 text-xs focus:border-primary focus:outline-none transition-colors font-semibold text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Телефон, WhatsApp <span className="text-red-500">*</span>:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 999-99-99"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full bg-white border border-stone-border rounded-none px-4 py-2.5 text-xs focus:border-primary focus:outline-none transition-colors font-bold text-gray-950"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold uppercase text-xs py-3 rounded-none border border-primary transition-all cursor-pointer text-center"
                >
                  Заказать звонок специалиста
                </button>
              </form>
            ) : (
              <div className="text-center py-6 font-sans">
                <div className="w-12 h-12 rounded-none border border-stone-border bg-stone-beige text-primary flex items-center justify-center mx-auto mb-3">
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-serif font-bold text-gray-950 text-sm">Заявка зарегистрирована!</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                  Наш эксперт перезвонит вам прямо сейчас и пришлёт первичный расчёт стоимости.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
