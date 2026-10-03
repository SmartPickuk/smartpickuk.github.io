import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, X, KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, setIsAdminLoginModalOpen, loginAdmin } = useApp();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const success = loginAdmin(passcode);
    if (!success) {
      setError(true);
    } else {
      setPasscode('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminLoginModalOpen(false);
      }}
    >
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <button
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Owner Authentication
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Enter your secret admin passcode to manage rates, inventory, and affiliate links.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full bg-slate-50 border ${
                  error ? 'border-rose-500 ring-2 ring-rose-200' : 'border-slate-300 focus:border-[#ff7a00]'
                } rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-hidden pr-10`}
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            {error && (
              <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 pt-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Please try again.</span>
              </p>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 space-y-1">
            <div className="font-semibold text-slate-700">Default owner passcode: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold text-slate-800">admin123</code></div>
            <div className="text-[10px] text-slate-400">You can customize this passcode inside the Admin Dashboard.</div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#111827] hover:bg-[#ff7a00] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Unlock Admin Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
