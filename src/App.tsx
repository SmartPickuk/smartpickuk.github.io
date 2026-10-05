/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Link, Route, Routes, useParams } from 'react-router';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
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
import { CheckCircle2, ArrowLeft } from 'lucide-react';

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

/* ---------------- HOME PAGE ---------------- */

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7fb] text-[#172033]">
      <Header />

      <main className="flex-1">
        <Hero />

        <CategoriesSection />

        {/* Featured UK Product Picks */}
        <FeaturedProductsSection />

        <BuyingGuidesSection />

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

/* ---------------- CATEGORY PAGE ---------------- */

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const { products, setSelectedCategory } = useApp();

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category, setSelectedCategory]);

  const categoryInfo: Record<
    string,
    { name: string; description: string; icon: string }
  > = {
    audio: {
      name: 'Audio & Headphones',
      description:
        'SmartPick recommendations for headphones, earbuds and everyday audio.',
      icon: '🎧',
    },
    kitchen: {
      name: 'Home & Kitchen',
      description:
        'Useful kitchen appliances and home products selected for practical buying.',
      icon: '🏠',
    },
    travel: {
      name: 'Travel & Power',
      description:
        'Power banks and useful travel products for life on the go.',
      icon: '🔋',
    },
    cleaning: {
      name: 'Cleaning & Vacs',
      description:
        'Smart picks for vacuuming, cleaning and keeping your home fresh.',
      icon: '🧹',
    },
    office: {
      name: 'Home Office',
      description:
        'Practical products for a more comfortable and productive workspace.',
      icon: '🪑',
    },
  };

  const currentCategory = category ? categoryInfo[category] : undefined;

  const matchingProducts = products.filter(
    (product) => product.category === category
  );

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] text-[#172033]">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-sm">
            <div className="text-5xl mb-5">🔎</div>

            <h1 className="text-3xl font-extrabold mb-3">
              Category not found
            </h1>

            <p className="text-slate-600 mb-6">
              The category you are looking for does not exist.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#172033] text-white px-5 py-3 font-bold hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SmartPick UK
            </Link>
          </div>
        </main>

        <Footer />

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
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7fb] text-[#172033]">
      <Header />

      <main className="flex-1">
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SmartPick UK
            </Link>

            <div className="flex items-start gap-5">
              <div className="text-5xl sm:text-6xl">
                {currentCategory.icon}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-amber-500 mb-2">
                  SmartPick Category
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172033]">
                  {currentCategory.name}
                </h1>

                <p className="mt-3 text-slate-600 max-w-2xl text-base sm:text-lg">
                  {currentCategory.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-slate-500">
                  {matchingProducts.length} product
                  {matchingProducts.length === 1 ? '' : 's'} in this category
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProductsSection />
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

/* ---------------- APP ROUTES ---------------- */

const MainContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/category/:category" element={<CategoryPage />} />

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
