/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image, Eye, Compass, HeartHandshake } from 'lucide-react';
import { Language } from '../translations';
import { getImageUrl } from '../types';

interface GalleryProps {
  lang: Language;
}

export default function Gallery({ lang }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const t = {
    en: {
      title: "Our Operational Gallery",
      subtitle: "A visual testament to our vehicles, border logistics, and hands-on community care.",
      tag: "Real Impact",
      close: "Close View"
    },
    pt: {
      title: "Galeria Operacional",
      subtitle: "Um testemunho visual dos nossos veículos, logística de fronteira e cuidado comunitário.",
      tag: "Impacto Real",
      close: "Fechar"
    }
  }[lang];

  const galleryItems = [
    {
      id: 'funeral_hearse',
      src: '/funeral_hearse.jpg?v=5',
      title: lang === 'en' ? 'Dignified Mercedes Hearse Fleet' : 'Frota de Carros Funerários Mercedes',
      category: lang === 'en' ? 'Repatriation' : 'Repatriação',
      description: lang === 'en' ? 'Comfortable, professional, and elegant fleet for deceased transit.' : 'Frota profissional e elegante para o trânsito digno de falecidos.'
    },
    {
      id: 'family_minibus',
      src: '/family_minibus.jpg?v=5',
      title: lang === 'en' ? 'Toyota Family Minibus Support' : 'Apoio de Carrinhas Toyota para Famílias',
      category: lang === 'en' ? 'Family Transit' : 'Trânsito Familiar',
      description: lang === 'en' ? 'Spacious vehicles ensuring immediate family members travel in complete safety.' : 'Veículos espaçosos para que a família viaje com total segurança.'
    },
    {
      id: 'sick_transport',
      src: '/sick_transport.jpg?v=5',
      title: lang === 'en' ? 'Medical Transport Support' : 'Suporte de Transporte de Doentes',
      category: lang === 'en' ? 'Healthcare' : 'Saúde',
      description: lang === 'en' ? 'Attentive non-emergency transport for ill members to return home.' : 'Transporte não-emergencial atencioso para membros doentes regressarem.'
    },
    {
      id: 'orphan_caring',
      src: '/orphan_caring.jpg?v=5',
      title: lang === 'en' ? 'Orphan and Social Care Relief' : 'Apoio Social e Cuidado de Órfãos',
      category: lang === 'en' ? 'Community' : 'Comunidade',
      description: lang === 'en' ? 'Giving back to vulnerable children and community support projects.' : 'Apoio ativo a crianças vulneráveis e projetos sociais comunitários.'
    },
    {
      id: 'books_laptop',
      src: '/books_laptop.jpg?v=5',
      title: lang === 'en' ? 'Educational Support & Upliftment' : 'Apoio Educacional e Capacitação',
      category: lang === 'en' ? 'Education' : 'Educação',
      description: lang === 'en' ? 'Providing books, laptops, and study resources for youth.' : 'Fornecimento de livros, computadores e recursos de estudo para jovens.'
    },
    {
      id: 'customer_support',
      src: '/customer_support.jpg?v=5',
      title: lang === 'en' ? '24/7 Multi-lingual Care Desk' : 'Central de Atendimento Bilingue 24h',
      category: lang === 'en' ? 'Administration' : 'Administração',
      description: lang === 'en' ? 'Attentive specialists managing claims and border clearance workflows.' : 'Especialistas gerindo processos de liberação fronteiriça e sinistros.'
    },
    {
      id: 'route_map',
      src: '/route_map.jpg?v=5',
      title: lang === 'en' ? 'South Africa to Inhambane Corridor' : 'Corredor África do Sul a Inhambane',
      category: lang === 'en' ? 'Logistics' : 'Logística',
      description: lang === 'en' ? 'Clear, direct pathways connecting GP, MP directly to Mozambique.' : 'Rotas claras ligando Gauteng e Mpumalanga diretamente a Moçambique.'
    },
    {
      id: 'badges_grid',
      src: '/badges_grid.jpg?v=5',
      title: lang === 'en' ? 'Trust Accreditations & Badges' : 'Acreditações e Selos de Confiança',
      category: lang === 'en' ? 'Accreditation' : 'Acreditação',
      description: lang === 'en' ? 'Verified compliance and regulatory approvals for cross-border services.' : 'Conformidade verificada e aprovações regulatórias transfronteiriças.'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 flex items-center justify-center gap-1.5">
            <Image className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gold-500 rounded mx-auto"></div>
          <p className="text-sm text-slate-500 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Gallery Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => setSelectedImage(item.src)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                <img
                  src={getImageUrl(item.src)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 text-navy-900 p-2.5 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5 text-gold-600" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur text-[10px] font-bold text-gold-400 uppercase tracking-widest px-2 py-0.5 rounded border border-navy-700/50">
                  {item.category}
                </div>
              </div>
              
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-navy-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox / Zoom Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-navy-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-navy-900">
              <img 
                src={getImageUrl(selectedImage)} 
                alt="Enlarged gallery item" 
                className="max-w-full max-h-[75vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              <div className="bg-navy-950 py-3 px-6 flex justify-between items-center text-white text-xs border-t border-navy-800">
                <span className="font-semibold text-slate-300">Care Beyond Borders Gallery</span>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-3.5 py-1.5 rounded cursor-pointer transition-all"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
