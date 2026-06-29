/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, FileText, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { translations, Language } from '../translations';
import cbbLogo from '../assets/images/cbb_logo.jpg';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ lang, setLang, isAdminView, setIsAdminView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'plans', label: t.navPlans },
    { id: 'apply', label: t.navApply },
    { id: 'faq', label: t.navFAQ },
    { id: 'team', label: t.navTeam },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setIsAdminView(false);
    onNavigate(id);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-gold-500 ${
      scrolled || isAdminView ? 'bg-navy-500 shadow-md py-3' : 'bg-navy-500/95 backdrop-blur-md py-4'
    }`}>
      {/* Top micro-bar for quick contact info */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center text-xs text-slate-300 border-b border-navy-700/50 pb-2 mb-2 hidden sm:flex">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.bannerSupport}: 071 534 6002 / 067 086 3832</span>
          </span>
          <span className="text-gold-400">SA ➡️ Inhambane, Mozambique</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAdminView(!isAdminView)}
            className="flex items-center space-x-1 hover:text-gold-400 transition-colors text-slate-300 text-[11px]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>{isAdminView ? t.navHome : t.navAdmin}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-12 h-12 bg-slate-950 rounded-full p-1 shadow-inner overflow-hidden flex items-center justify-center border-2 border-gold-500">
              <img 
                src={cbbLogo} 
                alt="Care Beyond Borders Logo" 
                className="object-contain w-full h-full scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-gold-500 transition-colors leading-tight font-display">
                Care Beyond Borders
              </span>
              <span className="text-[10px] md:text-xs text-gold-500 font-semibold tracking-wider leading-none uppercase">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {!isAdminView ? (
              navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-gold-500 rounded-lg transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))
            ) : (
              <button
                onClick={() => handleNavClick('home')}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-gold-500 rounded-lg transition-colors"
              >
                ← Back to Main Website
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center ml-4 pl-4 border-l border-navy-700 space-x-1 bg-navy-950/40 p-1.5 rounded-lg border border-navy-800/80">
              <button
                onClick={() => setLang('en')}
                className={`flex items-center space-x-1 px-2 py-1 text-xs rounded transition-all ${
                  lang === 'en' 
                    ? 'bg-gold-500 text-navy-500 font-bold shadow' 
                    : 'text-slate-300 hover:bg-navy-800'
                }`}
                title="English"
              >
                <span>🇬🇧</span>
                <span className="hidden xl:inline">EN</span>
              </button>
              <button
                onClick={() => setLang('pt')}
                className={`flex items-center space-x-1 px-2 py-1 text-xs rounded transition-all ${
                  lang === 'pt' 
                    ? 'bg-gold-500 text-navy-500 font-bold shadow' 
                    : 'text-slate-300 hover:bg-navy-800'
                }`}
                title="Português"
              >
                <span>🇲🇿</span>
                <span className="hidden xl:inline">PT</span>
              </button>
            </div>

            {/* Quick Action */}
            {!isAdminView && (
              <button
                onClick={() => handleNavClick('apply')}
                className="ml-4 bg-gold-500 hover:bg-gold-600 text-navy-500 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded shadow hover:shadow-md transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.navApply}</span>
              </button>
            )}
          </nav>

          {/* Mobile Actions Menu and Hamburger */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Quick Language Switcher on Mobile */}
            <div className="flex items-center space-x-1 bg-navy-950/50 p-1 rounded-lg border border-navy-800/60">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs rounded transition-all ${
                  lang === 'en'
                    ? 'bg-gold-500 text-navy-500 font-bold shadow'
                    : 'text-slate-300 hover:bg-navy-800'
                }`}
                title="English"
              >
                <span>🇬🇧</span>
                <span className="ml-1">EN</span>
              </button>
              <button
                onClick={() => setLang('pt')}
                className={`px-2 py-1 text-xs rounded transition-all ${
                  lang === 'pt'
                    ? 'bg-gold-500 text-navy-500 font-bold shadow'
                    : 'text-slate-300 hover:bg-navy-800'
                }`}
                title="Português"
              >
                <span>🇲🇿</span>
                <span className="ml-1">PT</span>
              </button>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-navy-900 border-t border-navy-800 shadow-xl py-4 px-6 space-y-3 flex flex-col z-40 animate-fade-in">
          {!isAdminView ? (
            navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left py-2.5 px-4 rounded-lg text-slate-200 hover:bg-navy-800 hover:text-gold-400 transition-all font-medium"
              >
                {item.label}
              </button>
            ))
          ) : (
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2.5 px-4 rounded-lg text-slate-200 hover:bg-navy-800 font-medium"
            >
              ← Back to Main Website
            </button>
          )}

          <div className="h-[1px] bg-navy-800 my-2"></div>

          {/* Quick Admin Toggle on Mobile Drawer */}
          <button
            onClick={() => {
              setIsAdminView(!isAdminView);
              setIsOpen(false);
            }}
            className="w-full flex items-center space-x-2 text-left py-2.5 px-4 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-gold-500 font-semibold"
          >
            <LayoutDashboard className="w-4 h-4 text-gold-500" />
            <span>{isAdminView ? 'Main Website' : t.navAdmin}</span>
          </button>

          {!isAdminView && (
            <button
              onClick={() => handleNavClick('apply')}
              className="w-full bg-gold-500 hover:bg-gold-600 text-navy-500 font-bold uppercase tracking-wider py-3 rounded shadow text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{t.navApply}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
