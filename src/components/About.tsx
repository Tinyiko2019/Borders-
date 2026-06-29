/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Landmark, ShieldAlert, BadgeCheck, Users, HelpCircle } from 'lucide-react';
import { Language, translations } from '../translations';
import combinedFlags from '../assets/images/combined_flags.jpg';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang];

  const values = [
    {
      icon: <Users className="w-6 h-6 text-gold-500" />,
      title: t.aboutValue1,
      description: t.aboutValue1Desc
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-gold-500" />,
      title: t.aboutValue2,
      description: t.aboutValue2Desc
    },
    {
      icon: <Landmark className="w-6 h-6 text-gold-500" />,
      title: t.aboutValue3,
      description: t.aboutValue3Desc
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle details background decorator */}
      <div className="absolute top-1/2 right-0 w-[30%] h-[30%] rounded-full bg-navy-50 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Images & Flag Representation */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100"
            >
              <div className="aspect-[4/3] w-full">
                <img 
                  src={combinedFlags} 
                  alt="South Africa and Mozambique Flags Combined" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase font-bold text-gold-400 tracking-wider mb-1">
                  Connecting Nations
                </p>
                <h4 className="text-lg font-bold leading-tight font-display">
                  South Africa & Mozambique Unified Cover
                </h4>
              </div>
            </motion.div>

            {/* Micro stats banner for credibility */}
            <div className="grid grid-cols-3 gap-4 bg-navy-50 p-5 rounded-2xl border border-navy-100 shadow-sm">
              <div className="text-center">
                <span className="block text-2xl font-extrabold text-navy-500 font-display">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Online Process</span>
              </div>
              <div className="text-center border-x border-slate-200">
                <span className="block text-2xl font-extrabold text-navy-500 font-display">24/7</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Logistics Care</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-extrabold text-navy-500 font-display">40k MT</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Recovery Relief</span>
              </div>
            </div>
          </div>

          {/* Right Side: Information copy */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
                {t.navAbout}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 leading-tight">
                {t.aboutSubtitle}
              </h2>
              <div className="w-16 h-1 bg-gold-500 rounded"></div>
            </div>

            <div className="space-y-4 text-slate-600 font-light leading-relaxed">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>

            {/* Core Values Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {values.map((v, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-slate-50 hover:bg-white p-5 rounded-xl border border-slate-100 hover:border-gold-500/30 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-3 bg-white w-10 h-10 rounded-lg flex items-center justify-center border border-slate-100 shadow-sm">
                    {v.icon}
                  </div>
                  <h4 className="text-sm font-bold text-navy-900 mb-1">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    {v.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
