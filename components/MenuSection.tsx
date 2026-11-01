'use client';

import React, { useState, useMemo } from 'react';
import { MenuItem, MenuItemCategory, TrayItem } from '@/lib/types';
import { MENU_ITEMS, CATEGORIES } from '@/data/menu';
import { useLanguage } from './LanguageContext';
import ItemCustomizeModal from './ItemCustomizeModal';
import { Search, Plus, Sparkles, Clock, Check, Coffee, Utensils, GlassWater, Flame, X } from 'lucide-react';

interface MenuSectionProps {
  onAddToTray: (item: TrayItem) => void;
}

export default function MenuSection({ onAddToTray }: MenuSectionProps) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<MenuItemCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter items based on activeCategory and searchQuery
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(query) ||
        item.nameFr.toLowerCase().includes(query) ||
        item.nameAr.includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.descriptionFr.toLowerCase().includes(query) ||
        item.descriptionAr.includes(query)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();

    // If item has customizable options, open modal so customer can choose
    if (item.options && item.options.length > 0) {
      setSelectedItemForModal(item);
      return;
    }

    // Direct add
    const trayItem: TrayItem = {
      id: `${item.id}-std`,
      menuItemId: item.id,
      name: lang === 'ar' ? item.nameAr : lang === 'fr' ? item.nameFr : item.name,
      price: item.price,
      quantity: 1,
    };

    onAddToTray(trayItem);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'specialty-coffee':
        return <Coffee className="w-3.5 h-3.5" />;
      case 'cold-drinks':
        return <GlassWater className="w-3.5 h-3.5" />;
      case 'breakfast-combos':
        return <Flame className="w-3.5 h-3.5" />;
      case 'pastries':
      case 'savory':
        return <Utensils className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#8C4A16] uppercase tracking-wider">
            <span className="w-5 h-[1px] bg-[#8C4A16]" />
            <span>{lang === 'ar' ? 'قائمة المأكولات والمشروبات' : lang === 'fr' ? 'Notre Carte Artisanale' : 'Our Artisan Menu'}</span>
            <span className="w-5 h-[1px] bg-[#8C4A16]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B1810] tracking-tight">
            {lang === 'ar'
              ? 'مذاقات منتقاة بعناية لتبدأ يومك بامتياز'
              : lang === 'fr'
              ? 'Sélection de Spécialités & Gourmandises'
              : 'Curated Coffee & Morning Selections'}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5A50] [text-wrap:balance]">
            {lang === 'ar'
              ? 'أسعار واضحة بالدرهم المغربي (14 - 48 درهم). حضّر طلبك للاستلام المباشر أو عبر نافذة السيارات.'
              : lang === 'fr'
              ? 'Prix nets en Dirhams marocains (14 à 48 MAD). Préparez votre commande pour retrait express ou drive-thru.'
              : 'Specialty coffee, pastries and wholesome breakfast. Tap any item to customize and pre-order for rapid pickup.'}
          </p>
        </div>

        {/* Search & Interactive Category Filter Controls */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A70]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'ابحث بالاسم أو المكونات (لاتيه، كرواسون، فطور...)'
                  : lang === 'fr'
                  ? 'Rechercher un café, viennoiserie, déjeuner...'
                  : 'Search coffee, pastry, breakfast...'
              }
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-[#D9CFC4] rounded-xl text-[#2B1810] placeholder-[#9E8D83] focus:outline-none focus:ring-2 focus:ring-[#78350F]/40 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A70] hover:text-[#2B1810]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Filter Tabs (Single-line scrolling on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center p-1 bg-[#F0E8DE] rounded-xl border border-[#E0D5C7] max-w-4xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const label = lang === 'ar' ? cat.labelAr : lang === 'fr' ? cat.labelFr : cat.label;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as MenuItemCategory)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#2B1810] text-[#FAF7F2] shadow-sm font-semibold'
                      : 'text-[#5C4D44] hover:text-[#2B1810] hover:bg-white/60'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F5EFEB] rounded-2xl border border-dashed border-[#D9CFC4] max-w-md mx-auto">
            <Coffee className="w-10 h-10 text-[#A8988B] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#2B1810]">
              {lang === 'ar' ? 'لم يتم العثور على أي عنصر' : 'Aucun produit trouvé'}
            </p>
            <p className="text-xs text-[#7C6E65] mt-1">
              {lang === 'ar' ? 'يرجى تجربة كلمة بحث مختلفة' : 'Essayez un autre mot-clé ou réinitialisez le filtre'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold text-[#2B1810] bg-white border border-[#D9CFC4] rounded-lg hover:bg-[#FAF7F2]"
            >
              {lang === 'ar' ? 'إعادة ضبط القائمة' : 'Réinitialiser la carte'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const displayName = lang === 'ar' ? item.nameAr : lang === 'fr' ? item.nameFr : item.name;
              const displayDesc = lang === 'ar' ? item.descriptionAr : lang === 'fr' ? item.descriptionFr : item.description;
              const isAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemForModal(item)}
                  className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#E0D5C7] overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer text-left"
                >
                  {/* Visual Header with Gradient & Artistry */}
                  <div className={`h-36 relative overflow-hidden bg-gradient-to-br ${item.imageTheme.bgGradient} p-4 flex flex-col justify-between`}>
                    <div className="flex items-center justify-between text-white/90">
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide uppercase text-white/80">
                        <span>{item.category.replace('-', ' ')}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#E0A96D]" />
                          ~{item.prepTimeMinutes}m
                        </span>
                      </div>

                      {item.isHouseFavorite && (
                        <span className="text-[11px] font-medium text-[#FAF7F2] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#E0A96D]" />
                          Signature
                        </span>
                      )}
                    </div>

                    {/* Central Icon Motif */}
                    <div className="my-auto flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/25 flex items-center justify-center text-[#E0A96D] group-hover:scale-110 transition-transform">
                        <Coffee className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="text-[11px] text-white/70">
                      Avenue Hassan II · Safi
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-serif font-bold text-[#2B1810] group-hover:text-[#78350F] transition-colors leading-tight">
                          {displayName}
                        </h3>
                        <span className="text-lg font-bold font-serif text-[#2B1810] tabular-nums whitespace-nowrap shrink-0">
                          {item.price}{' '}
                          <span className="text-xs font-sans font-medium text-[#8C4A16]">{t('mad')}</span>
                        </span>
                      </div>

                      <p className="text-xs text-[#6B5A50] leading-relaxed line-clamp-2">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Footer Row: Tags + Quick Action Button */}
                    <div className="pt-3 border-t border-[#F2EAE0] flex items-center justify-between gap-2">
                      <div className="text-[11px] text-[#8C7A70] flex items-center gap-1.5">
                        {item.options && item.options.length > 0 ? (
                          <span className="text-[#8C4A16] font-medium">
                            {lang === 'ar' ? 'خيارات مخصصة' : lang === 'fr' ? 'Personnalisable' : 'Customizable'}
                          </span>
                        ) : (
                          <span>{item.prepTimeMinutes} min express</span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                          isAdded
                            ? 'bg-[#15803D] text-white'
                            : 'bg-[#2B1810] text-[#FAF7F2] hover:bg-[#451A03]'
                        }`}
                        aria-label={`Add ${displayName} to tray`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'ar' ? 'تمت الإضافة' : 'Ajouté !'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-[#E0A96D]" />
                            <span>{lang === 'ar' ? 'إضافة' : lang === 'fr' ? 'Choisir' : 'Select'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for Customizing selected item */}
      <ItemCustomizeModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToTray={onAddToTray}
      />
    </section>
  );
}
