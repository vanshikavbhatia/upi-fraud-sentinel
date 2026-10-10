import React, { createContext, useContext, useState, useMemo } from 'react';
import type { EthnicProduct, CartItem, CatalogFilterState } from '../types';
import { ETHNIC_PRODUCTS } from '../data/ethnicProducts';

interface CartContextType {
  products: EthnicProduct[];
  filteredProducts: EthnicProduct[];
  filters: CatalogFilterState;
  setCategory: (category: string) => void;
  setFabric: (fabric: string) => void;
  setCraft: (craft: string) => void;
  setOccasion: (occasion: string) => void;
  setMaxPrice: (price: number) => void;
  setSortBy: (sort: CatalogFilterState['sortBy']) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  // Detail Modal
  activeProduct: EthnicProduct | null;
  setActiveProduct: (product: EthnicProduct | null) => void;
  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: EthnicProduct, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  // Mobile filter drawer
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_FILTERS: CatalogFilterState = {
  category: 'ALL',
  fabric: 'ALL',
  craft: 'ALL',
  occasion: 'ALL',
  maxPrice: 50000,
  sortBy: 'FEATURED',
  searchQuery: '',
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<EthnicProduct[]>(ETHNIC_PRODUCTS);
  const [filters, setFilters] = useState<CatalogFilterState>(INITIAL_FILTERS);
  const [activeProduct, setActiveProduct] = useState<EthnicProduct | null>(null);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: ETHNIC_PRODUCTS[0], // Pre-populate with 1 Banarasi Silk Saree for instant D2C demo
      selectedSize: 'Free Size (6.3m with blouse)',
      selectedColor: 'Crimson Vermilion & Gold',
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<string[]>([ETHNIC_PRODUCTS[1].id, ETHNIC_PRODUCTS[4].id]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (filters.category !== 'ALL' && p.category !== filters.category) return false;
        // Fabric
        if (filters.fabric !== 'ALL' && p.fabric !== filters.fabric) return false;
        // Craft
        if (filters.craft !== 'ALL' && p.craft !== filters.craft) return false;
        // Occasion
        if (filters.occasion !== 'ALL' && p.occasion !== filters.occasion) return false;
        // Price
        if (p.priceINR > filters.maxPrice) return false;
        // Search
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const match =
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.craft.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'PRICE_LOW_HIGH') return a.priceINR - b.priceINR;
        if (filters.sortBy === 'PRICE_HIGH_LOW') return b.priceINR - a.priceINR;
        if (filters.sortBy === 'RATING') return b.rating - a.rating;
        if (filters.sortBy === 'NEWEST') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, filters]);

  // Filter setters
  const setCategory = (cat: string) => setFilters((prev) => ({ ...prev, category: cat }));
  const setFabric = (fab: string) => setFilters((prev) => ({ ...prev, fabric: fab }));
  const setCraft = (craft: string) => setFilters((prev) => ({ ...prev, craft }));
  const setOccasion = (occ: string) => setFilters((prev) => ({ ...prev, occasion: occ }));
  const setMaxPrice = (price: number) => setFilters((prev) => ({ ...prev, maxPrice: price }));
  const setSortBy = (sort: CatalogFilterState['sortBy']) => setFilters((prev) => ({ ...prev, sortBy: sort }));
  const setSearchQuery = (query: string) => setFilters((prev) => ({ ...prev, searchQuery: query }));
  const resetFilters = () => setFilters(INITIAL_FILTERS);

  // Cart actions
  const addToCart = (product: EthnicProduct, size: string, color: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        products,
        filteredProducts,
        filters,
        setCategory,
        setFabric,
        setCraft,
        setOccasion,
        setMaxPrice,
        setSortBy,
        setSearchQuery,
        resetFilters,
        activeProduct,
        setActiveProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isFilterOpen,
        setIsFilterOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
