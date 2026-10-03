import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { openModal } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff6ec] to-[#f2f6ff] py-14 sm:py-20 border-b border-[#e7e9ef]">
      {/* Subtle ambient blur behind */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#fff1e3] text-[#9a4b00] border border-[#ffd8ae] rounded-full px-3.5 py-1 text-xs font-bold tracking-wide">
              <span>🇬🇧</span>
              <span>Made for UK shoppers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight leading-[1.08]">
              Find better products <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#172033] via-[#ff7a00] to-[#d85d00]">
                before you buy.
              </span>
            </h1>

            <p className="text-lg text-[#475467] leading-relaxed max-w-xl">
              Practical UK product guides, real-world comparisons, and honest buying advice to help you choose confidently — without the marketing guesswork.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#guides"
                className="inline-flex items-center justify-center gap-2 bg-[#ff7a00] hover:bg-[#e06900] text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all text-sm group"
              >
                <span>Explore buying guides</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#172033] font-bold px-6 py-3.5 rounded-xl border border-[#d9dde6] shadow-xs hover:border-slate-400 transition-all text-sm"
              >
                <span>See featured products</span>
              </a>

              <a
                href="#compare"
                className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-[#ff7a00] font-semibold px-4 py-3 text-sm transition-colors"
              >
                <span>Side-by-side compare →</span>
              </a>
            </div>

            {/* Affiliate Disclosure Box */}
            <div className="bg-[#fff8ef] border border-[#ffdcb4] rounded-xl p-4 text-xs text-[#69400f] flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#ff7a00] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p>
                  <strong>Affiliate disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. Some links on this website may be paid affiliate links at no added cost to you.
                </p>
                <button
                  onClick={() => openModal('affiliate')}
                  className="text-[#9a4b00] underline font-semibold hover:text-black transition-colors"
                >
                  Read full transparency statement & methodology →
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#111827] text-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-800 overflow-hidden">
              {/* Card visual accent orb */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ff7a00]/25 blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">SmartPick Guarantee</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">What you'll find here</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                    🇬🇧
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800/80 text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      In-depth UK buying guides
                    </span>
                    <strong className="text-white font-semibold">100% Free</strong>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800/80 text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Product comparisons
                    </span>
                    <strong className="text-white font-semibold">Side-by-side</strong>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800/80 text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Unbiased pros & cons
                    </span>
                    <strong className="text-white font-semibold">No fluff</strong>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800/80 text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      UK-focused advice & 3-pin plugs
                    </span>
                    <strong className="text-white font-semibold">Verified</strong>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-xl p-3.5 text-xs text-slate-300 border border-slate-700/60 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    Prices and availability change dynamically on Amazon UK. Always confirm current live pricing and delivery options before finalizing purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
