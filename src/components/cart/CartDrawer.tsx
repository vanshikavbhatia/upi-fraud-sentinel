import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('VIRASAT15');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(15); // 15% pre-applied
  const [couponMessage, setCouponMessage] = useState<string>('Code VIRASAT15 applied (15% Off)!');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const neededForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = Math.round((cartSubtotal * appliedDiscount) / 100);
  const finalTotal = cartSubtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'VIRASAT15') {
      setAppliedDiscount(15);
      setCouponMessage('Code VIRASAT15 applied (15% Off)!');
    } else if (code === 'FESTIVE25') {
      setAppliedDiscount(25);
      setCouponMessage('VIP Code FESTIVE25 applied (25% Off)!');
    } else {
      setCouponMessage('Invalid promo code. Try VIRASAT15 or FESTIVE25');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#120a0d] border-l border-amber-900/40 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-amber-900/30 bg-[#180e12] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base text-amber-100">
              Shopping Bag ({cartCount} items)
            </h3>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderSuccess(false);
            }}
            className="p-1.5 rounded-xl text-amber-400 hover:text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-amber-100">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-amber-200/70 mt-1 max-w-xs mx-auto font-sans leading-relaxed">
                Thank you for supporting traditional Indian handloom weavers. Your tracking details and dispatch note have been sent to your email.
              </p>
            </div>
            <button
              onClick={() => {
                clearCart();
                setOrderSuccess(false);
                setIsCartOpen(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-amber-950 font-serif font-bold text-xs transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Meter */}
            <div className="p-3.5 bg-amber-950/30 border-b border-amber-900/20 text-xs">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-emerald-300 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Congratulations! You have unlocked Free Express Delivery!</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-amber-200">
                    <span>Add ₹{neededForFree.toLocaleString('en-IN')} more for Free Delivery</span>
                    <span className="font-mono">₹{cartSubtotal} / ₹{freeShippingThreshold}</span>
                  </div>
                  <div className="w-full bg-[#1b1014] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                    className="p-3 rounded-2xl bg-[#180e12] border border-amber-900/30 flex gap-3 relative"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-20 h-24 rounded-xl object-cover shrink-0 bg-[#140c0f]"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-xs font-semibold text-amber-100 truncate">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-amber-400/60 hover:text-rose-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                          Size: {item.selectedSize} · {item.product.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-mono font-bold text-xs text-amber-100">
                          ₹{(item.product.priceINR * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-2 bg-[#120a0d] border border-amber-900/40 rounded-lg px-2 py-0.5 text-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            className="text-amber-400 hover:text-amber-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-amber-200">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            className="text-amber-400 hover:text-amber-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-10 h-10 text-amber-400/40 mx-auto" />
                  <p className="font-serif text-sm text-amber-200">Your shopping bag is currently empty</p>
                  <p className="text-xs text-amber-400/60 max-w-xs mx-auto">
                    Explore our festive sarees, lehengas, and kurta collections to add heirloom pieces.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-amber-900/30 bg-[#180e12] space-y-3">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-amber-400/60 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. VIRASAT15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-[#120a0d] border border-amber-900/40 rounded-xl pl-8 pr-3 py-1.5 text-xs text-amber-100 uppercase font-mono placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-300 text-xs font-serif font-bold border border-amber-800 transition"
                  >
                    Apply
                  </button>
                </form>
                {couponMessage && (
                  <p className="text-[11px] text-emerald-400 font-sans">{couponMessage}</p>
                )}

                {/* Subtotals */}
                <div className="space-y-1 text-xs pt-2 border-t border-amber-900/20 text-amber-200/80">
                  <div className="flex justify-between">
                    <span>Bag Subtotal</span>
                    <span className="font-mono text-amber-100">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({appliedDiscount}%)</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Handloom Delivery</span>
                    <span className="font-mono text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-amber-100 pt-1.5 border-t border-amber-900/30">
                    <span>Total Amount</span>
                    <span className="font-mono text-base text-amber-300">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/60 transition flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-amber-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight className="w-4 h-4 text-amber-950" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-400/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Encrypted Payment · UPI, Cards & NetBanking</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
