/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { DealsSection } from './components/DealsSection';
import { BuyingGuidesSection } from './components/BuyingGuidesSection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { ReviewApproachSection } from './components/ReviewApproachSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/modals/LegalModal';
import { GuideDetailModal } from './components/modals/GuideDetailModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { AffiliateSettingsModal } from './components/modals/AffiliateSettingsModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { CheckCircle2, Info, Lock } from 'lucide-react';

const AdminFloatingIndicator: React.FC = () => {
  const { isAdminAuthenticated, setIsAdminOpen, logoutAdmin } = useApp();
  if (!isAdminAuthenticated) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-[#111827]/95 backdrop-blur-xs text-white px-3.5 py-2 rounded-2xl shadow-2xl border border-slate-700 text-xs animate-in fade-in duration-300">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="font-bold">Admin Mode</span>
      <span className="text-slate-600">·</span>
      <button
        onClick={() => setIsAdminOpen(true)}
        className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline"
      >
        Open Panel
      </button>
      <span className="text-slate-600">·</span>
      <button
        onClick={logoutAdmin}
        className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
      >
        Lock
      </button>
    </div>
  );
};

const ToastNotification: React.FC = () => {
  const { notification } = useApp();
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#111827] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs max-w-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="font-medium">{notification}</span>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7fb] text-[#172033]">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoriesSection />
        <DealsSection />
        <BuyingGuidesSection />
        <FeaturedProductsSection />
        <ComparisonSection />
        <ReviewApproachSection />
        <NewsletterSection />
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <AdminDashboard />
      <AdminLoginModal />
      <AdminFloatingIndicator />
      <LegalModal />
      <GuideDetailModal />
      <ProductDetailModal />
      <AffiliateSettingsModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
