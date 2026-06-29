/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface PlansProps {
  lang: Language;
  onSelectPlan: (planId: 'individual' | 'family' | 'senior') => void;
}

export default function Plans({ lang, onSelectPlan }: PlansProps) {
  const t = translations[lang];

  const plans = [
    {
      id: 'individual' as const,
      name: t.planIndividualName,
      price: t.planIndividualPrice,
      coverage: t.planIndividualCoverage,
      description: t.planIndividualDesc,
      popular: false,
      accentColor: 'border-slate-200'
    },
    {
      id: 'family' as const,
      name: t.planFamilyName,
      price: t.planFamilyPrice,
      coverage: t.planFamilyCoverage,
      description: t.planFamilyDesc,
      popular: true, // Mark Family Plan as highly popular
      accentColor: 'border-gold-500 shadow-gold-500/10'
    },
    {
      id: 'senior' as const,
      name: t.planSeniorName,
      price: t.planSeniorPrice,
      coverage: t.planSeniorCoverage,
      description: t.planSeniorDesc,
      popular: false,
      accentColor: 'border-slate-200'
    }
  ];

  const features = [
    t.planFeatureRepat,
    t.planFeatureSupport,
    t.planFeatureBorder,
    t.planFeatureRecovery,
    t.planFeatureNoPaperwork
  ];

  return (
    <section id="plans" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            {t.navPlans}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.plansTitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            {t.plansSubtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded border p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                plan.popular 
                  ? 'border-2 border-gold-500 shadow-md lg:-translate-y-3' 
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* Popularity Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-gold-500 text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded shadow-sm flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Highly Popular</span>
                </div>
              )}

              {/* Plan Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-navy-500">
                    {plan.name}
                  </h3>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                    <Shield className={`w-5 h-5 ${plan.popular ? 'text-gold-500' : 'text-navy-500'}`} />
                  </div>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold text-navy-500 font-display">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500">
                    / {t.planPerMonth}
                  </span>
                </div>

                <div className="inline-block bg-slate-50 text-navy-500 text-xs font-bold px-3 py-1.5 rounded border border-slate-200">
                  ⚡ Cover: {plan.coverage}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2">
                  {plan.description}
                </p>
              </div>

              {/* Features Bullet List */}
              <div className="my-8 border-t border-slate-100 pt-6 space-y-3.5">
                {features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start space-x-3 text-sm">
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? 'bg-gold-50 text-gold-600 border border-gold-200' : 'bg-slate-50 text-navy-500 border border-slate-200'
                    }`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-600 text-xs font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gold-500 hover:bg-gold-600 text-navy-500 hover:shadow-md'
                    : 'bg-navy-500 hover:bg-navy-600 text-white hover:shadow-md'
                }`}
              >
                <span>{t.btnApplyNow}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
