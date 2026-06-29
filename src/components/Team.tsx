/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { Language, translations } from '../translations';

interface TeamProps {
  lang: Language;
}

export default function Team({ lang }: TeamProps) {
  const t = translations[lang];

  const team = [
    {
      name: "Mr Mafumo",
      role: t.teamSupport,
      phone: "071 534 6002",
      email: "carebeyo@carebeyondborders.co.za",
      avatarLetter: "M",
      badge: "Operations Lead"
    },
    {
      name: "Mr Egmon Mondlane",
      role: t.teamCoordinator,
      phone: "067 086 3832",
      email: "Egmonmondlane@gmail.com",
      avatarLetter: "E",
      badge: "Logistics Expert"
    },
    {
      name: "Mr J. Zeekhali",
      role: t.teamRelations,
      phone: "", // No phone provided for Mr Zeekhali, handle gracefully!
      email: "Jzeekhali@gmail.com",
      avatarLetter: "Z",
      badge: "Administration"
    }
  ];

  return (
    <section id="team" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[25%] h-[30%] rounded-full bg-navy-50 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            {t.navTeam}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.teamTitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500">
            {t.teamSubtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded border border-slate-200 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-gold-500 transition-all duration-300"
            >
              {/* Profile Top Info */}
              <div className="space-y-4">
                {/* Visual Avatar Placeholder */}
                <div className="relative w-16 h-16 rounded-full bg-navy-500 text-white flex items-center justify-center font-display font-extrabold text-xl shadow border-2 border-gold-500">
                  {member.avatarLetter}
                  
                  {/* Floating verification badge */}
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white text-white p-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="inline-block bg-gold-50 text-gold-600 border border-gold-200 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-widest mb-1">
                    {member.badge}
                  </div>
                  <h3 className="text-lg font-extrabold text-navy-900 group-hover:text-gold-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-tight">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Contact info list */}
              <div className="border-t border-slate-200/50 pt-4 space-y-2.5">
                {member.phone && (
                  <a 
                    href={`tel:${member.phone.replace(/\s+/g, '')}`}
                    className="flex items-center space-x-2 text-xs text-slate-600 hover:text-gold-600 transition-colors font-medium"
                  >
                    <div className="p-1.5 bg-slate-100 text-navy-500 rounded-md group-hover:bg-gold-50 group-hover:text-gold-700 transition-all">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span>{member.phone}</span>
                  </a>
                )}
                
                <a 
                  href={`mailto:${member.email}`}
                  className="flex items-center space-x-2 text-xs text-slate-600 hover:text-gold-600 transition-colors font-medium truncate"
                >
                  <div className="p-1.5 bg-slate-100 text-navy-500 rounded-md group-hover:bg-gold-50 group-hover:text-gold-700 transition-all">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{member.email}</span>
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
