import React from 'react';
import { useApp } from '../context/AppContext';

export const CategoriesSection: React.FC = () => {
  const { setSelectedCategory } = useApp();

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '💻', count: '14 Guides' },
    { id: 'kitchen', name: 'Home & Kitchen', icon: '🏠', count: '28 Guides' },
    { id: 'audio', name: 'Audio & Cans', icon: '🎧', count: '19 Guides' },
    { id: 'travel', name: 'Travel & Power', icon: '📱', count: '12 Guides' },
    { id: 'cleaning', name: 'Cleaning & Vacs', icon: '🧹', count: '10 Guides' },
    { id: 'office', name: 'Home Office', icon: '💺', count: '16 Guides' },
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-14 bg-white border-b border-[#e7e9ef]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033]">
              Shop by category
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Explore useful products across popular UK shopping categories.
            </p>
          </div>
          <a
            href="#products"
            className="text-xs font-bold text-[#ff7a00] hover:text-[#d85d00] transition-colors flex items-center gap-1"
          >
            <span>View all products →</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group bg-[#f8fafc] hover:bg-white border border-[#e2e8f0] hover:border-[#ff7a00]/40 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer flex flex-col items-center justify-center text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-orange-50 border border-slate-100 group-hover:border-orange-200 flex items-center justify-center text-3xl shadow-xs transition-colors mb-3">
                {cat.icon}
              </div>
              <strong className="block text-sm font-bold text-slate-800 group-hover:text-[#ff7a00] transition-colors">
                {cat.name}
              </strong>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
