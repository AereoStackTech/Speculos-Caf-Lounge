'use client';

import React, { useState } from 'react';
import { MenuItem, TrayItem } from '@/lib/types';
import { useLanguage } from './LanguageContext';
import { X, Plus, Minus, Check, Clock } from 'lucide-react';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToTray: (trayItem: TrayItem) => void;
}

export default function ItemCustomizeModal({ item, onClose, onAddToTray }: ItemCustomizeModalProps) {
  const { lang, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, { label: string; priceDelta: number }>>({});
  const [specialNote, setSpecialNote] = useState('');

  if (!item) return null;

  // Initialize defaults if options exist
  const handleSelectOption = (optionName: string, choice: { label: string; priceDelta: number }) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [optionName]: choice,
    }));
  };

  // Calculate dynamic unit price including options
  const optionsDelta = Object.values(selectedChoices).reduce((sum, c) => sum + (c?.priceDelta || 0), 0);
  const unitPrice = item.price + optionsDelta;
  const lineTotal = unitPrice * quantity;

  const handleConfirm = () => {
    const formattedOptions: Record<string, string> = {};
    Object.entries(selectedChoices).forEach(([k, v]) => {
      formattedOptions[k] = v.label;
    });

    const optionSuffix = Object.values(formattedOptions).join('-') || 'custom';
    const trayItem: TrayItem = {
      id: `${item.id}-${optionSuffix}`,
      menuItemId: item.id,
      name: lang === 'ar' ? item.nameAr : lang === 'fr' ? item.nameFr : item.name,
      price: unitPrice,
      quantity,
      selectedOptions: Object.keys(formattedOptions).length > 0 ? formattedOptions : undefined,
      notes: specialNote.trim() || undefined,
    };

    onAddToTray(trayItem);
    onClose();
  };

  const displayName = lang === 'ar' ? item.nameAr : lang === 'fr' ? item.nameFr : item.name;
  const displayDesc = lang === 'ar' ? item.descriptionAr : lang === 'fr' ? item.descriptionFr : item.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D9CFC4] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Visual Bar */}
        <div className={`p-6 bg-gradient-to-r ${item.imageTheme.bgGradient} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-white/80 uppercase tracking-wider mb-2">
            <span>{item.category.replace('-', ' ')}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
              ~{item.prepTimeMinutes} min
            </span>
          </div>

          <h3 className="text-2xl font-serif font-bold">{displayName}</h3>
          <p className="text-sm text-white/90 mt-1 line-clamp-2">{displayDesc}</p>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Options if available */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-5">
              {item.options.map((opt) => {
                const currentSelection = selectedChoices[opt.name]?.label || opt.choices[0]?.label;
                return (
                  <div key={opt.name} className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#7C6E65]">
                      {opt.name}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {opt.choices.map((choice) => {
                        const isSelected = currentSelection === choice.label;
                        return (
                          <button
                            key={choice.label}
                            type="button"
                            onClick={() => handleSelectOption(opt.name, choice)}
                            className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                              isSelected
                                ? 'bg-[#2B1810] text-[#FAF7F2] border-[#2B1810] shadow-sm'
                                : 'bg-white text-[#2B1810] border-[#E0D5C7] hover:border-[#B45309]'
                            }`}
                          >
                            <span>{choice.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#E0A96D]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7C6E65]">
              {t('specialNotes')}
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Extra hot, cold milk on the side, no sugar..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-[#D9CFC4] bg-white text-[#2B1810] focus:outline-none focus:ring-2 focus:ring-[#78350F]/40"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD3]">
            <span className="text-sm font-semibold text-[#2B1810]">
              {lang === 'ar' ? 'الكمية' : lang === 'fr' ? 'Quantité' : 'Quantity'}
            </span>
            <div className="flex items-center gap-3 bg-white border border-[#D9CFC4] rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2B1810] hover:bg-[#F2EAE0] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#2B1810] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2B1810] hover:bg-[#F2EAE0] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Total & CTA */}
        <div className="p-4 sm:p-6 bg-[#F5EFEB] border-t border-[#E8DFD3] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#7C6E65] block">{t('total')}</span>
            <span className="text-xl sm:text-2xl font-bold font-serif text-[#2B1810] tabular-nums">
              {lineTotal} <span className="text-sm font-sans font-medium text-[#78350F]">{t('mad')}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#2B1810] hover:bg-[#451A03] rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            <span>{lang === 'ar' ? 'إضافة إلى السلة' : lang === 'fr' ? 'Ajouter au Panier' : 'Add to Tray'}</span>
            <span className="tabular-nums">({lineTotal} MAD)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
