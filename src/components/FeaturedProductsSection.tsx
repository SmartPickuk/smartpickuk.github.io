import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Star, ExternalLink, Check, Scale, Shield, Sparkles, SlidersHorizontal, Settings, PackageCheck, AlertCircle } from 'lucide-react';

export const FeaturedProductsSection: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    openProduct,
    toggleCompare,
    compareList,
    getAmazonUrl,
    handleAffiliateClick,
    associateTag,
    openModal,
    setIsAdminOpen,
    isAdminAuthenticated
  } = useApp();

  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  // Filter products by category
  let filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceGbp - b.priceGbp;
    if (sortBy === 'price-high') return b.priceGbp - a.priceGbp;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended default
  });

  const categories = [
    { id: 'all', label: 'All Picks' },
    { id: 'audio', label: 'Audio' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'travel', label: 'Travel & Power' },
    { id: 'cleaning', label: 'Cleaning' },
    { id: 'office', label: 'Office' },
  ];

  return (
    <section id="products" className="py-16 bg-white border-b border-[#e7e9ef]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#ff7a00] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tested & Recommended</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172033]">
              Featured UK product picks
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Carefully researched products ready for your approved Amazon UK Associate links.
            </p>
          </div>

          {/* Controls: Category Filter + Sort */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#f1f4f9] p-1 rounded-xl overflow-x-auto text-xs font-semibold">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-white text-[#172033] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#f8fafc] border border-[#e2e8f0] text-xs font-medium text-slate-700 rounded-xl px-3 py-2 outline-hidden cursor-pointer"
            >
              <option value="recommended">Sort: Editor's Pick</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price-low">Sort: Price (Low to High)</option>
              <option value="price-high">Sort: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product: Product) => {
            const isCompared = compareList.some(p => p.id === product.id);
            const amazonUrl = getAmazonUrl(product);

            return (
              <article
                key={product.id}
                className="bg-white border border-[#e7e9ef] hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Product visual area with real photography */}
                  <div className="h-52 overflow-hidden relative border-b border-[#f1f3f9] bg-slate-100 group">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-[#f8fafc] to-[#eef2f7]">
                        <span className="transform group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </span>
                      </div>
                    )}

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                    {/* Quiet Award text kicker */}
                    {product.awards && (
                      <div className="absolute top-3 left-3 text-[11px] font-bold text-amber-950 bg-amber-50/95 backdrop-blur-xs border border-amber-200/90 px-2.5 py-0.5 rounded-md shadow-xs">
                        {product.awards}
                      </div>
                    )}

                    {/* Quick Compare Toggle */}
                    <button
                      onClick={() => toggleCompare(product)}
                      title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg border transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1 shadow-xs ${
                        isCompared
                          ? 'bg-[#111827] text-white border-[#111827]'
                          : 'bg-white/95 backdrop-blur-xs text-slate-700 border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    {/* Quiet category & brand metadata without pill */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="text-[#9a4b00] font-semibold">{product.categoryLabel}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{product.brand}</span>
                      {product.dealTag && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-emerald-700 font-bold">{product.dealTag}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#172033] leading-snug">
                      {product.name}
                    </h3>

                    {/* Star ratings */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200 fill-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-800">{product.rating}</span>
                      <span className="text-slate-400">({product.reviewCount.toLocaleString('en-GB')})</span>
                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Key UK Advantage Highlight */}
                    {product.ukFeatures && product.ukFeatures.length > 0 && (
                      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-[11px] text-slate-700 space-y-1">
                        <div className="font-semibold text-slate-900 flex items-center gap-1">
                          <span>🇬🇧 UK Consideration:</span>
                        </div>
                        <p className="text-slate-600 line-clamp-1">
                          {product.ukFeatures[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and Action Section */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-baseline justify-between pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-xl font-extrabold text-[#172033]">
                        £{product.priceGbp.toFixed(2)}
                      </div>
                      {product.originalPriceGbp && (
                        <div className="text-xs text-slate-400 line-through">
                          RRP £{product.originalPriceGbp.toFixed(2)}
                        </div>
                      )}
                    </div>
                    
                    {/* Stock / Pcs display */}
                    <div className="text-right">
                      {product.inStock ? (
                        <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1 justify-end">
                          <PackageCheck className="w-3 h-3 text-emerald-600" />
                          <span>{product.stockCount ? `${product.stockCount} pcs in stock` : 'In Stock'}</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold text-[11px] flex items-center gap-1 justify-end">
                          <AlertCircle className="w-3 h-3 text-rose-500" />
                          <span>Out of Stock</span>
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-medium block">Amazon Prime</span>
                    </div>
                  </div>

                  {/* Primary Affiliate Buy Button */}
                  <a
                    href={amazonUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    onClick={(e) => handleAffiliateClick(e, product)}
                    className="w-full flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#ffad32] active:bg-[#e68a00] text-slate-950 font-extrabold py-3 px-4 rounded-xl shadow-xs transition-all text-xs tracking-wide group"
                  >
                    <span>Check price on Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Secondary Specs & Review modal button */}
                  <button
                    onClick={() => openProduct(product)}
                    className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    View detailed specs & verdict →
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Amazon Associate Link Customizer Notice Box matching original HTML */}
        <div className="mt-10 bg-[#fff8ef] border border-[#ffdcb4] rounded-2xl p-5 sm:p-6 text-sm text-[#69400f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ff7a00]" />
              <span>Publisher Information: Amazon Associates Integration</span>
            </div>
            <p className="text-xs text-[#8c5215] max-w-2xl">
              All "Check price on Amazon" links automatically embed your tracking tag (currently set to{' '}
              <strong className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">
                {associateTag || 'smartpickuk-21'}
              </strong>
              ). Replace this with your official Amazon UK tracking ID from Associates Central before publishing.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => openModal('affiliateSettings')}
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#111827] hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Tag Settings</span>
            </button>
            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#ff7a00] hover:bg-[#e06900] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Open Admin Panel</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
