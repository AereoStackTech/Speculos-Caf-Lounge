'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Coffee, Sun, Car, Star, Quote } from 'lucide-react';

export default function AmbianceSection() {
  const { lang } = useLanguage();

  const testimonials = [
    {
      author: 'Amine K.',
      role: 'Daily Commuter on Av. Hassan II',
      roleFr: 'Navetteur quotidien sur l’Av. Hassan II',
      roleAr: 'زبون يومي وموظف بشارع الحسن الثاني',
      comment: 'The drive-thru window saved my morning routine. 4 minutes for a hot flat white and warm pain au chocolat before work.',
      commentFr: 'Le service au volant a transformé mes matins. 4 minutes montre en main pour un excellent flat white et un pain au chocolat chaud avant le bureau.',
      commentAr: 'خدمة السيارات غيرت روتيني الصباحي بالكامل. 4 دقائق فقط لأخذ قهوة فلات وايت ممتازة وبان أو شوكولا ساخن قبل بدء العمل.',
      rating: 5,
    },
    {
      author: 'Salma B.',
      role: 'Student & Remote Worker, Safi',
      roleFr: 'Étudiante & Travail à distance, Safi',
      roleAr: 'طالبة وعمل حر، أسفي',
      comment: 'The calm, warm lighting and specialty V60 pour-over make Speculos my favorite spot to read and focus in Safi.',
      commentFr: 'L’ambiance feutrée, la playlist douce et le café filtre V60 éthiopien en font mon refuge d’étude favori.',
      commentAr: 'الهدوء والإضاءة الدافئة وجودة القهوة المقطرة V60 تجعل من مقهى سبيكولوس مكاني المفضل للدراسة والتركيز في أسفي.',
      rating: 5,
    },
    {
      author: 'Tariq M.',
      role: 'Neighborhood Resident',
      roleFr: 'Résident du quartier',
      roleAr: 'أحد سكان الحي',
      comment: 'Their weekend Beldi breakfast with fresh goat cheese, amlou and mint tea is unbeatable in value and quality.',
      commentFr: 'Leur formule petit-déjeuner beldi avec amlou pur et thé à la menthe le samedi matin est un délice authentique.',
      commentAr: 'فطور الصباح البلدي مع الأملو الطازج والشاي المنعش في نهاية الأسبوع تجربة أصيلة لا تعوض من حيث الجودة والسعر.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#8C4A16] uppercase tracking-wider">
            <span className="w-5 h-[1px] bg-[#8C4A16]" />
            <span>{lang === 'ar' ? 'أجواء المقهى وشهادات الزبائن' : lang === 'fr' ? 'L’Ambiance & Vos Avis' : 'Ambiance & Guest Notes'}</span>
            <span className="w-5 h-[1px] bg-[#8C4A16]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1810] tracking-tight">
            {lang === 'ar' ? 'مكان يرحب بالجميع كل يوم' : lang === 'fr' ? 'Une Atmosphère Pensée pour Vous' : 'An Atmosphere Built Around Comfort'}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5A50]">
            {lang === 'ar'
              ? 'بين سحر الجلسة الداخلية الهادئة وسرعة الخدمة على الطريق الرئيسي'
              : 'Entre sérénité du salon intérieur et efficacité pour les personnes pressées.'}
          </p>
        </div>

        {/* Visual Highlights Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E0D5C7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#92400E]">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2B1810]">
                {lang === 'ar' ? 'بار الإسبريسو والترشيح' : 'Le Barista Brew Bar'}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-1.5 leading-relaxed">
                {lang === 'ar'
                  ? 'آلات إسبريسو إيطالية احترافية ومطاحن موزونة لطحن القهوة طازجة مع كل كوب.'
                  : 'Équipements de pointe, eau filtrée et grains moulus à la demande pour préserver les arômes.'}
              </p>
            </div>
            <div className="pt-2 border-t border-[#F2EAE0] text-[11px] font-mono text-[#8C4A16]">
              100% Extraction Contrôlée
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E0D5C7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#92400E]">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2B1810]">
                {lang === 'ar' ? 'شرفة مشمسة ومقاعد مريحة' : 'Terrasse Ensoleillée & Salon Boisé'}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-1.5 leading-relaxed">
                {lang === 'ar'
                  ? 'إضاءة طبيعية دافئة، مقاعد جلدية وثيراكس مريح للاجتماعات والحديث الهادئ.'
                  : 'Fauteuils confortables, prises électriques accessibles et musique d’ambiance acoustique.'}
              </p>
            </div>
            <div className="pt-2 border-t border-[#F2EAE0] text-[11px] font-mono text-[#8C4A16]">
              Wi-Fi Haut Débit & Climatisation
            </div>
          </div>

          {/* Box 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E0D5C7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#92400E]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2B1810]">
                {lang === 'ar' ? 'ممر السيارات المباشر' : 'Voie Drive-Thru Balisée'}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-1.5 leading-relaxed">
                {lang === 'ar'
                  ? 'مدخل واسع على شارع الحسن الثاني يتيح الدخول والخروج بكل سلاسة دون تعطيل حركة السير.'
                  : 'Voie sécurisée avec affichage du menu en grand format et paiement sans contact rapide.'}
              </p>
            </div>
            <div className="pt-2 border-t border-[#F2EAE0] text-[11px] font-mono text-[#8C4A16]">
              Avenue Hassan II · Safi
            </div>
          </div>
        </div>

        {/* Customer Reviews Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {testimonials.map((t, idx) => {
            const role = lang === 'ar' ? t.roleAr : lang === 'fr' ? t.roleFr : t.role;
            const comment = lang === 'ar' ? t.commentAr : lang === 'fr' ? t.commentFr : t.comment;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F5EFEB] border border-[#E0D5C7] flex flex-col justify-between space-y-4 shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D97706]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D9CFC4]" />
                  <p className="text-xs sm:text-sm text-[#4A3B32] italic leading-relaxed">
                    &ldquo;{comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFD3]">
                  <p className="text-xs font-bold text-[#2B1810]">{t.author}</p>
                  <p className="text-[11px] text-[#7C6E65]">{role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
