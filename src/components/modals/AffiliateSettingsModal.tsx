import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { productsData } from '../../data/productsData';
import { X, Settings, ShieldCheck, Check, ExternalLink, Copy, HelpCircle } from 'lucide-react';

export const AffiliateSettingsModal: React.FC = () => {
  const { activeModal, closeModal, associateTag, setAssociateTag, showNotification } = useApp();
  const [tagInput, setTagInput] = useState(associateTag || 'smartpickuk-21');
  const [copied, setCopied] = useState(false);

  if (activeModal !== 'affiliateSettings') return null;

  const sampleAsin = productsData[0].asin;
  const sampleUrl = `https://www.amazon.co.uk/dp/${sampleAsin}?tag=${encodeURIComponent(tagInput || 'YOUR_TAG')}&linkCode=osi&th=1`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAssociateTag(tagInput);
    closeModal();
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleUrl);
    setCopied(true);
    showNotification('Sample Amazon UK affiliate URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Amazon Associates Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Publisher Affiliate Tag Management
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto text-sm text-slate-600">
          
          <div className="bg-[#fff8ef] border border-[#ffdcb4] rounded-2xl p-4 text-xs text-[#69400f] space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff7a00]" />
              <span>Amazon Associates Central UK Guidelines</span>
            </div>
            <p className="leading-relaxed">
              To earn commissions on qualifying purchases, replace the default placeholder tag with your approved Associate Store ID (e.g. <code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">yourstore-21</code>) from Amazon UK Associates Central.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Your Amazon UK Associates Tracking ID / Tag
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. smartpickuk-21"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-[#ff7a00] hover:bg-[#e06900] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer transition-colors"
                >
                  Save Tag
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Saved in your browser localStorage. All "Check price on Amazon" links across the site will immediately apply this tag.
              </p>
            </div>
          </form>

          {/* Live Preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Live Generated Link Preview
            </span>
            <div className="bg-slate-900 rounded-xl p-3 text-xs font-mono text-emerald-400 break-all select-all flex items-center justify-between gap-3 border border-slate-800">
              <span className="truncate">{sampleUrl}</span>
              <button
                onClick={handleCopySample}
                className="flex-shrink-0 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                title="Copy sample URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <a
                href={sampleUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs text-[#ff7a00] font-semibold hover:underline"
              >
                <span>Test this live link in new tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-slate-400">Target: Amazon.co.uk</span>
            </div>
          </div>

          {/* UK ASA Disclosure Checklist */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>UK ASA (Advertising Standards Authority) Compliance</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Under UK CAP rules, all affiliate links on SmartPick UK are automatically marked with <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">rel="nofollow sponsored noopener"</code> and supported by top-of-page and in-card disclosures to protect both you and your readers.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#111827] hover:bg-[#ff7a00] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
