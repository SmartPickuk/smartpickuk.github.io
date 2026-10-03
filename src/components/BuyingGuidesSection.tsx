import React, { useState } from 'react';
import { guidesData } from '../data/guidesData';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { BuyingGuide } from '../types';

export const BuyingGuidesSection: React.FC = () => {
  const { openGuide, guides } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredGuides = activeTab === 'all'
    ? guides
    : guides.filter(g => g.categorySlug === activeTab);

  return (
    <section id="guides" className="py-16 bg-[#f6f7fb]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7a00] uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Independent Research</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172033]">
              Latest buying guides
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Original, human-curated guides designed to help UK shoppers make informed choices without marketing hype.
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#e2e8f0]'
              }`}
            >
              All Guides ({guidesData.length})
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'audio'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#e2e8f0]'
              }`}
            >
              Audio
            </button>
            <button
              onClick={() => setActiveTab('kitchen')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'kitchen'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#e2e8f0]'
              }`}
            >
              Kitchen
            </button>
            <button
              onClick={() => setActiveTab('travel')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'travel'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#e2e8f0]'
              }`}
            >
              Travel
            </button>
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'cleaning'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#e2e8f0]'
              }`}
            >
              Cleaning
            </button>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide: BuyingGuide) => (
            <article
              key={guide.id}
              onClick={() => openGuide(guide)}
              className="group bg-white border border-[#e7e9ef] hover:border-[#ff7a00]/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Visual Thumbnail with Real Image */}
              <div className="h-48 overflow-hidden relative border-b border-[#f1f3f9] bg-slate-100">
                {guide.imageUrl ? (
                  <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-[#f2f4f7] to-[#e8edf6]">
                    <span className="transform group-hover:scale-110 transition-transform duration-300">
                      {guide.icon}
                    </span>
                  </div>
                )}
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />

                {/* Quiet text kicker instead of pill */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-bold text-slate-800 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/80 shadow-xs">
                  <span>{guide.category}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <Clock className="w-3 h-3 text-[#ff7a00]" />
                    {guide.readTime}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#172033] group-hover:text-[#ff7a00] transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {guide.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#d85d00] group-hover:text-[#ff7a00] group-hover:translate-x-1 transition-all">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
