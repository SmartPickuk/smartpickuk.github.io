import React from 'react';
import { methodologyPoints } from '../data/methodologyData';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewApproachSection: React.FC = () => {
  const { openModal } = useApp();

  return (
    <section id="reviews" className="py-16 bg-white border-b border-[#e7e9ef]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7a00] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Editorial Integrity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172033]">
              Our review approach
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              We focus on practical, actionable information for UK households rather than merely listing product specifications.
            </p>
          </div>

          <button
            onClick={() => openModal('about')}
            className="text-xs font-bold text-[#ff7a00] hover:text-[#d85d00] transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Learn more about SmartPick UK →</span>
          </button>
        </div>

        {/* 3 Grid items matching original */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methodologyPoints.map((point, index) => (
            <article
              key={index}
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-7 flex flex-col justify-between hover:bg-white hover:border-[#ff7a00]/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-3xl shadow-xs mb-5">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-[#172033] mb-2.5">
                  {point.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                  {point.description}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {point.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Standardised UK Review Metric</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
