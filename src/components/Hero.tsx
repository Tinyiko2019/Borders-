/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, PlaneTakeoff, CheckCircle2, FileHeart } from 'lucide-react';
import { Language, translations } from '../translations';
import { getImageUrl } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ lang, onNavigate }: HeroProps) {
  const t = translations[lang];

  return (
    <section 
      id="home" 
      className="relative bg-navy-900 pt-32 pb-16 md:py-40 overflow-hidden min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat hero-bg"
      style={{
        '--hero-bg-mobile': `linear-gradient(rgba(10, 29, 55, 0.90), rgba(10, 29, 55, 0.94)), url("${getImageUrl('/background_hero_mobile.jpg')}")`,
        '--hero-bg-desktop': `linear-gradient(rgba(10, 29, 55, 0.90), rgba(10, 29, 55, 0.94)), url("${getImageUrl('/background_hero.jpg')}")`,
      } as React.CSSProperties}
    >
      {/* Decorative Golden Ambient Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider self-start"
            >
              <Shield className="w-3.5 h-3.5 mr-1" />
              <span>{t.trustBadge}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-none"
            >
              {t.heroTitle}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Micro route display */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-navy-950/60 backdrop-blur border border-navy-800 p-4 rounded-xl flex items-center space-x-4 max-w-lg shadow-inner"
            >
              <div className="flex -space-x-1">
                <span className="text-2xl" title="South Africa">🇿🇦</span>
                <span className="text-2xl" title="Mozambique">🇲🇿</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gold-500 uppercase tracking-wider leading-none">
                  Core Service Corridor
                </span>
                <span className="text-sm font-semibold text-white mt-1">
                  South Africa (GP, MP) ➡️ Inhambane, Mozambique
                </span>
              </div>
            </motion.div>

            {/* Interactive Benefits List */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-200"
            >
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>40,000 MT Cash Recovery Assistance</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>24/7 Bilingual Support & Repatriation</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>Full Customs & Border clearance handled</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>Professional Hearse & Minibus Fleets</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
            >
              <button
                onClick={() => onNavigate('apply')}
                className="bg-gold-500 hover:bg-gold-600 text-navy-500 font-bold px-8 py-4 rounded shadow-lg hover:shadow-gold-500/10 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer text-sm uppercase tracking-widest"
              >
                <FileHeart className="w-5 h-5 text-navy-500" />
                <span>{t.btnApplyNow}</span>
              </button>
              
              <button
                onClick={() => onNavigate('about')}
                className="border-2 border-slate-300 hover:border-white text-white hover:bg-white/5 font-bold px-8 py-4 rounded transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm uppercase tracking-widest"
              >
                <span>{t.btnLearnMore}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          </div>

          {/* Hero Right Media Column */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-2xl"
            >
              {/* Main Visual Image - Happy African Family */}
              <div className="aspect-[4/3] w-full bg-navy-950 relative">
                <img 
                  src={getImageUrl('/happy_family.jpg')} 
                  alt="Happy family protected by Care Beyond Borders" 
                  className="object-cover w-full h-full mix-blend-normal hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Route Info Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-navy-900/90 backdrop-blur border border-navy-700/60 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center border border-gold-500/30">
                    <PlaneTakeoff className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Repatriation & Logistics</h4>
                    <p className="text-xs text-slate-300">South Africa to Inhambane</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gold-400 block">24 Hour Service</span>
                  <span className="text-[10px] text-slate-400">Claims Line Open</span>
                </div>
              </div>
            </motion.div>

            {/* Overlapping small visual: map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl p-2 shadow-2xl border-2 border-navy-500 overflow-hidden hidden sm:block"
            >
              <img 
                src={getImageUrl('/route_map.jpg')} 
                alt="Map Route South Africa to Mozambique" 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-navy-900/95 py-1 text-center">
                <span className="text-[9px] font-bold text-gold-400 uppercase tracking-wider">Direct Route</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
