/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, MapPin, HeartHandshake, Award } from 'lucide-react';
import { Language, translations } from '../translations';
import funeralHearse from '../assets/images/funeral_hearse.jpg';
import sickTransport from '../assets/images/sick_transport.jpg';
import badgesGrid from '../assets/images/badges_grid.jpg';
import routeMap from '../assets/images/route_map.jpg';
import familyMinibus from '../assets/images/family_minibus.jpg';

interface ServicesProps {
  lang: Language;
}

export default function Services({ lang }: ServicesProps) {
  const t = translations[lang];

  const serviceList = [
    {
      id: 'funeral',
      title: t.serviceFuneral,
      description: t.serviceFuneralDesc,
      image: funeralHearse, // Mercedes hearse (image_5.png)
      icon: <Truck className="w-5 h-5 text-gold-400" />
    },
    {
      id: 'sick',
      title: t.serviceSick,
      description: t.serviceSickDesc,
      image: sickTransport, // Sick person transport support (image_7.png)
      icon: <HeartHandshake className="w-5 h-5 text-gold-400" />
    },
    {
      id: 'recovery',
      title: t.serviceRecovery,
      description: t.serviceRecoveryDesc,
      image: badgesGrid, // Icons and badges grid (image_8.png)
      icon: <Award className="w-5 h-5 text-gold-400" />
    },
    {
      id: 'border',
      title: t.serviceBorder,
      description: t.serviceBorderDesc,
      image: routeMap, // South Africa to Mozambique route map (image_2.png)
      icon: <MapPin className="w-5 h-5 text-gold-400" />
    },
    {
      id: 'family',
      title: t.serviceFamily,
      description: t.serviceFamilyDesc,
      image: familyMinibus, // Family Toyota minibus (image_6.png)
      icon: <Truck className="w-5 h-5 text-gold-400" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            {t.navServices}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.servicesSubtitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500 uppercase font-bold tracking-wide mt-2">
            📍 Core Transport Corridor: South Africa ➡️ Inhambane, Mozambique
          </p>
        </div>

        {/* Bento Grid layout of services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => {
            // Give specific sizes or column spans to make it a premium bento grid layout
            const isFullWidthOnLarge = index === 3 || index === 4;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isFullWidthOnLarge ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-4 bg-navy-900/90 backdrop-blur-md p-2 rounded-xl border border-navy-700 shadow-lg flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-navy-500 font-semibold uppercase tracking-wider">
                    <span>Care Beyond Borders</span>
                    <span className="text-gold-600 flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 inline mr-1" />
                      Full Cover
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
