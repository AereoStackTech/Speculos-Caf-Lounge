'use client';

import React, { useMemo } from 'react';
import { useLanguage } from './LanguageContext';
import { Coffee, Car, Clock, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { CAFE_INFO } from '@/data/menu';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenTray: () => void;
}

export default function Hero({ onExploreMenu, onOpenTray }: HeroProps) {
  const { lang, t } = useLanguage();

  // Dynamic status based on real Moroccan business hours (06:30 to 23:30)
  const cafeStatus = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMin;

    const openMinutes = 6 * 60 + 30; // 06:30
    const closeMinutes = 23 * 60 + 30; // 23:30

    const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;
    return {
      isOpen,
      label: isOpen ? `${t('openNow')} · ${t('closesAt')} 23:30` : `${t('closedNow')} · ${t('opensAt')} 06:30`,
    };
  }, [t]);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2]">
      {/* Subtle organic coffee bean watermark background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#2B1810_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#7C6E65] tracking-wide">
              <span className="flex items-center gap-1.5 text-[#78350F]">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                {CAFE_INFO.street}
              </span>
              <span aria-hidden="true" className="text-[#C4B7AA]">·</span>
              <span className="font-semibold text-[#2B1810]">{cafeStatus.label}</span>
              <span aria-hidden="true" className="text-[#C4B7AA]">·</span>
              <span>{t('servicePills')}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2B1810] leading-[1.15] tracking-tight [text-wrap:balance]">
              {t('heroHeadline1')}{' '}
              <span className="italic font-light text-[#B45309] block sm:inline">
                {t('heroHeadline2')}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#5C4D44] max-w-2xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs & Drive-Thru Quick Indicator */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2B1810] hover:bg-[#451A03] rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                <Coffee className="w-4 h-4 text-[#E0A96D]" />
                <span>{t('exploreMenu')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTray}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2B1810] bg-white hover:bg-[#F2EAE0] border border-[#D9CFC4] rounded-xl transition-all shadow-sm active:scale-[0.98]"
              >
                <Car className="w-4 h-4 text-[#B45309]" />
                <span>{t('preOrderPickup')}</span>
              </button>
            </div>

            {/* Triple Feature Strip */}
            <div className="pt-4 border-t border-[#E8DFD3] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A796F] font-medium">Torréfaction</p>
                <p className="text-sm font-semibold text-[#2B1810] mt-0.5">100% Arabica</p>
                <p className="text-xs text-[#7C6E65]">Grains sélectionnés</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A796F] font-medium">Boulangerie</p>
                <p className="text-sm font-semibold text-[#2B1810] mt-0.5">Fournée 06h00</p>
                <p className="text-xs text-[#7C6E65]">Pur beurre AOP</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A796F] font-medium">Voie Rapide</p>
                <p className="text-sm font-semibold text-[#2B1810] mt-0.5">Drive Express</p>
                <p className="text-xs text-[#7C6E65]">4 min chrono</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Atmosphere Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D9CFC4] bg-[#2B1810] shadow-xl">
              {/* Coffee Atmosphere Visual Card */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                {/* Visual backdrop with warm coffee lighting and CSS artistry */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#451A03] via-[#2B1810] to-[#170E0A] flex flex-col justify-between p-6">
                  {/* Top Bar inside showcase */}
                  <div className="flex items-center justify-between text-white/90">
                    <span className="text-xs font-mono tracking-wider uppercase text-[#E0A96D] bg-[#2B1810]/70 px-2.5 py-1 rounded-md border border-[#E0A96D]/30 backdrop-blur-sm">
                      Avenue Hassan II · Safi
                    </span>
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
                      06:30 — 23:30
                    </span>
                  </div>

                  {/* Central Artistic Coffee Cup & Steam Motif */}
                  <div className="my-auto text-center py-6">
                    <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-[#B45309] to-[#E0A96D] p-1 shadow-2xl flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#2B1810] flex items-center justify-center">
                        <Coffee className="w-10 h-10 text-[#E0A96D] animate-pulse" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-serif font-bold text-white tracking-wide">
                      Speculos Biscoff & Espresso
                    </h3>
                    <p className="text-xs text-[#D6C7B7] mt-1 max-w-xs mx-auto">
                      Signature blend extracted fresh every morning with velvety micro-foam
                    </p>
                  </div>

                  {/* Bottom Strip: Drive-Thru Highlight */}
                  <div className="bg-[#1F120B]/90 backdrop-blur-md rounded-xl p-3 border border-[#E0A96D]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E0A96D]/20 flex items-center justify-center text-[#E0A96D]">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Guichet Drive-Thru Ouvert</p>
                        <p className="text-[11px] text-[#A8988B]">Accès direct sur Avenue Hassan II</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#E0A96D] tabular-nums">
                      4-6 min
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption Bar under media */}
              <div className="p-4 bg-[#23140D] border-t border-[#3B2217] flex items-center justify-between text-xs text-[#C5B5A5]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
                  Fraîcheur garantie · Viennoiseries artisanales
                </span>
                <span className="text-[#E0A96D] font-medium">Safi, Maroc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
