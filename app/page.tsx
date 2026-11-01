'use client';

import React, { useState, useEffect } from 'react';
import { TrayItem } from '@/lib/types';
import { LanguageProvider } from '@/components/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import MenuSection from '@/components/MenuSection';
import DriveThruPickupGuide from '@/components/DriveThruPickupGuide';
import AmbianceSection from '@/components/AmbianceSection';
import LocationHoursContact from '@/components/LocationHoursContact';
import OrderTrayDrawer from '@/components/OrderTrayDrawer';
import MobileStickyBar from '@/components/MobileStickyBar';
import Footer from '@/components/Footer';

function CafeApp() {
  const [trayItems, setTrayItems] = useState<TrayItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('speculos_tray');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  // Persist tray changes
  useEffect(() => {
    try {
      localStorage.setItem('speculos_tray', JSON.stringify(trayItems));
    } catch {
      // ignore
    }
  }, [trayItems]);

  const handleAddToTray = (item: TrayItem) => {
    setTrayItems((prev) => {
      // Check if identical item (same menuItemId and same options) exists
      const optionsKey = JSON.stringify(item.selectedOptions || {});
      const existingIdx = prev.findIndex(
        (p) => p.menuItemId === item.menuItemId && JSON.stringify(p.selectedOptions || {}) === optionsKey
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setTrayItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as TrayItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setTrayItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  const totalItemCount = trayItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalMad = trayItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241A15]">
      {/* Top Bar Contract Navigation */}
      <Navbar
        trayItemCount={totalItemCount}
        onOpenTray={() => setIsTrayOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenTray={() => setIsTrayOpen(true)}
        />

        <BrandStory />

        <MenuSection
          onAddToTray={handleAddToTray}
        />

        <DriveThruPickupGuide
          onStartOrder={() => setIsTrayOpen(true)}
        />

        <AmbianceSection />

        <LocationHoursContact />
      </main>

      {/* Footer with Mandatory Disclaimer */}
      <Footer />

      {/* Slide-out Order & Pickup Tray Drawer */}
      <OrderTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileStickyBar
        trayItemCount={totalItemCount}
        totalMad={totalMad}
        onOpenTray={() => setIsTrayOpen(true)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <CafeApp />
    </LanguageProvider>
  );
}
