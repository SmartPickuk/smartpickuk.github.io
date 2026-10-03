import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Settings, Heart, Scale, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openModal, associateTag, setIsAdminOpen, isAdminAuthenticated, setIsAdminLoginModalOpen } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="bg-white border-t border-[#e7e9ef] pt-14 pb-10 text-sm">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#111827] text-white flex items-center justify-center font-black text-lg">
                S
              </div>
              <div className="text-xl font-black tracking-tight text-[#172033]">
                Smart<span className="text-[#ff7a00]">Pick</span> <span className="text-xs bg-slate-100 font-bold px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">UK</span>
              </div>
            </div>
            
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Independent-style product research, direct comparisons, and honest buying advice tailored specifically for UK shoppers, living spaces, and domestic standards.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <button
                onClick={() => openModal('affiliateSettings')}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-amber-600" />
                <span>Tag: <strong className="font-mono">{associateTag || 'smartpickuk-21'}</strong></span>
              </button>
              {isAdminAuthenticated && (
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-[#111827] text-white hover:bg-[#ff7a00] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Admin Mode</span>
                </button>
              )}
            </div>
          </div>

          {/* Explore Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#guides" className="hover:text-[#ff7a00] transition-colors">Buying Guides</a></li>
              <li><a href="#products" className="hover:text-[#ff7a00] transition-colors">Top Picks</a></li>
              <li><a href="#categories" className="hover:text-[#ff7a00] transition-colors">Categories</a></li>
              <li><a href="#deals" className="hover:text-[#ff7a00] transition-colors">Today's Deals</a></li>
              <li><a href="#compare" className="hover:text-[#ff7a00] transition-colors">Product Comparison</a></li>
            </ul>
          </div>

          {/* Information Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => openModal('about')}
                  className="hover:text-[#ff7a00] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('privacy')}
                  className="hover:text-[#ff7a00] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('terms')}
                  className="hover:text-[#ff7a00] transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#ff7a00] transition-colors">
                  Review Methodology
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Compliance Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Editorial & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => openModal('affiliate')}
                  className="text-amber-800 font-semibold hover:text-[#ff7a00] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Affiliate Disclosure</span>
                </button>
              </li>
              <li>
                <a
                  href="mailto:editorial@smartpick.co.uk"
                  className="hover:text-[#ff7a00] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>editorial@smartpick.co.uk</span>
                </a>
              </li>
              <li className="text-[11px] text-slate-400 pt-1 leading-normal">
                London, United Kingdom. Editorial office and product evaluation lab.
              </li>
            </ul>
          </div>

        </div>

        {/* Amazon Associate Disclosure Legal Notice */}
        <div className="border-t border-[#e7e9ef] pt-8 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-[11px] text-slate-500 leading-relaxed">
            <p>
              <strong className="text-slate-800">Amazon Associate disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. Affiliate links may earn us a commission at no additional cost to you. Product prices and availability can change; the retailer's current price and terms at the time of purchase apply. This website is not affiliated with or endorsed by Amazon unless explicitly stated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <span>© {currentYear} SmartPick UK. All rights reserved.</span>
              <button
                onClick={() => {
                  if (isAdminAuthenticated) {
                    setIsAdminOpen(true);
                  } else {
                    setIsAdminLoginModalOpen(true);
                  }
                }}
                className="opacity-20 hover:opacity-100 text-slate-500 hover:text-slate-800 transition-opacity p-1 cursor-pointer"
                title="Staff Portal (Ctrl+Shift+A)"
                aria-label="Staff Login"
              >
                <Lock className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Consumer Rights Act 2015 Compliant</span>
              <span>·</span>
              <span>UK Advertising Standards (CAP Code) Compliant</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
