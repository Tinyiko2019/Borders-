/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../translations';
import { useForm, ValidationError } from '@formspree/react';
import { getImageUrl } from '../types';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];

  // Contact Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Use Formspree Hook with Form ID xnjkzlrw
  const [formspreeState, handleFormspreeSubmit] = useForm('xnjkzlrw');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { 
      id: Math.random().toString(36).substring(2, 11),
      fullName, 
      email, 
      phone, 
      subject, 
      message,
      dateSubmitted: new Date().toISOString()
    };

    // Save to localStorage so that the Admin view works on a completely static hosting!
    try {
      const storedMsgs = localStorage.getItem('cbb_messages');
      const msgsList = storedMsgs ? JSON.parse(storedMsgs) : [];
      msgsList.unshift(payload);
      localStorage.setItem('cbb_messages', JSON.stringify(msgsList));
    } catch (err) {
      console.warn('Error saving message to localStorage:', err);
    }

    try {
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('run.app')) {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => {
          console.warn('Local contact API not active, falling back to static mode.', err);
        });
      }
    } catch (err) {}

    // Submit to Formspree
    await handleFormspreeSubmit(e);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[30%] h-[30%] rounded-full bg-gold-100 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            {t.navContact}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.contactTitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto mb-16">
          
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Customer Support Desk Visual */}
            <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm aspect-[16/10] relative group">
              <img 
                src={getImageUrl('/customer_support.jpg')} 
                alt="Care Beyond Borders Client Support Desk" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-gold-500 text-white px-2.5 py-1 rounded shadow-sm">
                  Customer Support
                </span>
              </div>
            </div>

            <div className="bg-white rounded border border-slate-200 p-6 shadow-sm space-y-6 flex-grow flex flex-col justify-between">
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gold-500" />
                  <span>{t.contactOffice}</span>
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {t.contactOfficeVal}
                </p>
              </div>

              {/* Telephone Portal */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>Telephone Lines</span>
                </h4>
                <div className="flex flex-col space-y-2">
                  <a href="tel:+27715346002" className="text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>071 534 6002 (Mr Mafumo)</span>
                  </a>
                  <a href="tel:+27670863832" className="text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>067 086 3832 (Mr Mondlane)</span>
                  </a>
                </div>
              </div>

              {/* Quick Call and WhatsApp triggers */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a 
                  href="tel:+27715346002"
                  className="flex-1 bg-navy-500 hover:bg-navy-600 text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>{t.btnCallNow}</span>
                </a>
                
                <a 
                  href="https://wa.me/27715346002?text=Hello%20Care%20Beyond%20Borders%2C%20I%20am%20interested%20in%20applying%20for%20membership%20cover."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{t.btnWhatsApp}</span>
                </a>
              </div>

              {/* Emails directories */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gold-500" />
                  <span>Email Inboxes</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <a href="mailto:carebeyo@carebeyondborders.co.za" className="block hover:text-gold-600 transition-colors">carebeyo@carebeyondborders.co.za</a>
                  <a href="mailto:Egmonmondlane@gmail.com" className="block hover:text-gold-600 transition-colors">Egmonmondlane@gmail.com</a>
                  <a href="mailto:Jzeekhali@gmail.com" className="block hover:text-gold-600 transition-colors">Jzeekhali@gmail.com</a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Us Email Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded border border-slate-200 p-6 md:p-8 shadow-sm h-full">
              <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-4 mb-6 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-gold-500" />
                <span>{t.contactFormTitle}</span>
              </h3>

              {formspreeState.succeeded ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-lg font-bold text-navy-900">Message Delivered</h4>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    {t.contactFormSuccess}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">Thanks for reaching out! We will be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Formspree hidden inputs to capture Form Type */}
                  <input type="hidden" name="Form Type" value="Contact" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-500 uppercase tracking-widest block">{t.contactFormName}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-500 uppercase tracking-widest block">{t.contactFormEmail}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                      <ValidationError prefix="Email" field="email" errors={formspreeState.errors} className="text-xs text-red-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-500 uppercase tracking-widest block">{t.contactFormPhone}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 071 534 6002"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-500 uppercase tracking-widest block">{t.contactFormSubject}</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="Membership inquiry"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-500 uppercase tracking-widest block">{t.contactFormMsg}</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 resize-none"
                    />
                    <ValidationError prefix="Message" field="message" errors={formspreeState.errors} className="text-xs text-red-500" />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={formspreeState.submitting}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-500 font-bold py-3 rounded transition-all shadow hover:shadow-md text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {formspreeState.submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contactFormBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Embedded Interactive Google Map */}
        <div className="max-w-6xl mx-auto bg-white rounded overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-navy-900 py-3.5 px-6 border-b border-navy-800 flex justify-between items-center text-white">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Interactive Location Map</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">Glen Marais, Kempton Park</span>
          </div>
          <div className="aspect-[21/9] w-full min-h-[300px] bg-slate-100">
            <iframe
              title="Care Beyond Borders Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.2818789370046!2d28.23963471166418!3d-26.05707757707447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95143a17f6946d%3A0xe67c9c0f993d04e5!2s13%20Oorbietjie%20St%2C%20Nimrod%20Park%2C%20Kempton%20Park%2C%201619%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
