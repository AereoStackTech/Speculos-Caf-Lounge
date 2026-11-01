'use client';

import React from 'react';
import { useLanguage, Language } from './LanguageContext';
import { ShoppingBag, Phone } from 'lucide-react';

interface NavbarProps {
  trayItemCount: number;
  onOpenTray: () => void;
}

export default function Navbar({ trayItemCount, onOpenTray }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#2B1810] hover:text-[#78350F] transition-colors whitespace-nowrap shrink-0"
        >
          Speculos <span className="font-light italic text-[#B45309]">Café</span>
        </a>

        {/* Zone 2: 4-5 single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4D44] whitespace-nowrap">
          <a
            href="#story"
            className="hover:text-[#2B1810] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            {t('story')}
          </a>
          <a
            href="#menu"
            className="hover:text-[#2B1810] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            {t('menu')}
          </a>
          <a
            href="#drive-thru"
            className="hover:text-[#2B1810] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            {t('driveThru')}
          </a>
          <a
            href="#location"
            className="hover:text-[#2B1810] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            {t('location')}
          </a>
        </nav>

        {/* Zone 3: 1 primary action + subtle utility controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Minimal Language Switcher */}
          <div className="flex items-center text-xs font-medium text-[#7C6E65] border border-[#E0D5C7] rounded-md overflow-hidden bg-[#F5EFEB]">
            {(['fr', 'ar', 'en'] as Language[]).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2 py-1 transition-colors uppercase ${
                  lang === code
                    ? 'bg-[#2B1810] text-[#FAF7F2] font-semibold'
                    : 'hover:text-[#2B1810] hover:bg-[#EAE1D5]'
                }`}
                aria-label={`Switch to ${code}`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Quick Call icon for instant mobile tap */}
          <a
            href="tel:+212524628890"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-md border border-[#E0D5C7] text-[#2B1810] hover:bg-[#F2EAE0] transition-colors"
            title={t('callUs')}
            aria-label="Call cafe"
          >
            <Phone className="w-4 h-4 text-[#78350F]" />
          </a>

          {/* Primary Action Button (Order Tray trigger) */}
          <button
            onClick={onOpenTray}
            className="relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#2B1810] hover:bg-[#451A03] rounded-lg transition-all shadow-sm active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#E0A96D]" />
            <span>{t('orderPickup')}</span>
            {trayItemCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold text-[#2B1810] bg-[#E0A96D] rounded-full tabular-nums">
                {trayItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
