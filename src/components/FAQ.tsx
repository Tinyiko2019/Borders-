/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, translations } from '../translations';

interface FAQProps {
  lang: Language;
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: t.faqQ1,
      a: t.faqA1
    },
    {
      q: t.faqQ2,
      a: t.faqA2
    },
    {
      q: t.faqQ3,
      a: t.faqA3
    },
    {
      q: t.faqQ4,
      a: t.faqA4
    },
    {
      q: t.faqQ5,
      a: t.faqA5
    }
  ];

  const handleToggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[20%] h-[20%] rounded-full bg-navy-100/40 blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            {t.navFAQ}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.faqTitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500">
            {t.faqSubtitle}
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:border-gold-500/20"
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-navy-500/10 cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                    <span className="font-bold text-navy-900 text-sm md:text-base pr-4 leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 p-1.5 rounded-lg bg-slate-100 text-navy-500 transition-transform duration-250 ${
                    isOpen ? 'rotate-180 bg-gold-100 text-gold-700' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 text-xs md:text-sm font-light leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
