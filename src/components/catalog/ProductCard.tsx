import React from 'react';
import type { EthnicProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

export const ProductCard: React.FC<{ product: EthnicProduct }> = ({ product }) => {
  const { setActiveProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    setActiveProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes[0] || 'Free Size';
    addToCart(product, defaultSize, product.color);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#140c0e] border border-amber-900/30 hover:border-amber-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/40 cursor-pointer flex flex-col"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full bg-[#1b1013] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500 text-amber-950 shadow-md">
              Bestseller
            </span>
          )}
          {product.isHandcrafted && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-rose-950/80 text-rose-200 border border-rose-500/40 backdrop-blur-sm">
              Handcrafted Loom
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-emerald-950/80 text-emerald-200 border border-emerald-500/40 backdrop-blur-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition z-10 ${
            isWishlisted
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
              : 'bg-black/50 text-amber-100 hover:bg-black/70 hover:text-rose-400'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleCardClick}
            className="flex-1 py-2 px-3 rounded-xl bg-black/80 hover:bg-black text-amber-100 text-xs font-serif font-medium backdrop-blur-md border border-amber-900/40 flex items-center justify-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-amber-950 text-xs font-bold transition shadow-lg flex items-center justify-center gap-1"
            title="Add default size to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-amber-400/80 mb-1">
            <span className="font-serif font-medium uppercase tracking-wider">
              {product.category} · {product.fabric}
            </span>
            <div className="flex items-center gap-1 text-amber-300 font-mono font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-900/40">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-amber-400/60">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-semibold text-sm text-amber-100 line-clamp-1 group-hover:text-amber-300 transition">
            {product.title}
          </h3>

          {/* Subtitle / Craft detail */}
          <p className="text-[11px] text-amber-200/60 line-clamp-1 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing Block & Mobile Add Button */}
        <div className="pt-2 border-t border-amber-900/20 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold font-mono text-amber-100">
                ₹{product.priceINR.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-mono text-amber-400/50 line-through">
                ₹{product.mrpINR.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 font-mono">
              {product.discountPercent}% OFF
            </span>
          </div>

          {/* Mobile direct Add button */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-xl bg-amber-600 active:bg-amber-500 text-amber-950 font-bold"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
