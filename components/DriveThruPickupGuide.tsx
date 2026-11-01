'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Car, Smartphone, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';
import { CAFE_INFO } from '@/data/menu';

interface DriveThruPickupGuideProps {
  onStartOrder: () => void;
}

export default function DriveThruPickupGuide({ onStartOrder }: DriveThruPickupGuideProps) {
  const { lang, t } = useLanguage();

  return (
    <section id="drive-thru" className="py-16 md:py-24 bg-[#2B1810] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E0A96D] uppercase tracking-wider">
              <span className="w-5 h-[1px] bg-[#E0A96D]" />
              <span>{lang === 'ar' ? 'خدمة السيارات والاستلام السريع' : lang === 'en' ? 'Express Lane & Pickup' : 'Drive-Thru & Retrait Express'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              {lang === 'ar'
                ? 'قهوتك وفطورك الصباحي في دقائق معدودة دون مغادرة سيارتك'
                : lang === 'en'
                ? 'Your Morning Coffee & Pastries in Under 5 Minutes'
                : 'Votre Pause Café Express sans Descendre de Voiture'}
            </h2>

            <p className="text-sm sm:text-base text-[#D6C7B7] leading-relaxed">
              {lang === 'ar'
                ? 'لتسهيل يومكم على شارع الحسن الثاني الحيوي بأسفي، جهزنا مساراً مخصصاً لخدمة السيارات (Drive-Thru). اطلب مسبقاً عبر موقعنا، وحدد وقت وصولك، واستلم طلبك طازجاً وساخناً فور وصولك إلى النافذة المخصصة.'
                : lang === 'en'
                ? 'Designed for Safi commuters and morning rituals on Avenue Hassan II. Place your pre-order online, grab your digital ticket or ping via WhatsApp, and breeze through our dedicated drive-thru window or walk-in pickup counter.'
                : 'Pour les matins pressés ou les trajets quotidiens sur l’Avenue Hassan II, profitez de notre voie Drive-Thru dédiée. Commandez en ligne en 2 clics, obtenez votre ticket digital et récupérez vos boissons chaudes et viennoiseries sans attente.'}
            </p>

            {/* Quick Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E0A96D] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#EAE1D5]">
                  <strong className="text-white">
                    {lang === 'ar' ? 'مسار مباشر وواضح:' : 'Accès direct & fluide :'}
                  </strong>{' '}
                  {lang === 'ar'
                    ? 'مدخل مخصص بإشارات واضحة على شارع الحسن الثاني مع موقف انتظار سريع.'
                    : 'Entrée dédiée sur l’Avenue Hassan II avec balisage lumineux et file réservée.'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E0A96D] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#EAE1D5]">
                  <strong className="text-white">
                    {lang === 'ar' ? 'تحضير مسبق فوري:' : 'Préparation à la minute :'}
                  </strong>{' '}
                  {lang === 'ar'
                    ? 'الطلب يجهز فوراً ليكون بأقصى درجات السخونة والجودة لحظة وصولك.'
                    : 'Votre espresso et viennoiseries emballés dans des sacs isothermes hermétiques.'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E0A96D] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#EAE1D5]">
                  <strong className="text-white">
                    {lang === 'ar' ? 'إرسال بنقرة واحدة عبر واتساب:' : 'Pont WhatsApp direct :'}
                  </strong>{' '}
                  {lang === 'ar'
                    ? 'إمكانية إرسال تفاصيل طلبك مباشرة لباريستا المقهى لضمان سرعة الخدمة.'
                    : 'Envoi instantané du récapitulatif directement à notre équipe pour confirmation immédiate.'}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onStartOrder}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#2B1810] bg-[#E0A96D] hover:bg-[#F0B87E] rounded-xl transition-all shadow-md active:scale-95"
              >
                <Car className="w-4 h-4" />
                <span>{lang === 'ar' ? 'ابدأ طلبك للسيارة الآن' : 'Préparer ma commande Drive'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: 3-Step Interactive Process Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-[#3A2218] border border-[#523023] flex items-start gap-4 hover:border-[#E0A96D]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#2B1810] text-[#E0A96D] flex items-center justify-center font-bold text-sm shrink-0 border border-[#E0A96D]/30">
                01
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E0A96D]">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اختر طلبك أونلاين' : 'Composez en ligne'}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  {lang === 'ar' ? 'تصفح القائمة واختر مشروباتك' : 'Sélectionnez vos boissons & viennoiseries'}
                </h4>
                <p className="text-xs text-[#C5B5A5] leading-relaxed">
                  {lang === 'ar'
                    ? 'حدد نوع الحليب، درجة الحلاوة، والمشروبات الباردة أو الساخنة وأضفها لسلة الاستلام.'
                    : 'Personnalisez vos options (lait végétal, température, douceurs) dans le panier express.'}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-[#3A2218] border border-[#523023] flex items-start gap-4 hover:border-[#E0A96D]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#2B1810] text-[#E0A96D] flex items-center justify-center font-bold text-sm shrink-0 border border-[#E0A96D]/30">
                02
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E0A96D]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'احصل على التذكرة الرقمية' : 'Ticket Digital Instantané'}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  {lang === 'ar' ? 'تأكيد فوري وتوقيت جاهزية دقيق' : 'Temps de préparation estimé (4-8 min)'}
                </h4>
                <p className="text-xs text-[#C5B5A5] leading-relaxed">
                  {lang === 'ar'
                    ? 'يصدر النظام رقم تذكرة فوري مع إمكانية إرسالها بنقرة واحدة عبر واتساب.'
                    : 'Visualisez l’heure exacte où votre plateau sera prêt au comptoir ou au guichet.'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-[#3A2218] border border-[#523023] flex items-start gap-4 hover:border-[#E0A96D]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#2B1810] text-[#E0A96D] flex items-center justify-center font-bold text-sm shrink-0 border border-[#E0A96D]/30">
                03
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E0A96D]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الاستلام من شارع الحسن الثاني' : 'Retrait Avenue Hassan II'}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  {lang === 'ar' ? 'مرور سريع واستلام دافئ' : 'Passez au guichet Drive ou Comptoir'}
                </h4>
                <p className="text-xs text-[#C5B5A5] leading-relaxed">
                  {lang === 'ar'
                    ? 'أعطِ رقم التذكرة للباريستا واستلم طلبك بابتسامة دون أي انتظار مطول.'
                    : 'Présentez simplement votre numéro de ticket pour récupérer votre commande prête à déguster.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
