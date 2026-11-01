'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { CAFE_INFO } from '@/data/menu';
import { Coffee, MapPin, Phone, MessageSquare, Instagram, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-[#1E110A] text-[#FAF7F2] pt-14 pb-24 md:pb-14 border-t border-[#3B2217]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white tracking-tight">
              Speculos <span className="font-light italic text-[#E0A96D]">Café & Lounge</span>
            </h3>
            <p className="text-xs text-[#C5B5A5] leading-relaxed">
              {lang === 'ar'
                ? 'مقهى القهوة المختصة والمعجنات الطازجة بشارع الحسن الثاني بمدينة أسفي. نرحب بكم يومياً في أجوائنا الدافئة أو عبر نافذة السيارات السريعة.'
                : lang === 'fr'
                ? 'Café de spécialité, viennoiseries dorées du matin et service Drive-Thru express sur l’Avenue Hassan II à Safi, Maroc.'
                : 'Artisan specialty coffee roasts, freshly baked pastries, and express drive-thru on Avenue Hassan II in Safi, Morocco.'}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#2E1B12] hover:bg-[#452719] flex items-center justify-center text-[#E0A96D] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="w-8 h-8 rounded-lg bg-[#2E1B12] hover:bg-[#452719] flex items-center justify-center text-[#E0A96D] transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#2E1B12] hover:bg-[#452719] flex items-center justify-center text-[#E0A96D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E0A96D]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-[#C5B5A5]">
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  {t('story')}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  {t('menu')}
                </a>
              </li>
              <li>
                <a href="#drive-thru" className="hover:text-white transition-colors">
                  {t('driveThru')}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  {t('location')}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Schedule Recap */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E0A96D]">
              {lang === 'ar' ? 'ساعات العمل' : 'Horaires'}
            </p>
            <div className="space-y-1.5 text-xs text-[#C5B5A5]">
              <p className="flex justify-between">
                <span>{lang === 'ar' ? 'الإثنين - الخميس' : 'Lun – Jeu'}:</span>
                <span className="font-mono text-white tabular-nums">06:30 – 23:30</span>
              </p>
              <p className="flex justify-between">
                <span>{lang === 'ar' ? 'الجمعة - السبت' : 'Ven – Sam'}:</span>
                <span className="font-mono text-white tabular-nums">06:30 – 00:00</span>
              </p>
              <p className="flex justify-between">
                <span>{lang === 'ar' ? 'الأحد' : 'Dimanche'}:</span>
                <span className="font-mono text-white tabular-nums">06:30 – 23:30</span>
              </p>
              <p className="text-[11px] text-[#A8988B] pt-1">
                Drive-Thru ouvert dès 06h30
              </p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E0A96D]">
              {lang === 'ar' ? 'العنوان والاتصال' : 'Contact & Accès'}
            </p>
            <div className="space-y-2 text-xs text-[#C5B5A5]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.street}, Safi, Maroc</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                <span>{CAFE_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                <span>{CAFE_INFO.whatsapp}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Required Independent Portfolio Concept Disclaimer */}
        <div className="pt-8 border-t border-[#2E1B12] space-y-4">
          <div className="p-4 rounded-2xl bg-[#140B07] border border-[#2E1B12] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#FAF7F2]">
                {t('disclaimerTitle')} (AEREOSTACK Architecture & Showcase)
              </p>
              <p className="text-[11px] text-[#A8988B] leading-relaxed">
                {t('disclaimerText')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A70] gap-2">
            <p>© {new Date().getFullYear()} Speculos Café & Lounge · Independent Portfolio Concept.</p>
            <p className="flex items-center gap-1">
              Crafted with attention to detail for Avenue Hassan II, Safi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
