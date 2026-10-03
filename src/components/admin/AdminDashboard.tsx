import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, BuyingGuide, SiteSettings } from '../../types';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Save,
  RotateCcw,
  Download,
  Upload,
  Check,
  Search,
  PackageCheck,
  AlertCircle,
  SlidersHorizontal,
  DollarSign,
  Link,
  BookOpen,
  Mail,
  Shield,
  Layers,
  Sparkles,
  Eye,
  Lock,
  KeyRound
} from 'lucide-react';

const availableImages = [
  { label: 'Wireless Headphones', url: '/src/assets/images/headphones_wireless_1791023330339.jpg' },
  { label: 'Kitchen Air Fryer', url: '/src/assets/images/air_fryer_kitchen_1791023346683.jpg' },
  { label: 'Portable Power Bank', url: '/src/assets/images/power_bank_travel_1791023360064.jpg' },
  { label: 'Smart Robot Vacuum', url: '/src/assets/images/robot_vacuum_cleaner_1791023372958.jpg' },
  { label: 'Espresso Coffee Machine', url: '/src/assets/images/espresso_coffee_machine_1791023387623.jpg' },
  { label: 'Ergonomic Office Chair', url: '/src/assets/images/ergonomic_office_chair_1791023399700.jpg' },
];

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    guides,
    updateGuide,
    siteSettings,
    updateSiteSettings,
    isAdminOpen,
    setIsAdminOpen,
    logoutAdmin,
    changeAdminPasscode,
    getAmazonUrl,
    showNotification,
    resetAllDataToDefault
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'guides' | 'subscribers' | 'backup'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [editingGuide, setEditingGuide] = useState<BuyingGuide | null>(null);
  const [passcodeInput, setPasscodeInput] = useState('');

  // Subscribers list from localStorage
  const [subscribers, setSubscribers] = useState<{ email: string; date: string }[]>([]);

  useEffect(() => {
    if (isAdminOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('smartpick_subscribers') || '[]');
        setSubscribers(stored);
      } catch (e) {
        setSubscribers([]);
      }
    }
  }, [isAdminOpen, activeTab]);

  if (!isAdminOpen) return null;

  // Filter products by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.asin.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Settings form state
  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSiteSettings({
      associateTag: formData.get('associateTag') as string,
      marketplace: formData.get('marketplace') as string,
      currencySymbol: formData.get('currencySymbol') as string,
      buyButtonText: formData.get('buyButtonText') as string,
      siteName: formData.get('siteName') as string,
      contactEmail: formData.get('contactEmail') as string,
    });
  };

  // Export JSON backup
  const handleExportJson = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      siteSettings,
      products,
      guides,
      subscribers
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartpick-uk-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Backup JSON exported successfully');
  };

  // Import JSON backup
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && Array.isArray(parsed.products)) {
          parsed.products.forEach((p: Product) => {
            updateProduct(p.id, p);
          });
        }
        if (parsed.siteSettings) {
          updateSiteSettings(parsed.siteSettings);
        }
        showNotification('Data backup imported successfully!');
      } catch (err) {
        showNotification('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  const handleStartCreateProduct = () => {
    const newTemplate: Product = {
      id: `prod-${Date.now()}`,
      name: 'New UK Product Name',
      brand: 'Brand',
      category: 'electronics',
      categoryLabel: 'Electronics',
      icon: '📦',
      imageUrl: availableImages[0].url,
      tagline: 'Short description highlighting top benefits for UK shoppers',
      description: 'Comprehensive product description and testing verdict.',
      rating: 4.7,
      reviewCount: 120,
      priceGbp: 49.99,
      originalPriceGbp: 69.99,
      dealTag: 'Save 28%',
      asin: 'B0EXAMPLE',
      stockCount: 50,
      inStock: true,
      awards: 'Top Value Pick',
      specs: {
        'Power': 'Standard UK 240V',
        'Warranty': '2 Year UK Manufacturer Guarantee'
      },
      pros: ['Great build quality', 'Excellent value for money in the UK'],
      cons: ['Slight learning curve'],
      verdict: 'A dependable, well-tested pick that delivers great value.',
      ukFeatures: ['Fitted with standard UK 3-pin plug (BS 1363)'],
      affiliateUrlOverride: ''
    };
    setEditingProduct(newTemplate);
    setIsCreatingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isCreatingProduct) {
      addProduct(editingProduct);
    } else {
      updateProduct(editingProduct.id, editingProduct);
    }
    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Admin Header */}
        <div className="px-6 py-4 bg-[#111827] text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff7a00] text-white flex items-center justify-center font-black shadow-md">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  SmartPick UK Admin Control Center
                </h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE EDITING ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage rates, stock (pcs), affiliate links, guides, and store settings in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>View Website</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-rose-800/80 shadow-xs"
              title="Lock Admin Panel & Logout"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock & Logout</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="px-6 py-2.5 bg-slate-100/80 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-white text-[#172033] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#ff7a00]" />
            <span>Products, Rates & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-white text-[#172033] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link className="w-4 h-4 text-amber-500" />
            <span>Amazon Links & Tag Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'guides'
                ? 'bg-white text-[#172033] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Buying Guides ({guides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'subscribers'
                ? 'bg-white text-[#172033] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4 text-purple-500" />
            <span>Newsletter Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'backup'
                ? 'bg-white text-[#172033] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Tab 1: Products, Rates & Stock */}
        {activeTab === 'products' && (
          <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
            
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="search"
                  placeholder="Search products by name, ASIN or brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-hidden focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              <button
                onClick={handleStartCreateProduct}
                className="inline-flex items-center justify-center gap-2 bg-[#ff7a00] hover:bg-[#e06900] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="flex-1 border border-slate-200 rounded-2xl overflow-auto bg-white shadow-2xs">
              <table className="w-full text-left text-xs border-collapse min-w-[800px]">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                  <tr>
                    <th className="p-3 w-16">Image</th>
                    <th className="p-3">Product Name & Category</th>
                    <th className="p-3 w-32">Rate / Price (£)</th>
                    <th className="p-3 w-32">Stock (Pcs)</th>
                    <th className="p-3 w-36">ASIN & Affiliate Link</th>
                    <th className="p-3 w-28 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                    const amazonLink = getAmazonUrl(p);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Image */}
                        <td className="p-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">{p.icon}</div>
                            )}
                          </div>
                        </td>

                        {/* Name & Brand */}
                        <td className="p-3">
                          <div className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</div>
                          <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                            <span className="font-semibold text-[#9a4b00]">{p.brand}</span>
                            <span>·</span>
                            <span>{p.categoryLabel}</span>
                            {p.dealTag && (
                              <>
                                <span>·</span>
                                <span className="text-emerald-600 font-bold">{p.dealTag}</span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Rate / Price Editor */}
                        <td className="p-3">
                          <div className="font-black text-slate-900 text-sm">
                            £{p.priceGbp.toFixed(2)}
                          </div>
                          {p.originalPriceGbp && (
                            <div className="text-[11px] text-slate-400 line-through">
                              RRP £{p.originalPriceGbp.toFixed(2)}
                            </div>
                          )}
                        </td>

                        {/* Stock / Pcs status */}
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                                p.inStock
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                            {p.stockCount !== undefined && (
                              <span className="text-slate-600 font-medium text-[11px]">
                                {p.stockCount} pcs
                              </span>
                            )}
                          </div>
                        </td>

                        {/* ASIN / Link */}
                        <td className="p-3">
                          <div className="font-mono text-slate-700 font-bold">{p.asin}</div>
                          <a
                            href={amazonLink}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-[11px] text-[#ff7a00] hover:underline mt-0.5"
                          >
                            <span>Test Live Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsCreatingProduct(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer inline-flex"
                            title="Edit Product, Rate & Link"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer inline-flex"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Settings & Affiliate Links */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-auto p-6 sm:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="bg-[#fff8ef] border border-[#ffdcb4] rounded-2xl p-4 text-xs text-[#69400f] space-y-1">
                <h3 className="font-bold text-sm text-[#9a4b00] flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  <span>Monetization & Amazon Referral Configuration</span>
                </h3>
                <p>
                  Any updates to your Associates tag or marketplace domain immediately apply across all "Check price on Amazon" links and widgets.
                </p>
              </div>

              <form onSubmit={handleSettingsSubmit} className="space-y-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs">
                
                {/* Associate Tag */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">
                    Amazon Associates Tracking Tag (Store ID)
                  </label>
                  <input
                    type="text"
                    name="associateTag"
                    defaultValue={siteSettings.associateTag}
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 font-mono text-sm text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                  <p className="text-[11px] text-slate-400">
                    Your approved tracking ID from Amazon Associates Central UK (e.g. <code>smartpickuk-21</code>).
                  </p>
                </div>

                {/* Marketplace Domain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider block">
                      Marketplace Domain
                    </label>
                    <select
                      name="marketplace"
                      defaultValue={siteSettings.marketplace}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden cursor-pointer"
                    >
                      <option value="amazon.co.uk">Amazon United Kingdom (amazon.co.uk)</option>
                      <option value="amazon.com">Amazon USA (amazon.com)</option>
                      <option value="amazon.de">Amazon Germany (amazon.de)</option>
                      <option value="amazon.ca">Amazon Canada (amazon.ca)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider block">
                      Currency Symbol
                    </label>
                    <input
                      type="text"
                      name="currencySymbol"
                      defaultValue={siteSettings.currencySymbol}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                    />
                  </div>
                </div>

                {/* Button Text */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">
                    Affiliate Button Call to Action Label
                  </label>
                  <input
                    type="text"
                    name="buyButtonText"
                    defaultValue={siteSettings.buyButtonText}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                  <p className="text-[11px] text-slate-400">
                    Text displayed on orange affiliate CTA buttons (e.g. "Check price on Amazon", "View Deal on Amazon UK").
                  </p>
                </div>

                {/* Site Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider block">
                      Site Brand Name
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      defaultValue={siteSettings.siteName}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider block">
                      Editorial Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      defaultValue={siteSettings.contactEmail}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#111827] hover:bg-[#ff7a00] text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-md"
                  >
                    Save All Settings
                  </button>
                </div>

              </form>

              {/* Security & Admin Passcode Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Owner Security & Access Passcode</h4>
                    <p className="text-slate-500 text-[11px]">Change the private password required to unlock this Admin Panel.</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (passcodeInput.trim()) {
                      changeAdminPasscode(passcodeInput);
                      setPasscodeInput('');
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <input
                    type="password"
                    placeholder="Enter new admin passcode (min 4 characters)..."
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                  <button
                    type="submit"
                    className="bg-[#111827] hover:bg-[#ff7a00] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    Update Passcode
                  </button>
                </form>
                
                <p className="text-[11px] text-slate-400">
                  Tip: Normal visitors cannot see this panel. You can trigger it anytime with <kbd className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">Ctrl + Shift + A</kbd> or typing <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">?admin</code> in the browser URL.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Buying Guides */}
        {activeTab === 'guides' && (
          <div className="flex-1 overflow-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Published Buying Guides & Recommendations
                </h3>
                <p className="text-xs text-slate-500">
                  Update reading times, summaries, or linked product recommendations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((g) => (
                <div key={g.id} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#ff7a00] uppercase tracking-wider">
                        {g.category}
                      </span>
                      <span className="text-xs text-slate-400">{g.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{g.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{g.summary}</p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <strong>Recommended Models:</strong> {g.recommendedProductIds.length} linked products
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setEditingGuide(g)}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Guide Meta</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="flex-1 overflow-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Newsletter & Deals Subscribers ({subscribers.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Emails submitted through the website subscription form.
                </p>
              </div>

              {subscribers.length > 0 && (
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + ["Email,Date"].concat(subscribers.map(s => `${s.email},${s.date}`)).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "smartpick_subscribers.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#111827] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#ff7a00] cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              )}
            </div>

            {subscribers.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs">
                No subscribers yet. Any submissions to the footer newsletter form will appear here.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Subscribed Date</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subscribers.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{s.email}</td>
                        <td className="p-3 text-slate-500">{new Date(s.date).toLocaleDateString('en-GB')}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              const updated = subscribers.filter((_, i) => i !== idx);
                              setSubscribers(updated);
                              localStorage.setItem('smartpick_subscribers', JSON.stringify(updated));
                              showNotification('Subscriber removed');
                            }}
                            className="text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Backup & Reset */}
        {activeTab === 'backup' && (
          <div className="flex-1 overflow-auto p-6 sm:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Backup Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#ff7a00]" />
                  <span>Export & Import Database (JSON)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download all custom rates, stock quantities, affiliate overrides, and settings in a single JSON backup file, or restore from a previous backup.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-2 bg-[#111827] hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export All Data (JSON)</span>
                  </button>

                  <label className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-blue-500" />
                    <span>Import JSON Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Default Card */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-6 space-y-3">
                <h3 className="font-bold text-sm text-rose-900 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Reset All Data to Factory Default State</span>
                </h3>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Revert all edited product prices, stock counts, affiliate tags, and guides back to the original UK default data. This cannot be undone unless you have exported a JSON backup.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (confirm('Warning: This will reset all customized product prices, stock counts, and settings back to original factory defaults. Continue?')) {
                        resetAllDataToDefault();
                      }
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Reset Everything to Defaults
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Product Edit / Create Modal Sub-Dialog */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
            
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">
                {isCreatingProduct ? 'Add New Product' : `Edit Product: ${editingProduct.name}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Name & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Product Name / Title</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Brand</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
              </div>

              {/* Category & Award */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const labels: Record<string, string> = {
                        audio: 'Audio',
                        kitchen: 'Kitchen',
                        travel: 'Travel',
                        cleaning: 'Cleaning',
                        office: 'Office',
                        electronics: 'Electronics'
                      };
                      setEditingProduct({ ...editingProduct, category: cat, categoryLabel: labels[cat] || 'Electronics' });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  >
                    <option value="audio">Audio</option>
                    <option value="kitchen">Home & Kitchen</option>
                    <option value="travel">Travel & Power</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="office">Home Office</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Award / Badge</label>
                  <input
                    type="text"
                    value={editingProduct.awards || ''}
                    placeholder="e.g. Best Overall 2026"
                    onChange={(e) => setEditingProduct({ ...editingProduct, awards: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
              </div>

              {/* Rate / Price & Original RRP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200">
                <div className="space-y-1">
                  <label className="font-bold text-amber-950 uppercase tracking-wider block">
                    Current Rate / Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.priceGbp}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setEditingProduct({ ...editingProduct, priceGbp: val });
                    }}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-950 uppercase tracking-wider block">
                    Original RRP Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.originalPriceGbp || ''}
                    placeholder="e.g. 79.99"
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || undefined;
                      setEditingProduct({ ...editingProduct, originalPriceGbp: val });
                    }}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-950 uppercase tracking-wider block">
                    Deal Tag Label
                  </label>
                  <input
                    type="text"
                    value={editingProduct.dealTag || ''}
                    placeholder="e.g. Save 25%"
                    onChange={(e) => setEditingProduct({ ...editingProduct, dealTag: e.target.value })}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
              </div>

              {/* Stock (Pcs) & In Stock toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Stock Status</label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="inStock"
                        checked={editingProduct.inStock === true}
                        onChange={() => setEditingProduct({ ...editingProduct, inStock: true })}
                      />
                      <span className="font-semibold text-emerald-700">In Stock</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="inStock"
                        checked={editingProduct.inStock === false}
                        onChange={() => setEditingProduct({ ...editingProduct, inStock: false })}
                      />
                      <span className="font-semibold text-rose-700">Out of Stock</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">
                    Available Stock Quantity (Pcs)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stockCount || ''}
                    placeholder="e.g. 45"
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
              </div>

              {/* ASIN and Affiliate Link Override */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">
                    Amazon ASIN (Product ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.asin}
                    onChange={(e) => setEditingProduct({ ...editingProduct, asin: e.target.value.trim() })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">
                    Direct Custom Link Override (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingProduct.affiliateUrlOverride || ''}
                    placeholder="https://amzn.to/..."
                    onChange={(e) => setEditingProduct({ ...editingProduct, affiliateUrlOverride: e.target.value.trim() })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
              </div>

              {/* Image Selection */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider block">
                  Product Image
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                  {availableImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, imageUrl: img.url })}
                      className={`h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        editingProduct.imageUrl === img.url ? 'border-[#ff7a00] scale-95 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  placeholder="Or enter custom image URL"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                />
              </div>

              {/* Tagline & Verdict */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider block">Short Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider block">Description & Verdict</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#111827] hover:bg-[#ff7a00] text-white px-5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  {isCreatingProduct ? 'Create Product' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Guide Edit Modal Sub-Dialog */}
      {editingGuide && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Edit Buying Guide Meta</h3>
              <button
                onClick={() => setEditingGuide(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateGuide(editingGuide.id, editingGuide);
                setEditingGuide(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider block">Guide Title</label>
                <input
                  type="text"
                  required
                  value={editingGuide.title}
                  onChange={(e) => setEditingGuide({ ...editingGuide, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Read Time</label>
                  <input
                    type="text"
                    value={editingGuide.readTime}
                    onChange={(e) => setEditingGuide({ ...editingGuide, readTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider block">Date</label>
                  <input
                    type="text"
                    value={editingGuide.date}
                    onChange={(e) => setEditingGuide({ ...editingGuide, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider block">Summary</label>
                <textarea
                  rows={3}
                  value={editingGuide.summary}
                  onChange={(e) => setEditingGuide({ ...editingGuide, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#ff7a00] outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGuide(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#111827] hover:bg-[#ff7a00] text-white px-5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
