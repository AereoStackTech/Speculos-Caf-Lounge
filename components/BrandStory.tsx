'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Coffee, Flame, HeartHandshake, CarFront } from 'lucide-react';

export default function BrandStory() {
  const { lang, t } = useLanguage();

  return (
    <section id="story" className="py-16 md:py-24 bg-[#F5EFEB] border-y border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Editorial Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C4A16] uppercase tracking-wider">
              <span className="w-6 h-[1px] bg-[#8C4A16]" />
              <span>{lang === 'ar' ? 'قصة المقهى' : lang === 'en' ? 'Our Heritage' : 'Notre Histoire'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2B1810] tracking-tight leading-snug">
              {lang === 'ar'
                ? 'نبض القهوة والمواعيد الصباحية في قلب أسفي'
                : lang === 'en'
                ? 'The Pulse of Avenue Hassan II, Crafted Cup by Cup'
                : 'Le Rendez-vous des Amoureux du Bon Café à Safi'}
            </h2>

            <p className="text-base text-[#5C4D44] leading-relaxed">
              {lang === 'ar'
                ? 'ولد مقهى "سبيكولوس" من شغف حقيقي بالقهوة العالية الجودة وحب لمدينة أسفي الساحلية العريقة. اخترنا موقعاً استراتيجياً في شارع الحسن الثاني، الشريان الأكثر حيوية ونبضاً بالمدينة، لنقدم لروادنا ملاذاً دافئاً يبدأ منه يومهم بنشاط وسرور.'
                : lang === 'en'
                ? 'Born from a genuine passion for specialty grade beans and a deep attachment to the coastal charm of Safi, Speculos Café & Lounge is located on Avenue Hassan II. We designed an inviting sanctuary where morning commuters, neighborhood residents, and students come together.'
                : 'Né d’une passion sincère pour les grains de spécialité et l’art de vivre safiot, Speculos Café & Lounge a pris racine sur l’Avenue Hassan II. Notre volonté : offrir un espace chaleureux et raffiné où les résidents du quartier, les professionnels et les voyageurs de passage savourent une pause réconfortante.'}
            </p>

            <p className="text-base text-[#5C4D44] leading-relaxed">
              {lang === 'ar'
                ? 'سواء كنت ترغب في الجلوس في بهونا المريح والتمتع برائحة القهوة الطازجة، أو كنت في عجلة من أمرك للمرور عبر مسار السيارات (Drive-Thru) لأخذ قهوتك الصباحية وكرواسونك المقرمش، نحرص دائماً على تقديم نفس معايير الجودة والضيافة المغربية الأصيلة.'
                : lang === 'en'
                ? 'Whether you take a seat in our sunlit lounge to unwind over a velvety flat white, or glide through our dedicated drive-thru window on your morning commute, every detail is crafted with care, speed, and generous Moroccan hospitality.'
                : 'Que vous choisissiez de vous installer dans notre salon boisé pour déguster un flat white parfaitement extrait, ou de récupérer votre formule matinale en quelques minutes grâce à notre guichet Drive-Thru fluide, l’excellence et l’accueil chaleureux sont au rendez-vous.'}
            </p>

            {/* Quiet metrics row */}
            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#E0D5C7]">
              <div>
                <p className="text-2xl font-serif font-bold text-[#2B1810] tabular-nums">06h30</p>
                <p className="text-xs text-[#7C6E65] mt-1">Première fournée chaude</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#2B1810] tabular-nums">100%</p>
                <p className="text-xs text-[#7C6E65] mt-1">Arabica de spécialité</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#2B1810] tabular-nums">4 min</p>
                <p className="text-xs text-[#7C6E65] mt-1">Service Drive moyen</p>
              </div>
            </div>
          </div>

          {/* Right: Three Pillars Bento Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E0D5C7] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#92400E] mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2B1810]">
                {lang === 'ar' ? 'قهوة مختصة مستدامة' : lang === 'en' ? 'Specialty Roasts' : 'Cafés d’Origine'}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'حبوب إثيوبية وبرازيلية وكولومبية منتقاة بعناية ومحمصة للحفاظ على المذاق الفاكهي والكراميلي الطبيعي.'
                  : lang === 'en'
                  ? 'Single-origin Ethiopian and Colombian beans precisely profiled to extract balanced chocolate, floral, and nutty notes.'
                  : 'Grains d’exception fraîchement moulus à chaque tasse. Extraction sous contrôle précis de pression et température.'}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E0D5C7] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#92400E] mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2B1810]">
                {lang === 'ar' ? 'معجنات الصباح الطازجة' : lang === 'en' ? 'Artisan Bakery' : 'Boulangerie du Matin'}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'كرواسون مورق بالزبدة الفاخرة وبان أو شوكولا يخبز يومياً في ساعات الفجر الأولى لتتناوله ساخناً.'
                  : lang === 'en'
                  ? 'Golden, flaky butter croissants, pain au chocolat, and traditional Moroccan morning breads prepared fresh daily at dawn.'
                  : 'Feuilletage croustillant pur beurre AOP, cuit sur place dès l’aube pour accompagner votre premier espresso.'}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E0D5C7] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#92400E] mb-4">
                <CarFront className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2B1810]">
                {lang === 'ar' ? 'خدمة السيارات السريعة' : lang === 'en' ? 'Drive-Thru Express' : 'Voie Drive Dédiée'}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'وفر وقتك الثمين في طريقك إلى العمل أو الدراسة مع نافذة خدمة السيارات السريعة على شارع الحسن الثاني.'
                  : lang === 'en'
                  ? 'Direct street access from Avenue Hassan II with a dedicated lane, ensuring minimal wait times for commuters.'
                  : 'Commandez depuis votre véhicule sur l’Avenue Hassan II et repartez avec votre commande chaude en moins de 5 minutes.'}
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-[#2B1810] text-[#FAF7F2] border border-[#3E2317] shadow-sm flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#451A03] flex items-center justify-center text-[#E0A96D] mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#FAF7F2]">
                  {lang === 'ar' ? 'ضيافة مغربية أصيلة' : lang === 'en' ? 'Warm Hospitality' : 'Accueil Convivial'}
                </h3>
                <p className="text-xs text-[#C5B5A5] mt-2 leading-relaxed">
                  {lang === 'ar'
                    ? 'فريق شغوف ومرحب يسعد بخدمتكم كل يوم من السادسة والنصف صباحاً حتى منتصف الليل.'
                    : lang === 'en'
                    ? 'A dedicated team passionate about barista craftsmanship and greeting you with a smile every single morning.'
                    : 'Une équipe passionnée qui vous accueille chaque jour avec le sourire et le souci constant de votre bien-être.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#451A03] text-[11px] text-[#E0A96D]">
                Avenue Hassan II · Safi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
