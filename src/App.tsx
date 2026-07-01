/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Plans from './components/Plans';
import ApplicationForm from './components/ApplicationForm';
import FAQ from './components/FAQ';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import { Language } from './translations';
import { MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<'site' | 'admin'>('site');
  const [selectedPlanId, setSelectedPlanId] = useState<'individual' | 'family' | 'senior'>('individual');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Monitor scroll height to display Back-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor path changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'pt' : 'en'));
  };

  const handleSelectPlan = (planId: 'individual' | 'family' | 'senior') => {
    setSelectedPlanId(planId);
    if (currentPath === '/contact' || currentPath.endsWith('/contact')) {
      window.history.pushState({}, '', './');
      setCurrentPath('/');
    }
    // Scroll smoothly to application form section
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    setView('site');
    if (currentPath === '/contact' || currentPath.endsWith('/contact')) {
      window.history.pushState({}, '', './');
      setCurrentPath('/');
    }
    // Allow React time to mount the elements if switching from admin view
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col relative selection:bg-gold-500 selection:text-navy-950">
      
      {/* Universal Navigation bar (Persistent across both views for fast access) */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        isAdminView={view === 'admin'}
        setIsAdminView={(isAdmin) => setView(isAdmin ? 'admin' : 'site')}
        onNavigate={navigateToSection}
      />

      {/* Primary Routing Switcher */}
      {view === 'admin' ? (
        <AdminPortal 
          lang={lang} 
          onBackToSite={() => setView('site')} 
        />
      ) : (
        <main className="flex-grow">
          {/* Hero segment */}
          <Hero 
            lang={lang} 
            onNavigate={navigateToSection}
          />

          {/* About us corridor & values */}
          <About lang={lang} />

          {/* Detailed logistics services */}
          <Services lang={lang} />

          {/* Our Operational Gallery */}
          <Gallery lang={lang} />

          {/* Premium pricing and plan tiers */}
          <Plans 
            lang={lang} 
            onSelectPlan={handleSelectPlan} 
          />

          {/* Interactive online application wizard */}
          <ApplicationForm 
            lang={lang} 
            selectedPlanId={selectedPlanId}
            onResetPlan={() => setSelectedPlanId('individual')}
            onNavigateToAdmin={() => setView('admin')}
          />

          {/* Bilingual FAQ Accordions */}
          <FAQ lang={lang} />

          {/* Staff directory & contact details */}
          <Team lang={lang} />

          {/* Member Testimonials */}
          <Testimonials lang={lang} />

          {/* Physical Address & messages inbox form */}
          <Contact lang={lang} />
        </main>
      )}

      {/* Footer segment with modal disclosures */}
      <Footer 
        lang={lang} 
        onNavigateToSection={navigateToSection} 
      />

      {/* PERSISTENT FLOATING ACTIONS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5">
        
        {/* Responsive WhatsApp launcher */}
        <a
          href="https://wa.me/27715346002?text=Hello%20Care%20Beyond%20Borders%2C%20I%20am%20interested%20in%20applying%20for%20membership%20cover."
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center border-2 border-white cursor-pointer"
          title="Chat with Operations Team on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
        </a>

        {/* Back-To-Top triggers */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-navy-900/90 hover:bg-navy-900 text-white p-3.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center border-2 border-slate-700/50 cursor-pointer"
            title="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

      </div>

    </div>
  );
}
