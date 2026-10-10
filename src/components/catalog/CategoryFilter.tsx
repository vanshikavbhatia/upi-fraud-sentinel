import React from 'react';
import { useCart } from '../../context/CartContext';
import {
  CATEGORIES_LIST,
  FABRICS_LIST,
  CRAFTS_LIST,
  OCCASIONS_LIST
} from '../../data/ethnicProducts';
import { Filter, X, RotateCcw, ArrowUpDown } from 'lucide-react';

export const CategoryFilter: React.FC = () => {
  const {
    filters,
    setCategory,
    setFabric,
    setCraft,
    setOccasion,
    setMaxPrice,
    setSortBy,
    resetFilters,
    isFilterOpen,
    setIsFilterOpen,
    filteredProducts,
  } = useCart();

  const filterContent = (
    <div
      id="category-filter"
      data-testid="category-filter"
      className="category-filter bg-[#140c0f] border border-amber-900/30 rounded-2xl p-5 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/20">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif font-bold text-sm text-amber-100 tracking-wide">
            Refine Catalog ({filteredProducts.length} items)
          </h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-[11px] text-amber-400/80 hover:text-amber-200 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-serif font-semibold text-amber-200 uppercase tracking-wider block">
          Product Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif transition border ${
                  isSelected
                    ? 'bg-amber-600 text-amber-950 font-bold border-amber-500 shadow-sm'
                    : 'bg-[#1b1013] text-amber-200/80 border-amber-900/30 hover:border-amber-700'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Fabric Type Filter */}
      <div className="space-y-2.5 pt-3 border-t border-amber-900/20">
        <label className="text-xs font-serif font-semibold text-amber-200 uppercase tracking-wider block">
          Pure Fabric & Weave
        </label>
        <div className="flex flex-wrap gap-1.5">
          {FABRICS_LIST.map((fab) => {
            const isSelected = filters.fabric === fab;
            return (
              <button
                key={fab}
                onClick={() => setFabric(fab)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition border ${
                  isSelected
                    ? 'bg-rose-900/80 text-rose-100 font-bold border-rose-500'
                    : 'bg-[#1b1013] text-amber-200/70 border-amber-900/30 hover:border-amber-700'
                }`}
              >
                {fab === 'ALL' ? 'All Fabrics' : fab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Craft & Handwork Filter */}
      <div className="space-y-2.5 pt-3 border-t border-amber-900/20">
        <label className="text-xs font-serif font-semibold text-amber-200 uppercase tracking-wider block">
          Artisan Craftsmanship
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CRAFTS_LIST.map((craft) => {
            const isSelected = filters.craft === craft;
            return (
              <button
                key={craft}
                onClick={() => setCraft(craft)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition border ${
                  isSelected
                    ? 'bg-amber-950 text-amber-200 font-bold border-amber-500'
                    : 'bg-[#1b1013] text-amber-200/70 border-amber-900/30 hover:border-amber-700'
                }`}
              >
                {craft === 'ALL' ? 'All Crafts' : craft}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Occasion Filter */}
      <div className="space-y-2.5 pt-3 border-t border-amber-900/20">
        <label className="text-xs font-serif font-semibold text-amber-200 uppercase tracking-wider block">
          Occasion
        </label>
        <div className="flex flex-wrap gap-1.5">
          {OCCASIONS_LIST.map((occ) => {
            const isSelected = filters.occasion === occ;
            return (
              <button
                key={occ}
                onClick={() => setOccasion(occ)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition border ${
                  isSelected
                    ? 'bg-amber-600 text-amber-950 font-bold border-amber-500'
                    : 'bg-[#1b1013] text-amber-200/70 border-amber-900/30 hover:border-amber-700'
                }`}
              >
                {occ === 'ALL' ? 'All Occasions' : occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range Slider */}
      <div className="space-y-2.5 pt-3 border-t border-amber-900/20">
        <div className="flex items-center justify-between text-xs">
          <label className="font-serif font-semibold text-amber-200 uppercase tracking-wider">
            Price Range
          </label>
          <span className="font-mono font-bold text-amber-300">
            Up to ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={50000}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500 h-1.5 bg-amber-950/60 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-amber-400/60 font-mono">
          <span>₹2,000</span>
          <span>₹25,000</span>
          <span>₹50,000+</span>
        </div>
      </div>

      {/* 6. Sort By Dropdown */}
      <div className="space-y-2 pt-3 border-t border-amber-900/20">
        <label className="text-xs font-serif font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
          <span>Sort By</span>
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full bg-[#1b1013] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
        >
          <option value="FEATURED">Featured & Bestsellers</option>
          <option value="PRICE_LOW_HIGH">Price: Low to High</option>
          <option value="PRICE_HIGH_LOW">Price: High to Low</option>
          <option value="RATING">Highest Customer Rating</option>
          <option value="NEWEST">New Arrivals</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">{filterContent}</aside>

      {/* Mobile Slide-over Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-[#140c0f] h-full overflow-y-auto p-4 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
                <span className="font-serif text-base font-bold text-amber-100">Catalog Filters</span>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1.5 rounded-lg text-amber-400 hover:text-amber-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterContent}
            </div>

            <div className="pt-4 border-t border-amber-900/30 mt-6 sticky bottom-0 bg-[#140c0f]">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-amber-950 font-bold text-xs shadow-lg transition"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
