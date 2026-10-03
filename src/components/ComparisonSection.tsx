import React from 'react';
import { useApp } from '../context/AppContext';
import { productsData } from '../data/productsData';
import { Scale, X, ExternalLink, Check, Trash2, Plus } from 'lucide-react';
import { Product } from '../types';

export const ComparisonSection: React.FC = () => {
  const {
    products,
    compareList,
    toggleCompare,
    clearCompare,
    getAmazonUrl,
    handleAffiliateClick,
    openProduct
  } = useApp();

  // If user hasn't selected items, show default sample comparison
  const displayItems: Product[] = compareList.length > 0
    ? compareList
    : products.slice(0, 3); // Sample first 3 available items

  const isDefaultSample = compareList.length === 0;

  return (
    <section id="compare" className="py-16 bg-[#f8fafc] border-b border-[#e7e9ef]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7a00] uppercase tracking-wider mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Side-by-Side Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172033]">
              Product comparison
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isDefaultSample
                ? 'Sample comparison of top-rated items. Click "Compare" on any product card above to customise this matrix.'
                : `Comparing ${compareList.length} shortlisted items side-by-side.`}
            </p>
          </div>

          {!isDefaultSample && (
            <button
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear comparison</span>
            </button>
          )}
        </div>

        {/* Matrix Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 w-44 font-bold text-slate-700 text-xs uppercase tracking-wider">
                    Model
                  </th>
                  {displayItems.map((p) => (
                    <th key={p.id} className="p-4 font-bold text-slate-900 relative">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">
                                {p.icon}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-xs text-[#9a4b00] font-semibold">{p.categoryLabel}</div>
                            <div className="text-sm font-bold text-[#172033] line-clamp-1">{p.brand} {p.name}</div>
                          </div>
                        </div>
                        {!isDefaultSample && (
                          <button
                            onClick={() => toggleCompare(p)}
                            title="Remove item"
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Price in GBP */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    UK Price
                  </td>
                  {displayItems.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="text-lg font-extrabold text-[#172033]">
                        £{p.priceGbp.toFixed(2)}
                      </div>
                      {p.originalPriceGbp && (
                        <div className="text-xs text-emerald-600 font-medium">
                          {p.dealTag || 'On Sale'}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    Rating & Reviews
                  </td>
                  {displayItems.map((p) => (
                    <td key={p.id} className="p-4 text-xs">
                      <div className="font-bold text-slate-900">★ {p.rating} / 5.0</div>
                      <div className="text-slate-400">{p.reviewCount.toLocaleString('en-GB')} reviews</div>
                    </td>
                  ))}
                </tr>

                {/* Award / Best For */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    Award & Best For
                  </td>
                  {displayItems.map((p) => (
                    <td key={p.id} className="p-4 text-xs font-medium text-slate-700">
                      {p.awards ? (
                        <span className="font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                          {p.awards}
                        </span>
                      ) : (
                        <span>Top rated in {p.categoryLabel}</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* UK Specific Features */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    UK Suitability
                  </td>
                  {displayItems.map((p) => (
                    <td key={p.id} className="p-4 text-xs text-slate-600 space-y-1">
                      {p.ukFeatures.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Top Pros */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    Key Strengths
                  </td>
                  {displayItems.map((p) => (
                    <td key={p.id} className="p-4 text-xs text-slate-700">
                      <ul className="space-y-1">
                        {p.pros.slice(0, 2).map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-emerald-500 font-bold">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Trade-offs / Cons */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    Trade-offs
                  </td>
                  {displayItems.map((p) => (
                    <td key={p.id} className="p-4 text-xs text-slate-500">
                      <ul className="space-y-1">
                        {p.cons.slice(0, 2).map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-rose-400 font-bold">-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4 font-semibold text-slate-600 text-xs bg-slate-50/50">
                    Action
                  </td>
                  {displayItems.map((p) => {
                    const amazonUrl = getAmazonUrl(p);
                    return (
                      <td key={p.id} className="p-4 space-y-2">
                        <a
                          href={amazonUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          onClick={(e) => handleAffiliateClick(e, p)}
                          className="w-full flex items-center justify-center gap-1.5 bg-[#ff9900] hover:bg-[#ffad32] text-slate-950 font-bold py-2.5 px-3 rounded-lg text-xs transition-colors shadow-xs"
                        >
                          <span>Check price</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => openProduct(p)}
                          className="w-full text-center text-xs text-slate-600 hover:text-slate-900 py-1 font-medium cursor-pointer"
                        >
                          Specs & verdict →
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
