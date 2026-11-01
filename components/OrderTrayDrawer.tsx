'use client';

import React, { useState } from 'react';
import { TrayItem, OrderTicket, PickupType } from '@/lib/types';
import { useLanguage } from './LanguageContext';
import { submitQuickOrder } from '@/app/actions/order';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Car,
  ShoppingBag,
  Clock,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  Share2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface OrderTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TrayItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export default function OrderTrayDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
}: OrderTrayDrawerProps) {
  const { lang, t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupType, setPickupType] = useState<PickupType>('takeaway-counter');
  const [pickupTime, setPickupTime] = useState<'asap' | '15mins' | '30mins' | 'specific'>('asap');
  const [carDetails, setCarDetails] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedTicket, setConfirmedTicket] = useState<OrderTicket | null>(null);

  if (!isOpen) return null;

  const totalMad = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage(t('emptyTray'));
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال اسمك' : 'Veuillez saisir votre nom.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Veuillez saisir un numéro de téléphone valide.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitQuickOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        pickupType,
        pickupTime,
        carDetails: pickupType === 'drive-thru' ? carDetails.trim() : undefined,
        specialInstructions: specialInstructions.trim() || undefined,
        items,
        totalMad,
      });

      if (res.success && res.ticket) {
        setConfirmedTicket(res.ticket);
        onClearTray();
      } else {
        setErrorMessage(res.error || 'Erreur lors de la validation.');
      }
    } catch {
      setErrorMessage('Une erreur imprévue est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewOrder = () => {
    setConfirmedTicket(null);
    setCustomerName('');
    setCustomerPhone('');
    setCarDetails('');
    setSpecialInstructions('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#D9CFC4] shadow-2xl flex flex-col justify-between">
          {/* Drawer Top Bar */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E8DFD3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] flex items-center justify-center text-[#78350F]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#2B1810]">
                  {confirmedTicket ? t('orderSuccessTitle') : t('quickTray')}
                </h3>
                <span className="text-[11px] text-[#7C6E65]">
                  {confirmedTicket ? `#${confirmedTicket.ticketId}` : `${items.length} ${t('itemsCount')}`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#EAE1D5] flex items-center justify-center text-[#5C4D44] transition-colors"
              aria-label="Close tray drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {confirmedTicket ? (
              /* --- CONFIRMED ORDER TICKET VIEW --- */
              <div className="space-y-6 animate-in zoom-in-95 duration-200">
                <div className="p-5 rounded-2xl bg-white border-2 border-[#15803D]/30 shadow-md text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#15803D] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-medium text-[#78350F] uppercase tracking-wider">
                      Ticket N°
                    </span>
                    <h4 className="text-2xl font-mono font-bold text-[#2B1810] tracking-wider mt-0.5">
                      #{confirmedTicket.ticketId}
                    </h4>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] flex items-center justify-between text-xs">
                    <span className="text-[#6B5A50]">{t('orderReadyIn')}:</span>
                    <span className="font-bold text-[#15803D] text-sm tabular-nums flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{confirmedTicket.estimatedReadyMinutes} {t('minutes')}
                    </span>
                  </div>

                  <div className="text-left text-xs space-y-1.5 pt-2 border-t border-[#F2EAE0]">
                    <p className="text-[#6B5A50]">
                      <strong className="text-[#2B1810]">{t('customerName')}:</strong> {confirmedTicket.customerName}
                    </p>
                    <p className="text-[#6B5A50]">
                      <strong className="text-[#2B1810]">{t('pickupOptions')}:</strong>{' '}
                      {confirmedTicket.pickupType === 'drive-thru' ? '🚗 Drive-Thru Express' : '🚶 Retrait au Comptoir'}
                    </p>
                    {confirmedTicket.carDetails && (
                      <p className="text-[#6B5A50]">
                        <strong className="text-[#2B1810]">Véhicule:</strong> {confirmedTicket.carDetails}
                      </p>
                    )}
                  </div>

                  {/* Itemized summary */}
                  <div className="pt-3 border-t border-[#F2EAE0] text-left">
                    <p className="text-[11px] font-semibold text-[#8A796F] uppercase tracking-wider mb-2">
                      Articles Commandés
                    </p>
                    <div className="space-y-1 text-xs">
                      {confirmedTicket.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-[#2B1810]">
                          <span>
                            {it.quantity}x {it.name}
                          </span>
                          <span className="font-mono tabular-nums">{it.lineTotal} MAD</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 mt-2 border-t border-[#E8DFD3] flex justify-between font-bold text-sm text-[#2B1810]">
                      <span>Total</span>
                      <span className="font-mono tabular-nums">{confirmedTicket.totalMad} MAD</span>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Bridge Action Button */}
                <div className="space-y-2">
                  <a
                    href={confirmedTicket.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('orderViaWhatsApp')}</span>
                  </a>
                  <p className="text-[11px] text-center text-[#7C6E65]">
                    {lang === 'ar'
                      ? 'ينقلك مباشرة لمحادثة واتساب المقهى مع ملخص الطلب جاهزاً للإرسال.'
                      : 'Ouvre directement une discussion WhatsApp pré-remplie avec notre équipe.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartNewOrder}
                  className="w-full py-2.5 text-xs text-[#78350F] hover:text-[#2B1810] font-semibold underline underline-offset-4"
                >
                  {lang === 'ar' ? 'بدء طلب جديد' : 'Passer une nouvelle commande'}
                </button>
              </div>
            ) : items.length === 0 ? (
              /* --- EMPTY STATE --- */
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF0E6] text-[#A8988B] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#2B1810]">
                  {t('emptyTray')}
                </h4>
                <p className="text-xs text-[#7C6E65] max-w-xs mx-auto">
                  {t('addItemsHint')}
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-[#2B1810] bg-white border border-[#D9CFC4] rounded-lg hover:bg-[#FAF7F2]"
                >
                  {t('exploreMenu')}
                </button>
              </div>
            ) : (
              /* --- ACTIVE ORDER FORM --- */
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7C6E65]">
                      {lang === 'ar' ? 'العناصر المختارة' : 'Vos Sélections'}
                    </span>
                    <button
                      type="button"
                      onClick={onClearTray}
                      className="text-xs text-[#B45309] hover:underline"
                    >
                      {lang === 'ar' ? 'إفراغ السلة' : 'Vider'}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {items.map((it) => (
                      <div
                        key={it.id}
                        className="p-3 bg-white rounded-xl border border-[#E0D5C7] flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#2B1810] truncate">{it.name}</p>
                          {it.selectedOptions && (
                            <p className="text-[10px] text-[#78350F] truncate">
                              {Object.values(it.selectedOptions).join(', ')}
                            </p>
                          )}
                          <p className="text-xs font-mono font-semibold text-[#78350F] tabular-nums mt-0.5">
                            {it.price * it.quantity} MAD
                          </p>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E0D5C7] rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(it.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-[#2B1810] hover:bg-white rounded"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#2B1810] tabular-nums">
                            {it.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(it.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#2B1810] hover:bg-white rounded"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(it.id)}
                          className="text-[#998A7F] hover:text-[#DC2626] p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pickup Method Selection (Segmented Control) */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7C6E65]">
                    {t('pickupOptions')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPickupType('takeaway-counter')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                        pickupType === 'takeaway-counter'
                          ? 'bg-[#2B1810] text-white border-[#2B1810] shadow-sm'
                          : 'bg-white text-[#5C4D44] border-[#E0D5C7] hover:border-[#78350F]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('takeawayCounter')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPickupType('drive-thru')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                        pickupType === 'drive-thru'
                          ? 'bg-[#2B1810] text-white border-[#2B1810] shadow-sm'
                          : 'bg-white text-[#5C4D44] border-[#E0D5C7] hover:border-[#78350F]'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      <span>{t('driveThruWindow')}</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#5C4D44] block mb-1">
                      {t('customerName')} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A70]" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="ex. Youssef El Alami"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-xl text-[#2B1810] focus:outline-none focus:ring-2 focus:ring-[#78350F]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5C4D44] block mb-1">
                      {t('customerPhone')} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A70]" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="06 61 23 45 67"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-xl text-[#2B1810] focus:outline-none focus:ring-2 focus:ring-[#78350F]/40"
                      />
                    </div>
                  </div>

                  {pickupType === 'drive-thru' && (
                    <div className="animate-in fade-in duration-200">
                      <label className="text-xs font-semibold text-[#5C4D44] block mb-1">
                        {t('carPlate')}
                      </label>
                      <input
                        type="text"
                        value={carDetails}
                        onChange={(e) => setCarDetails(e.target.value)}
                        placeholder="ex. Clio Blanche / 1234-A-26"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-xl text-[#2B1810] focus:outline-none focus:ring-2 focus:ring-[#78350F]/40"
                      />
                    </div>
                  )}

                  {/* Pickup Timing */}
                  <div>
                    <label className="text-xs font-semibold text-[#5C4D44] block mb-1">
                      {t('pickupTime')}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['asap', '15mins', '30mins'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setPickupTime(mode)}
                          className={`py-1.5 px-2 text-[11px] font-medium rounded-lg border transition-all ${
                            pickupTime === mode
                              ? 'bg-[#2B1810] text-white border-[#2B1810]'
                              : 'bg-white text-[#5C4D44] border-[#E0D5C7]'
                          }`}
                        >
                          {mode === 'asap' ? t('asap') : mode === '15mins' ? t('in15m') : t('in30m')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5C4D44] block mb-1">
                      {t('specialNotes')}
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={2}
                      placeholder="Précisions de préparation..."
                      className="w-full p-2.5 text-xs bg-white border border-[#D9CFC4] rounded-xl text-[#2B1810] focus:outline-none focus:ring-2 focus:ring-[#78350F]/40"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#2B1810] hover:bg-[#451A03] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Traitement en cours...</span>
                  ) : (
                    <>
                      <span>{t('confirmOrder')}</span>
                      <span className="font-mono tabular-nums">({totalMad} MAD)</span>
                      <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Drawer Subtotal Bar (When open and not confirmed) */}
          {!confirmedTicket && items.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E8DFD3] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#7C6E65] block">{t('total')}</span>
                <span className="text-lg font-bold font-serif text-[#2B1810] tabular-nums">
                  {totalMad} <span className="text-xs font-sans font-medium text-[#78350F]">{t('mad')}</span>
                </span>
              </div>
              <span className="text-xs text-[#15803D] font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Paiement sur place à la remise
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
