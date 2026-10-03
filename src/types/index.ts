export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'audio' | 'kitchen' | 'travel' | 'cleaning' | 'office' | 'electronics';
  categoryLabel: string;
  icon: string;
  imageUrl?: string;
  tagline: string;
  description: string;
  rating: number; // e.g. 4.8
  reviewCount: number;
  priceGbp: number;
  originalPriceGbp?: number;
  dealTag?: string; // e.g. "Save 22%"
  asin: string;
  awards?: string; // e.g. "Best Overall 2026", "Top Value Pick", "Premium Pick"
  specs: { [key: string]: string };
  pros: string[];
  cons: string[];
  verdict: string;
  ukFeatures: string[]; // e.g. ["UK 3-pin plug included", "Dishwasher safe for standard UK dishwashers"]
  inStock: boolean;
  stockCount?: number; // Pcs / available stock quantity
  affiliateUrlOverride?: string; // Custom affiliate / product link override
  featuredInGuideId?: string;
}

export interface SiteSettings {
  associateTag: string;
  marketplace: string;
  currencySymbol: string;
  buyButtonText: string;
  siteName: string;
  siteTagline: string;
  contactEmail: string;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: 'audio' | 'kitchen' | 'travel' | 'cleaning' | 'office' | 'electronics';
  icon: string;
  imageUrl?: string;
  readTime: string;
  date: string;
  summary: string;
  intro: string;
  checklist: string[];
  ukConsiderations: {
    title: string;
    description: string;
  }[];
  whatToLookFor: {
    heading: string;
    body: string;
  }[];
  recommendedProductIds: string[];
  buyingMistakes: string[];
}

export interface ReviewMethodologyPoint {
  icon: string;
  title: string;
  description: string;
  details: string;
}
