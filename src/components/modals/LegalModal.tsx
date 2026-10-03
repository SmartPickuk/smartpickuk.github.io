import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { staticLegalContent } from '../../data/methodologyData';
import { X, Shield } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  if (!activeModal || ['affiliateSettings', 'compare'].includes(activeModal)) {
    return null;
  }

  const modalData = staticLegalContent[activeModal as keyof typeof staticLegalContent];
  if (!modalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff7a00] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {modalData.title}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div
          className="p-6 sm:p-8 overflow-y-auto text-sm text-slate-600 leading-relaxed space-y-4 prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-[#ff7a00]"
          dangerouslySetInnerHTML={{ __html: modalData.content }}
        />

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-400">
          <span>SmartPick UK · Independent Consumer Research</span>
          <button
            onClick={closeModal}
            className="bg-[#111827] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#ff7a00] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
