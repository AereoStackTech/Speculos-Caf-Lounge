'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    brandSubtitle: 'Café de Spécialité & Lounge',
    home: 'Accueil',
    story: 'L’Histoire',
    menu: 'Carte & Menu',
    driveThru: 'Drive-Thru',
    location: 'Accès & Horaires',
    orderPickup: 'Commander à Emporter',
    orderDriveThru: 'Commander au Drive',
    openNow: 'Ouvert Actuellement',
    closedNow: 'Fermé Actuellement',
    closesAt: 'Ferme à',
    opensAt: 'Ouvre à',
    avenueHassanII: 'Avenue Hassan II, Safi',
    servicePills: 'Sur Place · Drive-Thru Express · À Emporter',
    heroHeadline1: 'L’Art de la Pause Café',
    heroHeadline2: 'sur l’Avenue Hassan II',
    heroSubtitle: 'Cafés torréfiés d’exception, viennoiseries dorées du matin, et formule petit-déjeuner artisanale. Dégustez dans une ambiance chaleureuse ou passez par notre voie Drive-Thru rapide.',
    exploreMenu: 'Découvrir la Carte',
    preOrderPickup: 'Pré-commander pour Retrait',
    quickTray: 'Panier Express',
    itemsCount: 'articles',
    emptyTray: 'Votre panier express est vide.',
    addItemsHint: 'Sélectionnez vos boissons et gourmandises favorites.',
    total: 'Total',
    mad: 'MAD',
    pickupOptions: 'Mode de Retrait',
    takeawayCounter: 'Comptoir Express (À pied)',
    driveThruWindow: 'Voie Drive-Thru (En voiture)',
    customerName: 'Votre Nom complet',
    customerPhone: 'N° de Téléphone (ex. 06...)',
    carPlate: 'Modèle ou Immatriculation (Optionnel pour Drive)',
    pickupTime: 'Moment du Retrait',
    asap: 'Immédiat (Dès que possible)',
    in15m: 'Dans 15 minutes',
    in30m: 'Dans 30 minutes',
    specialNotes: 'Instructions spéciales / Allégies...',
    confirmOrder: 'Valider ma Pré-commande',
    orderSuccessTitle: 'Commande Confirmée !',
    orderReadyIn: 'Temps estimé de préparation',
    minutes: 'min',
    orderViaWhatsApp: 'Envoyer directement sur WhatsApp',
    disclaimerTitle: 'Projet Portfolio Indépendant',
    disclaimerText: 'Ce site web est un concept de portfolio indépendant inspiré par le contexte commercial visible d’un café de quartier sur l’Avenue Hassan II à Safi, Maroc. Il n’est pas affilié, commandité ni approuvé par l’établissement réel.',
    callUs: 'Appeler le Café',
    getDirections: 'Itinéraire GPS',
  },
  en: {
    brandSubtitle: 'Specialty Coffee & Lounge',
    home: 'Home',
    story: 'Our Story',
    menu: 'Menu',
    driveThru: 'Drive-Thru',
    location: 'Location & Hours',
    orderPickup: 'Order for Pickup',
    orderDriveThru: 'Order Drive-Thru',
    openNow: 'Open Now',
    closedNow: 'Currently Closed',
    closesAt: 'Closes at',
    opensAt: 'Opens at',
    avenueHassanII: 'Avenue Hassan II, Safi',
    servicePills: 'Dine-In · Express Drive-Thru · Takeaway Pickup',
    heroHeadline1: 'The Morning Ritual & Artisan Roasts',
    heroHeadline2: 'on Avenue Hassan II',
    heroSubtitle: 'Specialty coffee brewed with passion, freshly baked morning pastries, and wholesome Moroccan breakfast combos. Enjoy our cozy lounge ambiance or pick up at our express drive-thru window.',
    exploreMenu: 'Explore the Menu',
    preOrderPickup: 'Pre-Order for Pickup',
    quickTray: 'Pickup Tray',
    itemsCount: 'items',
    emptyTray: 'Your pickup tray is empty.',
    addItemsHint: 'Browse our menu to select your favorite beverages and pastries.',
    total: 'Total',
    mad: 'MAD',
    pickupOptions: 'Pickup Method',
    takeawayCounter: 'Express Counter (Walk-in)',
    driveThruWindow: 'Drive-Thru Lane (In-car)',
    customerName: 'Full Name',
    customerPhone: 'Phone Number (e.g., 06...)',
    carPlate: 'Vehicle Make or Plate (Optional for Drive-Thru)',
    pickupTime: 'Pickup Timing',
    asap: 'ASAP (Immediate Preparation)',
    in15m: 'In 15 minutes',
    in30m: 'In 30 minutes',
    specialNotes: 'Special Instructions / Dietary requests...',
    confirmOrder: 'Confirm Pre-Order',
    orderSuccessTitle: 'Order Confirmed!',
    orderReadyIn: 'Estimated prep time',
    minutes: 'min',
    orderViaWhatsApp: 'Send directly via WhatsApp',
    disclaimerTitle: 'Independent Portfolio Concept',
    disclaimerText: 'This website is an independent portfolio concept inspired by publicly visible business context for a neighborhood café located on Avenue Hassan II in Safi, Morocco. It is not affiliated with, commissioned by, or endorsed by the referenced business.',
    callUs: 'Call Café',
    getDirections: 'Get Directions',
  },
  ar: {
    brandSubtitle: 'مقهى القهوة المختصة والراحة',
    home: 'الرئيسية',
    story: 'قصتنا',
    menu: 'قائمة الطعام',
    driveThru: 'خدمة السيارات',
    location: 'الموقع وساعات العمل',
    orderPickup: 'طلب الاستلام السريع',
    orderDriveThru: 'طلب عبر السيارة',
    openNow: 'مفتوح الآن',
    closedNow: 'مغلق حالياً',
    closesAt: 'يغلق عند',
    opensAt: 'يفتح عند',
    avenueHassanII: 'شارع الحسن الثاني، أسفي',
    servicePills: 'تناول في المكان · خدمة السيارات · استلام سريع',
    heroHeadline1: 'تجربة القهوة المختصة الأصيلة',
    heroHeadline2: 'في قلب شارع الحسن الثاني بأسفي',
    heroSubtitle: 'نقدم لكم أجود أنواع حبوب البن المختصة المحمصة بعناية، معجنات الصباح الطازجة، ووجبات الإفطار المغربية. تفضلوا بزيارتنا في أجوائنا الدافئة أو اطلبوا عبر نافذة السيارات السريعة.',
    exploreMenu: 'استكشف القائمة',
    preOrderPickup: 'اطلب للاستلام السريع',
    quickTray: 'سلة الطلبات',
    itemsCount: 'عناصر',
    emptyTray: 'سلة الاستلام فارغة.',
    addItemsHint: 'تصفح القائمة لاختيار قهوتك المفضلة ومعجنات الصباح.',
    total: 'المجموع',
    mad: 'درهم',
    pickupOptions: 'طريقة الاستلام',
    takeawayCounter: 'من مكتب الاستلام السريع',
    driveThruWindow: 'نافذة السيارة (Drive-Thru)',
    customerName: 'الاسم الكامل',
    customerPhone: 'رقم الهاتف (مثلاً 06...)',
    carPlate: 'نوع السيارة أو اللوحة (اختياري للسيارات)',
    pickupTime: 'وقت الاستلام المفضل',
    asap: 'في أسرع وقت (تحضير فوري)',
    in15m: 'خلال 15 دقيقة',
    in30m: 'خلال 30 دقيقة',
    specialNotes: 'ملاحظات خاصة أو تفضيلات إضافية...',
    confirmOrder: 'تأكيد طلب الاستلام',
    orderSuccessTitle: 'تم تأكيد طلبك بنجاح!',
    orderReadyIn: 'وقت التحضير المقدر',
    minutes: 'دقيقة',
    orderViaWhatsApp: 'إرسال الطلب فوراً عبر واتساب',
    disclaimerTitle: 'مشروع بورتفوليو مستقل',
    disclaimerText: 'هذا الموقع الإلكتروني هو نموذج بورتفوليو مستقل مستوحى من السياق التجاري العام لمقهى حيوي يقع بشارع الحسن الثاني بمدينة أسفي، المغرب. الموقع غير تابع أو معتمد أو ممثل للنشاط التجاري المذكور.',
    callUs: 'اتصل بنا',
    getDirections: 'الاتجاهات عبر الخريطة',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  isRTL: false,
  t: (k: string) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('speculos_lang') as Language;
      if (saved && (saved === 'fr' || saved === 'ar' || saved === 'en')) {
        return saved;
      }
    }
    return 'fr';
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('speculos_lang', newLang);
  };

  const isRTL = lang === 'ar';

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, isRTL, t }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-sans' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
