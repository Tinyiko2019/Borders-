/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../translations';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const t = {
    en: {
      title: "What Our Members Say",
      subtitle: "Heartfelt feedback and reviews from families who found comfort, safety, and respect in our care.",
      tag: "Testimonials",
      verified: "Verified Policyholder"
    },
    pt: {
      title: "O Que Dizem os Nossos Membros",
      subtitle: "Depoimentos sinceros de famílias que encontraram conforto, segurança e respeito sob a nossa proteção.",
      tag: "Depoimentos",
      verified: "Membro Segurado Verificado"
    }
  }[lang];

  const list = [
    {
      name: "Alberto Tembe",
      location: lang === 'en' ? "Johannesburg GP to Maxixe, Inhambane" : "Joanesburgo GP para Maxixe, Inhambane",
      quote: lang === 'en' 
        ? "When my father passed away, Care Beyond Borders handled absolutely everything. The Mercedes hearse was immaculate, the border paperwork was sorted immediately, and we received the 40,000 MT Cash Benefit within hours of claiming. Truly a lifesaver."
        : "Quando o meu pai faleceu, a Care Beyond Borders tratou de absolutamente tudo. O carro funerário era impecável, a papelada da fronteira foi resolvida de imediato e recebemos o benefício em dinheiro de 40.000 MT em poucas horas. Foi uma verdadeira bênção.",
      rating: 5,
      date: lang === 'en' ? "May 2026" : "Maio 2026",
      plan: lang === 'en' ? "Family Plan Cover" : "Plano Familiar"
    },
    {
      name: "Maria Mondlane",
      location: lang === 'en' ? "Nelspruit MP to Vilankulo, Inhambane" : "Nelspruit MP para Vilankulo, Inhambane",
      quote: lang === 'en'
        ? "My sister became extremely ill in Nelspruit and needed comfort transport back to Mozambique. The Care Beyond Borders sick transit minibus was spacious, clean, and the bilingual coordinator spoke both English and Portuguese, keeping us reassured throughout the border."
        : "A minha irmã ficou gravemente doente em Nelspruit e precisava de transporte de conforto para regressar a Moçambique. O miniautocarro de doentes da Care Beyond Borders era espaçoso, limpo e o coordenador falava inglês e português, tranquilizando-nos na fronteira.",
      rating: 5,
      date: lang === 'en' ? "April 2026" : "Abril 2026",
      plan: lang === 'en' ? "Individual Plan Cover" : "Plano Individual"
    },
    {
      name: "Joao Matsinhe",
      location: lang === 'en' ? "Pretoria GP to Massinga, Inhambane" : "Pretória GP para Massinga, Inhambane",
      quote: lang === 'en'
        ? "Applying 100% online was so simple. No need to visit physical offices or take leave from work. Uploading my passport copy and signing digitally took under 5 minutes. I have absolute peace of mind knowing my family is fully covered."
        : "Fazer a candidatura 100% online foi extremamente simples. Sem necessidade de ir a escritórios físicos ou tirar folga do trabalho. Enviar a cópia do passaporte e assinar digitalmente levou menos de 5 minutos. Tenho total paz de espírito.",
      rating: 5,
      date: lang === 'en' ? "March 2026" : "Março 2026",
      plan: lang === 'en' ? "Senior Cover Plan" : "Plano Sénior"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative quotes background */}
      <div className="absolute top-10 right-10 text-slate-200/50 pointer-events-none">
        <Quote className="w-56 h-56 transform rotate-180 opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 flex items-center justify-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white border border-slate-200 rounded-3xl p-6 md:p-12 shadow-xl">
          
          <div className="absolute top-6 left-6 md:top-12 md:left-12 text-gold-500/20">
            <Quote className="w-16 h-16" />
          </div>

          <div className="min-h-[220px] flex flex-col justify-between">
            
            {/* Rating Stars */}
            <div className="flex space-x-1 mb-6">
              {[...Array(list[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-base md:text-lg text-navy-900 italic font-light leading-relaxed mb-6 relative z-10">
              "{list[activeIndex].quote}"
            </blockquote>

            {/* Author Info */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-navy-900 flex items-center gap-2">
                  <span>{list[activeIndex].name}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{t.verified}</span>
                  </span>
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {list[activeIndex].location}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 self-start sm:self-auto">
                <span>{list[activeIndex].plan}</span>
                <span className="text-slate-300">•</span>
                <span>{list[activeIndex].date}</span>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-6 right-8 flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white p-3 rounded-full shadow-lg border border-navy-800 transition-all cursor-pointer"
              title="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white p-3 rounded-full shadow-lg border border-navy-800 transition-all cursor-pointer"
              title="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bullet Indicator dots */}
        <div className="flex justify-center space-x-2.5 mt-10">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-gold-500' : 'bg-slate-300 hover:bg-slate-400'}`}
              title={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
