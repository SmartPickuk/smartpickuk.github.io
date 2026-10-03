import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { productsData } from '../../data/productsData';
import { X, Clock, Calendar, CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

export const GuideDetailModal: React.FC = () => {
  const { activeGuide, closeGuide, openProduct, getAmazonUrl, handleAffiliateClick } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGuide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeGuide]);

  if (!activeGuide) return null;

  // Recommended products in this guide
  const recommended = productsData.filter(p =>
    activeGuide.recommendedProductIds.includes(p.id)
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeGuide();
      }}
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-[#ff7a00] font-bold">{activeGuide.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#ff7a00]" />
              {activeGuide.readTime}
            </span>
            <span>·</span>
            <span>{activeGuide.date}</span>
          </div>

          <button
            onClick={closeGuide}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
            aria-label="Close guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Header Area */}
          <div className="space-y-4">
            {activeGuide.imageUrl && (
              <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
                <img
                  src={activeGuide.imageUrl}
                  alt={activeGuide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-[#ff7a00] px-2.5 py-1 rounded shadow-xs">
                    UK Buyer’s Guide
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              {!activeGuide.imageUrl && (
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-3xl">
                  {activeGuide.icon}
                </div>
              )}
              <div>
                {!activeGuide.imageUrl && (
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#9a4b00] bg-orange-100/70 px-2 py-0.5 rounded">
                    UK Buyer’s Guide
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight mt-1">
                  {activeGuide.title}
                </h1>
              </div>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-normal bg-[#f8fafc] p-4 rounded-xl border border-slate-200/70">
              {activeGuide.intro}
            </p>
          </div>

          {/* Recommended UK Tested Models */}
          {recommended.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Top Tested UK Picks in This Category</span>
                </h3>
                <span className="text-xs text-slate-400">Verified for UK compatibility</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommended.map((prod) => {
                  const amazonUrl = getAmazonUrl(prod);
                  return (
                    <div
                      key={prod.id}
                      className="border border-slate-200 hover:border-amber-400/80 rounded-2xl p-4 bg-white shadow-xs flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">
                                {prod.icon}
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {prod.awards || 'Top Recommendation'}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-3 line-clamp-1">
                          {prod.brand} {prod.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {prod.tagline}
                        </p>
                        <div className="text-lg font-extrabold text-slate-900 mt-2">
                          £{prod.priceGbp.toFixed(2)}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                        <a
                          href={amazonUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          onClick={(e) => handleAffiliateClick(e, prod)}
                          className="w-full flex items-center justify-center gap-1.5 bg-[#ff9900] hover:bg-[#ffad32] text-slate-950 font-bold py-2 px-3 rounded-lg text-xs transition-colors shadow-xs"
                        >
                          <span>Check price on Amazon</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => {
                            closeGuide();
                            openProduct(prod);
                          }}
                          className="w-full text-center text-xs text-slate-600 hover:text-slate-900 py-1 font-medium cursor-pointer"
                        >
                          View full review details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* UK Specific Considerations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🇬🇧 Key UK Market Considerations</span>
            </h3>
            
            <div className="space-y-3">
              {activeGuide.ukConsiderations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f0f4f9] border border-slate-200/80 rounded-xl p-4 space-y-1"
                >
                  <h4 className="font-bold text-sm text-[#172033]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Buyer Checklist */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>The SmartPick UK Buyer’s Checklist</span>
            </h3>
            <ul className="space-y-2.5">
              {activeGuide.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Look For Deep Dive */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Technical Breakdown: What to Look For
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {activeGuide.whatToLookFor.map((item, idx) => (
                <div key={idx} className="border-l-3 border-[#ff7a00] pl-4 py-1 space-y-1">
                  <h4 className="font-bold text-sm text-slate-800">
                    {item.heading}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Common Buying Mistakes to Avoid</span>
            </div>
            <ul className="space-y-2">
              {activeGuide.buyingMistakes.map((mistake, idx) => (
                <li key={idx} className="text-xs text-rose-900/80 flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliate Disclosure Reassurance */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ff7a00] flex-shrink-0 mt-0.5" />
            <p>
              SmartPick UK conducts independent editorial research. When you buy through our links, we may earn an affiliate commission from Amazon.co.uk at zero extra cost to you.
            </p>
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={closeGuide}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to all guides
          </button>
          
          <button
            onClick={closeGuide}
            className="bg-[#111827] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#ff7a00] transition-colors cursor-pointer"
          >
            Finished Reading
          </button>
        </div>

      </div>
    </div>
  );
};
