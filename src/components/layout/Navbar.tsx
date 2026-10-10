import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
  Menu,
  Truck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    filters,
    setCategory,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsFilterOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: 'All Ethnic Wear', value: 'ALL' },
    { label: 'Sarees', value: 'Sarees' },
    { label: 'Kurtas & Sets', value: 'Kurtas' },
    { label: 'Lehengas', value: 'Lehengas' },
    { label: 'Dupattas', value: 'Dupattas' },
    { label: 'Anarkalis', value: 'Anarkalis' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d090a]/95 backdrop-blur-md border-b border-amber-900/30">
      {/* Top Heritage Marquee */}
      <div className="bg-gradient-to-r from-amber-900 via-rose-950 to-amber-900 text-amber-200 text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          FESTIVE COUTURE 2026: Extra 15% Off with code <strong>VIRASAT15</strong>
        </span>
        <span className="hidden md:inline text-amber-400/60">|</span>
        <span className="hidden md:flex items-center gap-1">
          <Truck className="w-3 h-3" /> Free Express Delivery across India on orders above ₹1,999
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu & Filter Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-amber-200 hover:bg-amber-950/50 border border-amber-900/30"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="p-2 rounded-xl text-amber-200 hover:bg-amber-950/50 border border-amber-900/30 flex items-center gap-1 text-xs font-medium"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Filters</span>
            </button>
          </div>

          {/* D2C Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCategory('ALL')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-rose-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-400/30">
              <span className="font-serif text-lg font-bold text-amber-100">V</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-amber-100 block leading-none">
                VIRASAT
              </span>
              <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-sans block mt-0.5">
                Luxury Indian Ethnic Studio
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Banarasi Sarees, Bridal Lehengas, Chanderi Kurtas..."
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181113] border border-amber-900/40 rounded-full pl-10 pr-9 py-2 text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Actions: Wishlist & Bag */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-xl text-amber-200 hover:bg-amber-950/50 border border-amber-900/30 transition group"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition text-amber-300" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-semibold shadow-md shadow-amber-950/50 transition group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-950 group-hover:scale-110 transition" />
              <span className="text-xs font-bold font-sans">Bag</span>
              <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-200 text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Sarees, Lehengas, Kurtas, Dupattas..."
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181113] border border-amber-900/40 rounded-full pl-10 pr-9 py-2 text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center gap-8 pt-3 border-t border-amber-900/20 mt-3 text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`transition pb-1 font-serif tracking-wide ${
                filters.category === cat.value
                  ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-amber-200/70 hover:text-amber-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Mobile Category Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3 bg-[#181113] border border-amber-900/40 rounded-2xl space-y-2 animate-in fade-in duration-150">
            <p className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest px-2">
              Browse Ethnic Categories:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setCategory(cat.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-serif ${
                    filters.category === cat.value
                      ? 'bg-amber-600 text-amber-950 font-bold'
                      : 'text-amber-200 hover:bg-amber-950/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
