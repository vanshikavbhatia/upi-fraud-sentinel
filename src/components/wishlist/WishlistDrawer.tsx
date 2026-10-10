import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: (typeof products)[0]) => {
    addToCart(product, product.availableSizes[0] || 'Free Size', product.color);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#120a0d] border-l border-amber-900/40 h-full flex flex-col justify-between shadow-2xl">
        <div className="p-4 border-b border-amber-900/30 bg-[#180e12] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-current" />
            <h3 className="font-serif font-bold text-base text-amber-100">
              Saved Favorites ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-xl text-amber-400 hover:text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-[#180e12] border border-amber-900/30 flex gap-3 relative"
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-20 h-24 rounded-xl object-cover shrink-0 bg-[#140c0f]"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-xs font-semibold text-amber-100 truncate">
                        {p.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-amber-400/60 hover:text-rose-400 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                      {p.category} · {p.fabric}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-bold text-xs text-amber-100">
                      ₹{p.priceINR.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => handleMoveToBag(p)}
                      className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-amber-950 text-xs font-bold font-serif flex items-center gap-1 transition"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-10 h-10 text-amber-400/40 mx-auto" />
              <p className="font-serif text-sm text-amber-200">Your wishlist is empty</p>
              <p className="text-xs text-amber-400/60 max-w-xs mx-auto">
                Tap the heart on any Saree, Lehenga, or Kurta to save it for later.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-amber-900/30 bg-[#180e12]">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-200 text-xs font-serif font-bold transition hover:bg-amber-900"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
