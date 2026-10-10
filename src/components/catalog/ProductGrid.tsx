import React from 'react';
import { useCart } from '../../context/CartContext';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, PackageSearch } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { filteredProducts, filters, resetFilters, setIsFilterOpen } = useCart();

  return (
    <div className="flex-1 space-y-4">
      {/* Grid Meta Header */}
      <div className="flex items-center justify-between bg-[#140c0f] border border-amber-900/30 p-3.5 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-serif text-amber-100 font-bold">
            {filters.category === 'ALL' ? 'All Handcrafted Ethnic Wear' : filters.category}
          </span>
          <span className="font-mono text-amber-400/70">
            ({filteredProducts.length} pieces)
          </span>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-900/40 text-amber-200 text-xs font-serif hover:border-amber-500 transition"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>Filters</span>
        </button>
      </div>

      {/* Product Grid Container */}
      {filteredProducts.length > 0 ? (
        <div
          id="product-grid"
          data-testid="product-grid"
          className="product-grid mobile-first grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-[#140c0f] border border-amber-900/30 rounded-3xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-950/60 border border-amber-900/40 text-amber-400 flex items-center justify-center mx-auto">
            <PackageSearch className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-amber-100">
              No ethnic pieces found matching your criteria
            </h4>
            <p className="text-xs text-amber-200/60 max-w-sm mx-auto mt-1">
              Try expanding your price range or clearing fabric and craft filters to discover our heirloom collections.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-amber-950 text-xs font-bold font-serif transition shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
