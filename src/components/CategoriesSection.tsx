import React from 'react';
import { Link } from 'react-router';
import { useApp } from '../context/AppContext';

export const CategoriesSection: React.FC = () => {
  const { products } = useApp();

  const categories = [
    {
      id: 'audio',
      name: 'Audio & Headphones',
      icon: '🎧',
      count: 'Audio picks',
    },
    {
      id: 'kitchen',
      name: 'Home & Kitchen',
      icon: '🏠',
      count: 'Kitchen picks',
    },
    {
      id: 'travel',
      name: 'Travel & Power',
      icon: '🔋',
      count: 'Travel picks',
    },
    {
      id: 'cleaning',
      name: 'Cleaning & Vacs',
      icon: '🧹',
      count: 'Cleaning picks',
    },
    {
      id: 'office',
      name: 'Home Office',
      icon: '🪑',
      count: 'Office picks',
    },
  ];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#f59e0b] mb-2">
              Shop smarter
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172033]">
              Shop by category
            </h2>

            <p className="mt-2 text-slate-600 max-w-2xl">
              Choose a category to explore the relevant SmartPick products.
            </p>
          </div>

          <Link
            to="/"
            className="text-sm font-bold text-[#172033] hover:text-[#f59e0b] transition-colors"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const productCount = products.filter(
              (product) => product.category === cat.id
            ).length;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group text-left rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-white hover:border-amber-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-3xl mb-4">
                  {cat.icon}
                </div>

                <h3 className="font-extrabold text-[#172033] group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {productCount > 0
                    ? `${productCount} products`
                    : cat.count}
                </p>

                <div className="mt-4 text-xs font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore category →
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;
