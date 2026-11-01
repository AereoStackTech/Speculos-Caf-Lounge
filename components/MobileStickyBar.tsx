'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Coffee, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { CAFE_INFO } from '@/data/menu';

interface MobileStickyBarProps {
  trayItemCount: number;
  totalMad: number;
  onOpenTray: () => void;
}

export default function MobileStickyBar({ trayItemCount, totalMad, onOpenTray }: MobileStickyBarProps) {
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E0D5C7] shadow-lg px-3 py-2">
      <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto h-12">
        {/* Tab 1: Menu */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center min-h-[44px] text-[#5C4D44] hover:text-[#2B1810] transition-colors"
        >
          <Coffee className="w-4 h-4 text-[#78350F]" />
          <span className="text-[10px] font-medium mt-0.5">{t('menu')}</span>
        </a>

        {/* Tab 2: Call */}
        <a
          href={`tel:${CAFE_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center min-h-[44px] text-[#5C4D44] hover:text-[#2B1810] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#78350F]" />
          <span className="text-[10px] font-medium mt-0.5">{t('callUs')}</span>
        </a>

        {/* Tab 3: Location */}
        <a
          href="#location"
          className="flex flex-col items-center justify-center min-h-[44px] text-[#5C4D44] hover:text-[#2B1810] transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#78350F]" />
          <span className="text-[10px] font-medium mt-0.5">{t('location')}</span>
        </a>

        {/* Tab 4: Tray & Quick Order */}
        <button
          type="button"
          onClick={onOpenTray}
          className="relative flex flex-col items-center justify-center min-h-[44px] text-[#2B1810] hover:text-[#451A03] font-semibold transition-colors"
          aria-label="Open tray"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#2B1810]" />
            {trayItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9px] font-bold text-white bg-[#B45309] rounded-full tabular-nums">
                {trayItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-[#2B1810] tabular-nums">
            {trayItemCount > 0 ? `${totalMad} MAD` : t('quickTray')}
          </span>
        </button>
      </div>
    </div>
  );
}
