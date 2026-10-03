import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, ExternalLink, Scale, Check, AlertCircle, ShieldCheck, Heart } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProduct,
    closeProduct,
    getAmazonUrl,
    handleAffiliateClick,
    compareList,
    toggleCompare
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProduct();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProduct]);

  if (!activeProduct) return null;

  const isCompared = compareList.some((p) => p.id === activeProduct.id);
  const amazonUrl = getAmazonUrl(activeProduct);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProduct();
      }}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-[#9a4b00] font-bold">{activeProduct.categoryLabel}</span>
            <span>·</span>
            <span>ASIN: <code className="font-mono text-slate-700">{activeProduct.asin}</code></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(activeProduct)}
              className={`p-1.5 px-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-[#111827] text-white border-[#111827]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={closeProduct}
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Top Overview */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-sm relative">
              {activeProduct.imageUrl ? (
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">
                  {activeProduct.icon}
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1">
              {activeProduct.awards && (
                <span className="text-xs font-bold text-amber-900 bg-amber-100/80 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
                  {activeProduct.awards}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033] leading-snug">
                {activeProduct.name}
              </h2>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(activeProduct.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200 fill-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-800">{activeProduct.rating} / 5.0</span>
                <span className="text-slate-400">({activeProduct.reviewCount.toLocaleString('en-GB')} Amazon UK reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {activeProduct.description}
          </p>

          {/* Pricing Highlight & Instant Amazon Action */}
          <div className="bg-[#fff9f0] border border-[#ffeed0] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#9a4b00] font-semibold">UK Current Deal Price</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#172033]">
                  £{activeProduct.priceGbp.toFixed(2)}
                </span>
                {activeProduct.originalPriceGbp && (
                  <span className="text-sm text-slate-400 line-through">
                    RRP £{activeProduct.originalPriceGbp.toFixed(2)}
                  </span>
                )}
                {activeProduct.dealTag && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {activeProduct.dealTag}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Dispatched & sold via Amazon UK with Prime delivery options</div>
            </div>

            <a
              href={amazonUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              onClick={(e) => handleAffiliateClick(e, activeProduct)}
              className="inline-flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#ffad32] text-slate-950 font-black py-3.5 px-6 rounded-xl text-xs tracking-wide shadow-md transition-all whitespace-nowrap"
            >
              <span>View Deal on Amazon UK</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Technical Specifications
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
              {Object.entries(activeProduct.specs).map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-1">
                  <span className="font-semibold text-slate-600 sm:w-1/3">{key}</span>
                  <span className="text-slate-900 font-medium sm:w-2/3">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>What We Liked (Pros)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeProduct.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold mt-0.5">+</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Trade-Offs & Cons</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeProduct.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold mt-0.5">-</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SmartPick UK Verdict */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              The SmartPick UK Verdict
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              "{activeProduct.verdict}"
            </p>
          </div>

          {/* UK Considerations */}
          {activeProduct.ukFeatures.length > 0 && (
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🇬🇧 UK Domestic Suitability Verified</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {activeProduct.ukFeatures.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Prices verified regularly · As an Amazon Associate I earn from qualifying purchases
          </div>
          <button
            onClick={closeProduct}
            className="bg-[#111827] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#ff7a00] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
