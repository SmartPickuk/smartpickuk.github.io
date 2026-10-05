import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  Star,
  ExternalLink,
  Scale,
  Shield,
  Sparkles,
  SlidersHorizontal,
  Settings,
  ImageOff,
} from 'lucide-react';

const ProductImage: React.FC<{ product: Product }> = ({ product }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = Boolean(product.imageUrl) && !imageFailed;

  if (!hasImage) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] text-slate-400">
        <div className="text-6xl mb-2">
          {product.icon || '📦'}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          <ImageOff className="w-3.5 h-3.5" />
          Product image unavailable
        </div>
      </div>
    );
  }

  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setImageFailed(true)}
      className="w-full h-full object-contain p-2 bg-white group-hover:scale-105 transition-transform duration-500"
    />
  );
};

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
    isAdminAuthenticated,
  } = useApp();

  const [sortBy, setSortBy] = useState<
    'recommended' | 'price-low' | 'price-high' | 'rating'
  >('recommended');

  /*
   * IMPORTANT:
   * Do NOT exclude dealTag products here.
   * Category pages need to display all products belonging
   * to the selected category.
   */
  let filtered = products.filter(
    (product) =>
      selectedCategory === 'all' ||
      product.category === selectedCategory
  );

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.priceGbp - b.priceGbp;
    }

    if (sortBy === 'price-high') {
      return b.priceGbp - a.priceGbp;
    }

    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }

    return 0;
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
    <section
      id="products"
      className="py-16 bg-white border-b border-[#e7e9ef]"
    >
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
              Carefully researched products ready for your approved Amazon UK
              Associate links.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#f1f4f9] p-1 rounded-xl overflow-x-auto text-xs font-semibold">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-white text-[#172033] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as
                    | 'recommended'
                    | 'price-low'
                    | 'price-high'
                    | 'rating'
                )
              }
              className="bg-[#f8fafc] border border-[#e2e8f0] text-xs font-medium text-slate-700 rounded-xl px-3 py-2 outline-hidden cursor-pointer"
            >
              <option value="recommended">
                Sort: Editor's Pick
              </option>
              <option value="rating">
                Sort: Highest Rated
              </option>
              <option value="price-low">
                Sort: Price (Low to High)
              </option>
              <option value="price-high">
                Sort: Price (High to Low)
              </option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((product: Product) => {
              const isCompared = compareList.some(
                (item) => item.id === product.id
              );

              const amazonUrl = getAmazonUrl(product);

              return (
                <article
                  key={product.id}
                  className="bg-white border border-[#e7e9ef] hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col"
                >

                  {/* Product Image */}
                  <div className="relative">

                    <a
                      href={amazonUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      onClick={(event) =>
                        handleAffiliateClick(event, product)
                      }
                      aria-label={`Check ${product.name} on Amazon UK`}
                      className="block"
                    >
                      <div className="h-60 overflow-hidden relative border-b border-[#f1f3f9] bg-white group">

                        <ProductImage product={product} />

                        {/* Soft image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                        {/* Award */}
                        {product.awards && (
                          <div className="absolute top-3 left-3 text-[11px] font-bold text-amber-950 bg-amber-50/95 backdrop-blur-xs border border-amber-200/90 px-2.5 py-1 rounded-md shadow-xs">
                            {product.awards}
                          </div>
                        )}

                        {/* Amazon image CTA */}
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                            View on Amazon UK
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </a>

                    {/* Compare */}
                    <button
                      onClick={() => toggleCompare(product)}
                      title={
                        isCompared
                          ? 'Remove from compare'
                          : 'Add to compare'
                      }
                      className={`absolute top-3 right-3 p-1.5 rounded-lg border transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1 shadow-xs ${
                        isCompared
                          ? 'bg-[#111827] text-white border-[#111827]'
                          : 'bg-white/95 backdrop-blur-xs text-slate-700 border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />

                      <span className="hidden sm:inline">
                        {isCompared ? 'Compared' : 'Compare'}
                      </span>
                    </button>
                  </div>

                  {/* Product Body */}
                  <div className="p-5 space-y-3 flex-1">

                    {/* Category / Brand */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="text-[#9a4b00] font-semibold">
                        {product.categoryLabel}
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-slate-300"
                      >
                        ·
                      </span>

                      <span>{product.brand}</span>

                      {product.dealTag && (
                        <>
                          <span
                            aria-hidden="true"
                            className="text-slate-300"
                          >
                            ·
                          </span>

                          <span className="text-emerald-700 font-bold">
                            {product.dealTag}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-[#172033] leading-snug">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-3.5 h-3.5 ${
                              index < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200 fill-slate-200'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="font-bold text-slate-800">
                        {product.rating}
                      </span>

                      <span className="text-slate-400">
                        ({product.reviewCount.toLocaleString('en-GB')})
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* UK Feature */}
                    {product.ukFeatures &&
                      product.ukFeatures.length > 0 && (
                        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-[11px] text-slate-700 space-y-1">
                          <div className="font-semibold text-slate-900 flex items-center gap-1">
                            <span>🇬🇧 UK Consideration:</span>
                          </div>

                          <p className="text-slate-600 line-clamp-2">
                            {product.ukFeatures[0]}
                          </p>
                        </div>
                      )}
                  </div>

                  {/* Bottom CTA */}
                  <div className="p-5 pt-0 space-y-3">

                    <div className="pt-3 border-t border-slate-100">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-extrabold text-amber-700">
                        <Sparkles className="w-4 h-4" />
                        SmartPick Pick
                      </div>

                      <div className="mt-2 text-sm font-semibold text-slate-600">
                        Check latest price on Amazon UK
                      </div>
                    </div>

                    {/* Amazon Button */}
                    <a
                      href={amazonUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      onClick={(event) =>
                        handleAffiliateClick(event, product)
                      }
                      className="w-full flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#ffad32] active:bg-[#e68a00] text-slate-950 font-extrabold py-3 px-4 rounded-xl shadow-xs transition-all text-xs tracking-wide group"
                    >
                      <span>Check price on Amazon</span>

                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Detailed Specs */}
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
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <div className="text-5xl mb-3">📦</div>

            <h3 className="text-lg font-bold text-slate-800">
              No products in this category yet
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              SmartPick is adding more researched products to this category.
            </p>
          </div>
        )}

        {/* Amazon Associates Information */}
        <div className="mt-10 bg-[#fff8ef] border border-[#ffdcb4] rounded-2xl p-5 sm:p-6 text-sm text-[#69400f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">

          <div className="space-y-1">
            <div className="font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ff7a00]" />

              <span>
                Publisher Information: Amazon Associates Integration
              </span>
            </div>

            <p className="text-xs text-[#8c5215] max-w-2xl">
              Amazon links on SmartPick UK use the configured Amazon UK
              Associate tracking ID:
              {' '}

              <strong className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">
                {associateTag || 'smartpickuk06-21'}
              </strong>
              .
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">

            {/* Tag Settings */}
            <button
              onClick={() => openModal('affiliateSettings')}
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#111827] hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />

              <span>Tag Settings</span>
            </button>

            {/* Admin */}
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

export default FeaturedProductsSection;
