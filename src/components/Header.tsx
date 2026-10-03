import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Scale, Settings, Menu, X, ArrowRight, ExternalLink, SlidersHorizontal } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    products,
    guides,
    siteSettings,
    searchQuery,
    setSearchQuery,
    openModal,
    openGuide,
    openProduct,
    compareList,
    associateTag,
    setIsAdminOpen,
    isAdminAuthenticated
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Filter products & guides for quick dropdown preview
  const matchingProducts = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const matchingGuides = searchQuery.trim().length > 1
    ? guides.filter(g =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.summary.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 2)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    // Scroll to products or guides
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#111827] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block">🇬🇧</span>
            <span>Independent UK buying guides & product research · Updated regularly</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => openModal('affiliate')}
              className="hover:text-amber-400 transition-colors text-xs underline cursor-pointer"
            >
              Affiliate Disclosure
            </button>
            <span className="hidden md:inline text-slate-600">|</span>
            <button
              onClick={() => openModal('affiliateSettings')}
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
              title="Configure Amazon Associates Tag"
            >
              <Settings className="w-3 h-3" />
              <span>Tag: <strong className="text-amber-400 font-mono">{associateTag || 'smartpickuk-21'}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#e7e9ef] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#111827] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:bg-[#ff7a00] transition-colors">
              S
            </div>
            <div className="text-2xl font-black tracking-tight text-[#172033]">
              Smart<span className="text-[#ff7a00]">Pick</span> <span className="text-xs bg-slate-100 font-bold px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">UK</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm text-[#344054]">
            <a href="#deals" className="hover:text-[#ff7a00] transition-colors">Deals</a>
            <a href="#categories" className="hover:text-[#ff7a00] transition-colors">Categories</a>
            <a href="#guides" className="hover:text-[#ff7a00] transition-colors">Buying Guides</a>
            <a href="#products" className="hover:text-[#ff7a00] transition-colors">Featured Picks</a>
            <a href="#compare" className="hover:text-[#ff7a00] transition-colors flex items-center gap-1">
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="bg-[#ff7a00] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {compareList.length}
                </span>
              )}
            </a>
            <a href="#reviews" className="hover:text-[#ff7a00] transition-colors">Methodology</a>
            <button
              onClick={() => openModal('about')}
              className="hover:text-[#ff7a00] transition-colors cursor-pointer"
            >
              About
            </button>
            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 bg-[#111827] text-white hover:bg-[#ff7a00] px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ml-1"
                title="Admin Dashboard (Only visible to authenticated owner)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="flex items-center border border-[#d9dde6] rounded-xl overflow-hidden bg-white focus-within:border-[#ff7a00] focus-within:ring-2 focus-within:ring-[#ff7a00]/10 transition-all">
                <input
                  type="search"
                  placeholder="Search products, guides..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="px-3 py-2 text-sm w-44 md:w-56 text-[#172033] outline-hidden placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="bg-[#111827] text-white px-3.5 py-2 hover:bg-[#ff7a00] transition-colors cursor-pointer flex items-center justify-center"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Results Dropdown */}
              {showSearchDropdown && (matchingProducts.length > 0 || matchingGuides.length > 0) && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#e7e9ef] rounded-xl shadow-xl z-50 p-3 text-xs"
                  onMouseLeave={() => setShowSearchDropdown(false)}
                >
                  {matchingProducts.length > 0 && (
                    <div className="mb-3">
                      <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 px-2">
                        Products ({matchingProducts.length})
                      </div>
                      <div className="space-y-1">
                        {matchingProducts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              openProduct(p);
                              setShowSearchDropdown(false);
                            }}
                            className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between gap-2 group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                {p.imageUrl ? (
                                  <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-base flex items-center justify-center w-full h-full">{p.icon}</span>
                                )}
                              </div>
                              <span className="font-medium text-slate-800 truncate group-hover:text-[#ff7a00]">
                                {p.brand} {p.name}
                              </span>
                            </div>
                            <span className="font-bold text-slate-900 flex-shrink-0">£{p.priceGbp.toFixed(2)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingGuides.length > 0 && (
                    <div>
                      <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 px-2">
                        Buying Guides ({matchingGuides.length})
                      </div>
                      <div className="space-y-1">
                        {matchingGuides.map((g) => (
                          <button
                            key={g.id}
                            onClick={() => {
                              openGuide(g);
                              setShowSearchDropdown(false);
                            }}
                            className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between gap-2 group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                {g.imageUrl ? (
                                  <img
                                    src={g.imageUrl}
                                    alt={g.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-base flex items-center justify-center w-full h-full">{g.icon}</span>
                                )}
                              </div>
                              <span className="font-medium text-slate-800 truncate group-hover:text-[#ff7a00]">
                                {g.title}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ff7a00]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Compare Quick Button */}
            {compareList.length > 0 && (
              <a
                href="#compare"
                className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-2 rounded-xl text-xs font-bold border border-amber-200 transition-colors"
              >
                <Scale className="w-3.5 h-3.5 text-[#ff7a00]" />
                <span>Compare ({compareList.length})</span>
              </a>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e7e9ef] bg-white px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="flex items-center border border-[#d9dde6] rounded-xl overflow-hidden bg-white mb-3">
              <input
                type="search"
                placeholder="Search products, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 text-sm w-full text-[#172033] outline-hidden"
              />
              <button
                type="submit"
                className="bg-[#111827] text-white px-4 py-2 hover:bg-[#ff7a00]"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[#344054]">
              <a
                href="#deals"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center gap-2"
              >
                <span>🔥 Deals & Discounts</span>
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center gap-2"
              >
                <span>📁 Categories</span>
              </a>
              <a
                href="#guides"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center gap-2"
              >
                <span>📖 Buying Guides</span>
              </a>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center gap-2"
              >
                <span>⭐ Top Picks</span>
              </a>
              <a
                href="#compare"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center gap-2"
              >
                <span>⚖️ Compare ({compareList.length})</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('about');
                }}
                className="p-2.5 rounded-lg hover:bg-slate-50 text-left flex items-center gap-2 cursor-pointer"
              >
                <span>ℹ️ About Us</span>
              </button>
              {isAdminAuthenticated && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="p-2.5 rounded-lg bg-[#111827] text-white hover:bg-[#ff7a00] text-left flex items-center gap-2 cursor-pointer font-bold col-span-2 shadow-xs transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <span>Admin Panel (Authenticated)</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('affiliateSettings');
                }}
                className="flex items-center gap-1.5 text-slate-700 font-medium py-1"
              >
                <Settings className="w-3.5 h-3.5 text-amber-500" />
                <span>Associate Tag: {associateTag || 'Default'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('affiliate');
                }}
                className="underline"
              >
                Affiliate Notice
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
