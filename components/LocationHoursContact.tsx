'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { CAFE_INFO } from '@/data/menu';
import { MapPin, Phone, Clock, MessageSquare, Navigation, CheckCircle2, Car } from 'lucide-react';

export default function LocationHoursContact() {
  const { lang, t } = useLanguage();

  const daysSchedule = [
    { dayEn: 'Monday', dayFr: 'Lundi', dayAr: 'الإثنين', hours: '06:30 – 23:30', isToday: new Date().getDay() === 1 },
    { dayEn: 'Tuesday', dayFr: 'Mardi', dayAr: 'الثلاثاء', hours: '06:30 – 23:30', isToday: new Date().getDay() === 2 },
    { dayEn: 'Wednesday', dayFr: 'Mercredi', dayAr: 'الأربعاء', hours: '06:30 – 23:30', isToday: new Date().getDay() === 3 },
    { dayEn: 'Thursday', dayFr: 'Jeudi', dayAr: 'الخميس', hours: '06:30 – 23:30', isToday: new Date().getDay() === 4 },
    { dayEn: 'Friday', dayFr: 'Vendredi', dayAr: 'الجمعة', hours: '06:30 – 00:00', isToday: new Date().getDay() === 5 },
    { dayEn: 'Saturday', dayFr: 'Samedi', dayAr: 'السبت', hours: '06:30 – 00:00', isToday: new Date().getDay() === 6 },
    { dayEn: 'Sunday', dayFr: 'Dimanche', dayAr: 'الأحد', hours: '06:30 – 23:30', isToday: new Date().getDay() === 0 },
  ];

  return (
    <section id="location" className="py-16 md:py-24 bg-[#F5EFEB] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#8C4A16] uppercase tracking-wider">
            <span className="w-5 h-[1px] bg-[#8C4A16]" />
            <span>{lang === 'ar' ? 'الموقع وساعات العمل' : lang === 'fr' ? 'Accès & Horaires' : 'Location & Hours'}</span>
            <span className="w-5 h-[1px] bg-[#8C4A16]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1810] tracking-tight">
            {lang === 'ar' ? 'في قلب شارع الحسن الثاني بأسفي' : lang === 'fr' ? 'Sur l’Avenue Hassan II à Safi' : 'Centrally Located on Avenue Hassan II'}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5A50]">
            {lang === 'ar'
              ? 'موقع يسهل الوصول إليه سيراً على الأقدام أو بالسيارة، مع مواقف مريحة ومسار درايف ثرو مجهز.'
              : lang === 'fr'
              ? 'Idéalement situé sur l’artère principale de Safi, avec accès piéton et voie drive-thru fluide.'
              : 'Easily accessible on Safi’s central thoroughfare with dedicated drive-thru and pedestrian terrace.'}
          </p>
        </div>

        {/* 2-Column Card Grid: Location/Map on Left, Hours & Contact on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stylized Avenue Hassan II Map Visual & Quick Access */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl border border-[#E0D5C7] p-6 sm:p-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2B1810]">
                    {CAFE_INFO.name}
                  </h3>
                  <p className="text-sm text-[#78350F] font-medium mt-0.5">
                    {CAFE_INFO.street}, {CAFE_INFO.city}, {CAFE_INFO.country}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#B45309] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6B5A50] leading-relaxed">
                {CAFE_INFO.landmark}
              </p>

              {/* Stylized Visual Map Representation of Avenue Hassan II */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#EAE2D7] border border-[#D9CFC4] flex flex-col justify-between p-4 shadow-inner">
                {/* Visual Street Lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-1/2 left-0 right-0 h-16 bg-[#2B1810] -translate-y-1/2 flex items-center justify-around">
                    <div className="w-8 h-1 bg-[#FAF7F2] border-dashed" />
                    <div className="w-8 h-1 bg-[#FAF7F2] border-dashed" />
                    <div className="w-8 h-1 bg-[#FAF7F2] border-dashed" />
                    <div className="w-8 h-1 bg-[#FAF7F2] border-dashed" />
                  </div>
                  <div className="absolute top-0 bottom-0 left-1/3 w-10 bg-[#78350F]" />
                </div>

                {/* Top Badge on Map */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-[#2B1810] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#D9CFC4]">
                    Av. Hassan II · Safi (أسفي)
                  </span>
                  <span className="text-[11px] font-medium text-[#15803D] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#D9CFC4] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Drive-Thru Lane Clear
                  </span>
                </div>

                {/* Center Pin Callout */}
                <div className="relative z-10 my-auto text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className="px-3.5 py-1.5 rounded-xl bg-[#2B1810] text-[#FAF7F2] shadow-xl text-xs font-semibold flex items-center gap-1.5 border border-[#E0A96D]/40">
                      <div className="w-2 h-2 rounded-full bg-[#E0A96D] animate-ping" />
                      <span>Speculos Café & Lounge</span>
                    </div>
                    <div className="w-2 h-3 bg-[#2B1810] clip-triangle" />
                  </div>
                </div>

                {/* Bottom Navigation Shortcut */}
                <div className="relative z-10 flex items-center justify-between gap-2 pt-2">
                  <span className="text-[11px] text-[#5C4D44] font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
                    Coordonnées GPS: 32.2994° N, 9.2372° W
                  </span>
                  <a
                    href="https://maps.google.com/?q=Avenue+Hassan+II+Safi+Morocco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2B1810] hover:bg-[#451A03] text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#E0A96D]" />
                    <span>{t('getDirections')}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="pt-6 mt-6 border-t border-[#F2EAE0] grid grid-cols-2 gap-3">
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#D9CFC4] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-xs font-semibold text-[#2B1810] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#78350F]" />
                <span>{CAFE_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${CAFE_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#D9CFC4] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-xs font-semibold text-[#2B1810] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Right Column: Weekly Schedule & Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl border border-[#E0D5C7] p-6 sm:p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2EAE0]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#8C4A16]" />
                  <h3 className="text-lg font-serif font-bold text-[#2B1810]">
                    {lang === 'ar' ? 'ساعات العمل اليومية' : lang === 'fr' ? 'Horaires d’Ouverture' : 'Operating Schedule'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-medium text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                  {t('openNow')}
                </span>
              </div>

              {/* Schedule Table */}
              <div className="space-y-2">
                {daysSchedule.map((item) => {
                  const dayName = lang === 'ar' ? item.dayAr : lang === 'fr' ? item.dayFr : item.dayEn;
                  return (
                    <div
                      key={item.dayEn}
                      className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm transition-colors ${
                        item.isToday
                          ? 'bg-[#FAF0E6] font-semibold text-[#2B1810] border border-[#E0A96D]/40'
                          : 'text-[#6B5A50] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.isToday && (
                          <span className="text-[10px] uppercase font-bold text-[#8C4A16] bg-white px-1.5 py-0.5 rounded shadow-2xs">
                            {lang === 'ar' ? 'اليوم' : lang === 'fr' ? 'Aujourd’hui' : 'Today'}
                          </span>
                        )}
                        <span>{dayName}</span>
                      </div>
                      <span className="font-mono tabular-nums text-xs">{item.hours}</span>
                    </div>
                  );
                })}
              </div>

              {/* Drive-Thru Note */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C4A16]">
                  <Car className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'معلومات ممر السيارات' : 'Guichet Drive-Thru'}
                  </span>
                </div>
                <p className="text-xs text-[#6B5A50] leading-relaxed">
                  {lang === 'ar'
                    ? 'المسار مفتوح طيلة ساعات العمل. متوسط وقت تسليم الطلب 4 دقائق فقط من لحظة التوقف أمام النافذة.'
                    : 'La voie express Drive-Thru reste ouverte en continu durant toutes nos heures d’ouverture.'}
                </p>
              </div>
            </div>

            {/* Direct Call / Contact Reminder */}
            <div className="pt-6 mt-6 border-t border-[#F2EAE0]">
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2B1810] hover:bg-[#451A03] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-98"
              >
                <Phone className="w-4 h-4 text-[#E0A96D]" />
                <span>{lang === 'ar' ? 'اتصل بالمقهى مباشرة' : 'Contacter l’Équipe du Café'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
