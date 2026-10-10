export type EthnicCategory = 'Sarees' | 'Kurtas' | 'Lehengas' | 'Dupattas' | 'Anarkalis';

export type FabricType =
  | 'Banarasi Silk'
  | 'Kanjeevaram Silk'
  | 'Chanderi Silk'
  | 'Pure Georgette'
  | 'Organza'
  | 'Velvet'
  | 'Mulmul Cotton'
  | 'Tussar Silk';

export type CraftWork =
  | 'Zari Weave'
  | 'Chikankari'
  | 'Bandhani'
  | 'Gota Patti'
  | 'Mirror Work'
  | 'Aari Embroidery';

export type OccasionType = 'Bridal' | 'Festive' | 'Wedding Guest' | 'Casual Elegance' | 'Sangeet & Mehendi';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  location: string;
}

export interface EthnicProduct {
  id: string;
  title: string;
  subtitle: string;
  category: EthnicCategory;
  priceINR: number;
  mrpINR: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  additionalImages: string[];
  fabric: FabricType;
  craft: CraftWork;
  occasion: OccasionType;
  color: string;
  colorHex: string;
  availableSizes: string[];
  description: string;
  artisanStory: string;
  careInstructions: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isHandcrafted?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  product: EthnicProduct;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CatalogFilterState {
  category: string; // 'ALL' or specific category
  fabric: string; // 'ALL' or specific fabric
  craft: string; // 'ALL' or specific craft
  occasion: string; // 'ALL' or specific occasion
  maxPrice: number;
  sortBy: 'FEATURED' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW' | 'RATING' | 'NEWEST';
  searchQuery: string;
}
