/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Heart, MapPin, Phone, Mail, X } from 'lucide-react';
import { Language, translations } from '../translations';
import cbbLogo from '../assets/images/cbb_logo.jpg';

interface FooterProps {
  lang: Language;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ lang, onNavigateToSection }: FooterProps) {
  const t = translations[lang];

  // Modals state
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const quickLinks = [
    { label: t.navHome, id: 'home' },
    { label: t.navAbout, id: 'about' },
    { label: t.navServices, id: 'services' },
    { label: t.navPlans, id: 'plans' },
    { label: t.navApply, id: 'apply' },
    { label: t.navFAQ, id: 'faq' }
  ];

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8 relative overflow-hidden border-t-4 border-gold-500">

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-800 pb-12 mb-12">
          
          {/* Column 1: Brand & values */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              {/* Actual Brand Logo */}
              <div className="w-11 h-11 bg-slate-950 rounded-full p-1 shadow border border-gold-500 overflow-hidden flex items-center justify-center">
                <img 
                  src={cbbLogo} 
                  alt="Care Beyond Borders Logo" 
                  className="object-contain w-full h-full scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight font-display text-white">
                Care Beyond Borders
              </span>
            </div>
            
            <p className="text-xs text-gold-400 font-extrabold uppercase tracking-widest font-mono">
              {t.tagline}
            </p>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Providing premium cross-border funeral cover, medical repatriations, and family transport logistics with utmost care, respect, and dignity between South Africa and Inhambane, Mozambique.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigateToSection(link.id)}
                    className="text-xs text-slate-400 hover:text-gold-500 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details summaries */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Headquarters
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  13 Oorbietjie Street, Nimrod Park, Glen Marais, Kempton Park, 1619, South Africa
                </span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span>071 534 6002 | 067 086 3832</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="truncate">carebeyo@carebeyondborders.co.za</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} Care Beyond Borders. All rights reserved.</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline mx-0.5" />
            <span>Mozambique Corridor.</span>
          </p>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-gold-500 transition-colors cursor-pointer"
            >
              {t.privacyTitle}
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-gold-500 transition-colors cursor-pointer"
            >
              {t.termsTitle}
            </button>
          </div>
        </div>

      </div>

      {/* MODAL OVERLAYS FOR PRIVACY AND TERMS */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto space-y-6 relative text-slate-300 shadow-2xl animate-fade-in">
            
            {/* Close button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-xl font-extrabold text-white font-display">
                {activeModal === 'privacy' ? t.privacyTitle : t.termsTitle}
              </h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Care Beyond Borders Policy</p>
            </div>

            {/* Modal Content */}
            <div className="text-xs space-y-4 leading-relaxed font-light">
              {activeModal === 'privacy' ? (
                <>
                  <p className="font-bold text-white text-sm">Information Security & Policy Compliance</p>
                  <p>{t.privacyText}</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-white text-sm">Membership Terms of Service & Disclaimers</p>
                  <p>{t.termsText}</p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-navy-500 hover:bg-navy-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
