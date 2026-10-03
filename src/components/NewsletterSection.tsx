import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showNotification } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    setSubscribed(true);
    showNotification(`Thank you! ${email} has been subscribed to UK buying guides & deal alerts.`);
    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('smartpick_subscribers') || '[]');
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem('smartpick_subscribers', JSON.stringify(existing));
    } catch (e) {
      // ignore
    }
  };

  return (
    <section className="py-14 bg-[#f6f7fb]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          {/* Subtle orb background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                <span>Weekly UK Product Digest</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get new buying guides & price drops
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                Join thousands of UK shoppers who receive our honest product breakdowns, seasonal discounts, and verified Amazon UK voucher codes.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="bg-emerald-950/80 border border-emerald-800 rounded-2xl p-6 flex items-start gap-3 text-emerald-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-base">You're on the list!</h3>
                    <p className="text-xs text-emerald-300 mt-1">
                      We've confirmed your subscription for <strong className="text-white">{email}</strong>. Check your inbox for our latest top UK picks.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ff7a00]/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-hidden transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-[#ff7a00] hover:bg-[#e06900] active:bg-[#c45b00] text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Shield className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span>No spam, strictly UK buying advice. Unsubscribe at any time with one click.</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
