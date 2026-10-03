import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BuyingGuide, SiteSettings } from '../types';
import { productsData as defaultProductsData } from '../data/productsData';
import { guidesData as defaultGuidesData } from '../data/guidesData';

interface AppContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  guides: BuyingGuide[];
  updateGuide: (id: string, updated: Partial<BuyingGuide>) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  activeGuide: BuyingGuide | null;
  openGuide: (guide: BuyingGuide) => void;
  closeGuide: () => void;
  activeProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  activeModal: 'about' | 'privacy' | 'terms' | 'affiliate' | 'affiliateSettings' | 'compare' | null;
  openModal: (modal: 'about' | 'privacy' | 'terms' | 'affiliate' | 'affiliateSettings' | 'compare') => void;
  closeModal: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPasscode: (newPasscode: string) => void;
  associateTag: string;
  setAssociateTag: (tag: string) => void;
  getAmazonUrl: (product: Product) => string;
  handleAffiliateClick: (e: React.MouseEvent, product: Product) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  resetAllDataToDefault: () => void;
}

const defaultSettings: SiteSettings = {
  associateTag: 'smartpickuk-21',
  marketplace: 'amazon.co.uk',
  currencySymbol: '£',
  buyButtonText: 'Check price on Amazon',
  siteName: 'SmartPick UK',
  siteTagline: 'Independent UK buying guides & product research',
  contactEmail: 'editorial@smartpick.co.uk'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('smartpick_products_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return defaultProductsData;
  });

  // Guides state with localStorage persistence
  const [guides, setGuides] = useState<BuyingGuide[]>(() => {
    try {
      const saved = localStorage.getItem('smartpick_guides_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading guides from localStorage', e);
    }
    return defaultGuidesData;
  });

  // Site settings with localStorage persistence
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('smartpick_site_settings');
      if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
      const oldTag = localStorage.getItem('smartpick_associate_tag');
      if (oldTag) return { ...defaultSettings, associateTag: oldTag };
    } catch (e) {
      console.error('Error loading site settings', e);
    }
    return defaultSettings;
  });

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('smartpick_admin_auth') === 'true';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('smartpick_admin_passcode') || 'admin123';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [activeGuide, setActiveGuide] = useState<BuyingGuide | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | 'affiliate' | 'affiliateSettings' | 'compare' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartpick_products_data', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Sync guides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartpick_guides_data', JSON.stringify(guides));
    } catch (e) {
      console.error('Failed to save guides to localStorage', e);
    }
  }, [guides]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartpick_site_settings', JSON.stringify(siteSettings));
      localStorage.setItem('smartpick_associate_tag', siteSettings.associateTag);
    } catch (e) {
      console.error('Failed to save site settings', e);
    }
  }, [siteSettings]);

  // Keyboard shortcut listener: Ctrl + Shift + A or Cmd + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (sessionStorage.getItem('smartpick_admin_auth') === 'true') {
          setIsAdminOpen((prev) => !prev);
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check URL query param e.g. "?admin" or "#admin" on load
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('admin') || window.location.hash.toLowerCase().includes('admin')) {
      if (sessionStorage.getItem('smartpick_admin_auth') === 'true') {
        setIsAdminOpen(true);
      } else {
        setIsAdminLoginModalOpen(true);
      }
    }
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const loginAdmin = (enteredPasscode: string): boolean => {
    if (enteredPasscode.trim() === adminPasscode.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('smartpick_admin_auth', 'true');
      setIsAdminLoginModalOpen(false);
      setIsAdminOpen(true);
      showNotification('Admin authentication successful. Welcome back!');
      return true;
    }
    showNotification('Incorrect passcode. Access denied.');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    sessionStorage.removeItem('smartpick_admin_auth');
    showNotification('Admin logged out successfully. Public mode restored.');
  };

  const changeAdminPasscode = (newPasscode: string) => {
    const clean = newPasscode.trim();
    if (clean.length < 4) {
      showNotification('Passcode must be at least 4 characters');
      return;
    }
    setAdminPasscode(clean);
    localStorage.setItem('smartpick_admin_passcode', clean);
    showNotification('Admin passcode updated successfully!');
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`Added new product: "${newProduct.name}"`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const merged = { ...p, ...updated };
          if (activeProduct && activeProduct.id === id) {
            setActiveProduct(merged);
          }
          return merged;
        }
        return p;
      })
    );
    showNotification('Product details updated successfully');
  };

  const deleteProduct = (id: string) => {
    const toDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCompareList((prev) => prev.filter((p) => p.id !== id));
    if (activeProduct && activeProduct.id === id) {
      setActiveProduct(null);
    }
    showNotification(`Deleted product: "${toDelete?.name || id}"`);
  };

  const updateGuide = (id: string, updated: Partial<BuyingGuide>) => {
    setGuides((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const merged = { ...g, ...updated };
          if (activeGuide && activeGuide.id === id) {
            setActiveGuide(merged);
          }
          return merged;
        }
        return g;
      })
    );
    showNotification('Buying guide updated successfully');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    showNotification('Admin settings saved successfully');
  };

  const setAssociateTag = (tag: string) => {
    const cleanTag = tag.trim();
    updateSiteSettings({ associateTag: cleanTag });
    showNotification(`Amazon Associate tag updated: ${cleanTag}`);
  };

  const resetAllDataToDefault = () => {
    setProducts(defaultProductsData);
    setGuides(defaultGuidesData);
    setSiteSettings(defaultSettings);
    localStorage.removeItem('smartpick_products_data');
    localStorage.removeItem('smartpick_guides_data');
    localStorage.removeItem('smartpick_site_settings');
    localStorage.removeItem('smartpick_associate_tag');
    showNotification('All data & settings reset to default state');
  };

  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showNotification(`Removed "${product.brand} ${product.name.split(' ')[0]}" from comparison`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showNotification('Comparison limit reached (max 3 items)');
        return prev;
      }
      showNotification(`Added "${product.brand} ${product.name.split(' ')[0]}" to comparison`);
      return [...prev, product];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    showNotification('Cleared comparison list');
  };

  const openGuide = (guide: BuyingGuide) => {
    setActiveGuide(guide);
  };

  const closeGuide = () => {
    setActiveGuide(null);
  };

  const openProduct = (product: Product) => {
    setActiveProduct(product);
  };

  const closeProduct = () => {
    setActiveProduct(null);
  };

  const openModal = (modal: 'about' | 'privacy' | 'terms' | 'affiliate' | 'affiliateSettings' | 'compare') => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getAmazonUrl = (product: Product) => {
    if (product.affiliateUrlOverride && product.affiliateUrlOverride.trim().length > 0) {
      return product.affiliateUrlOverride.trim();
    }
    const tag = siteSettings.associateTag ? `tag=${encodeURIComponent(siteSettings.associateTag)}` : 'tag=smartpickuk-21';
    const domain = siteSettings.marketplace || 'amazon.co.uk';
    return `https://www.${domain}/dp/${product.asin}?${tag}&linkCode=osi&th=1`;
  };

  const handleAffiliateClick = (e: React.MouseEvent, product: Product) => {
    if (!siteSettings.associateTag || siteSettings.associateTag === 'YOUR_ASSOCIATE_TAG') {
      e.preventDefault();
      openModal('affiliateSettings');
      showNotification('Configure your Amazon Associates tracking ID to connect live referral links.');
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        guides,
        updateGuide,
        siteSettings,
        updateSiteSettings,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        compareList,
        toggleCompare,
        clearCompare,
        activeGuide,
        openGuide,
        closeGuide,
        activeProduct,
        openProduct,
        closeProduct,
        activeModal,
        openModal,
        closeModal,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        loginAdmin,
        logoutAdmin,
        changeAdminPasscode,
        associateTag: siteSettings.associateTag,
        setAssociateTag,
        getAmazonUrl,
        handleAffiliateClick,
        notification,
        showNotification,
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
