import React from 'react';
import { productsData } from '../data/productsData';
import { useApp } from '../context/AppContext';
import { Flame, Clock, ExternalLink, Percent, ShieldCheck } from 'lucide-react';

export const DealsSection: React.FC = () => {
  const { products, getAmazonUrl, handleAffiliateClick, openProduct } = useApp();

  // Products with dealTag or discount
  const dealProducts = products.filter(p => p.originalPriceGbp && p.dealTag);

  return (
    <section id="deals" className="py-16 bg-gradient-to-b from-[#111827] to-[#1a2333] text-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Price Drops & Promotions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Today's featured UK deals
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Hand-verified discounts on top-rated products across Amazon UK.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Prices verified regularly · Subject to stock</span>
          </div>
        </div>

        {/* Deals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealProducts.map((p) => {
            const savings = p.originalPriceGbp ? (p.originalPriceGbp - p.priceGbp).toFixed(2) : null;
            const amazonUrl = getAmazonUrl(p);

            return (
              <div
                key={p.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group"
              >
                <div>
                  {/* Top line with discount tag and icon */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0 relative">
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">
                            {p.icon}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                          {p.categoryLabel}
                        </span>
                        <div className="text-xs text-slate-400 font-medium">{p.brand}</div>
                      </div>
                    </div>

                    <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black px-2.5 py-1 rounded-lg">
                      {p.dealTag}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
                    {p.name}
                  </h3>

                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {p.tagline}
                  </p>

                  {/* Pricing block */}
                  <div className="bg-slate-800/60 rounded-xl p-3 mb-4 border border-slate-700/60 flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-black text-white">
                        £{p.priceGbp.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        RRP £{p.originalPriceGbp?.toFixed(2)}
                      </div>
                    </div>
                    {savings && (
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          Save £{savings}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={amazonUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    onClick={(e) => handleAffiliateClick(e, p)}
                    className="w-full flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#ffad32] active:bg-[#e68a00] text-slate-950 font-black py-3 px-4 rounded-xl text-xs tracking-wide transition-all shadow-md group/btn"
                  >
                    <span>Claim Deal on Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={() => openProduct(p)}
                    className="w-full text-center text-xs text-slate-400 hover:text-white py-1.5 font-medium transition-colors cursor-pointer"
                  >
                    View review & testing details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
