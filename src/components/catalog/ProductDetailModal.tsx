import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Award,
  Check,
  Ruler
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { activeProduct, setActiveProduct, addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!activeProduct) return null;

  const isWishlisted = isInWishlist(activeProduct.id);
  const currentSize = selectedSize || activeProduct.availableSizes[0] || 'Free Size';

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Available! Free Express delivery by tomorrow to PIN ${pincode}`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleAdd = () => {
    addToCart(activeProduct, currentSize, activeProduct.color);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      id="product-detail-view"
      data-testid="product-detail-view"
      className="product-detail-view fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto"
    >
      <div className="bg-[#120a0d] border border-amber-900/40 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="p-4 border-b border-amber-900/30 bg-[#180e12] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif text-amber-200">
            <span className="font-bold text-amber-400">VIRASAT</span>
            <span>/</span>
            <span>{activeProduct.category}</span>
            <span>/</span>
            <span className="text-amber-100 truncate max-w-[200px] sm:max-w-xs">{activeProduct.title}</span>
          </div>
          <button
            onClick={() => setActiveProduct(null)}
            className="p-1.5 rounded-xl text-amber-400 hover:text-amber-100 hover:bg-amber-950/60 transition"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column: Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#1b1013] border border-amber-900/40">
              <img
                src={activeProduct.additionalImages[selectedImageIndex] || activeProduct.imageUrl}
                alt={activeProduct.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(activeProduct.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition ${
                  isWishlisted
                    ? 'bg-rose-600 text-white'
                    : 'bg-black/60 text-amber-100 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {activeProduct.additionalImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {activeProduct.additionalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      selectedImageIndex === idx
                        ? 'border-amber-400 scale-105'
                        : 'border-amber-900/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Product Story & Buying Form */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category, Rating & Title */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-serif uppercase tracking-widest text-amber-400 font-bold">
                    {activeProduct.category} · {activeProduct.fabric}
                  </span>
                  <div className="flex items-center gap-1.5 bg-amber-950/70 border border-amber-900/40 px-2 py-0.5 rounded-full text-amber-300 font-mono text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{activeProduct.rating}</span>
                    <span className="text-amber-400/60">({activeProduct.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 leading-tight">
                  {activeProduct.title}
                </h2>
                <p className="text-xs text-amber-200/70 font-sans mt-1">
                  {activeProduct.subtitle}
                </p>
              </div>

              {/* Price Block */}
              <div className="p-3.5 rounded-2xl bg-[#1b1014] border border-amber-900/30 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-amber-100">
                      ₹{activeProduct.priceINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-mono text-amber-400/50 line-through">
                      ₹{activeProduct.mrpINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {activeProduct.discountPercent}% OFF
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-400/70 block mt-0.5">
                    Inclusive of all taxes & handloom artisan cess · Free shipping
                  </span>
                </div>
              </div>

              {/* Fabric & Craft Specification Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#180e12] border border-amber-900/20">
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">Pure Fabric</span>
                  <span className="font-serif font-bold text-amber-200">{activeProduct.fabric}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#180e12] border border-amber-900/20">
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">Artisan Craft</span>
                  <span className="font-serif font-bold text-amber-200">{activeProduct.craft}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#180e12] border border-amber-900/20">
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">Occasion</span>
                  <span className="font-serif font-bold text-amber-200">{activeProduct.occasion}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#180e12] border border-amber-900/20">
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">Colorway</span>
                  <span className="font-serif font-bold text-amber-200">{activeProduct.color}</span>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-semibold text-amber-200 uppercase tracking-wider">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                    className="text-amber-400 hover:text-amber-200 flex items-center gap-1 underline text-[11px]"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-serif transition border ${
                        currentSize === size
                          ? 'bg-amber-600 text-amber-950 font-bold border-amber-400 shadow-md'
                          : 'bg-[#180e12] text-amber-200/80 border-amber-900/40 hover:border-amber-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {isSizeGuideOpen && (
                  <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl text-[11px] text-amber-200/80 space-y-1">
                    <p className="font-bold text-amber-300">Indian Sizing Measurements (in inches):</p>
                    <p>• Saree: 5.5 meters length + 0.8 meter matching unstitched blouse piece</p>
                    <p>• Kurtas & Sets: XS (Bust: 34"), S (Bust: 36"), M (Bust: 38"), L (Bust: 40"), XL (Bust: 42")</p>
                    <p>• Lehengas: Semi-stitched waist up to 42", flare 4.5+ meters with matching blouse fabric</p>
                  </div>
                )}
              </div>

              {/* Description & Artisan Story */}
              <div className="space-y-2 pt-2 border-t border-amber-900/20 text-xs">
                <p className="text-amber-200/80 leading-relaxed font-sans">
                  {activeProduct.description}
                </p>
                <div className="bg-amber-950/20 border border-amber-900/30 p-3 rounded-xl flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-300/90 leading-relaxed">
                    <strong>Artisan Provenance: </strong>
                    {activeProduct.artisanStory}
                  </p>
                </div>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="space-y-1.5 pt-2 border-t border-amber-900/20">
                <span className="text-[11px] font-serif font-semibold text-amber-200 uppercase tracking-wider block">
                  Estimate Delivery
                </span>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code (e.g. 110001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 bg-[#180e12] border border-amber-900/40 rounded-xl px-3 py-1.5 text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-amber-950 hover:bg-amber-900 text-amber-300 rounded-xl text-xs font-serif font-bold border border-amber-800 transition"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="text-[11px] text-amber-300 font-sans mt-1">{pincodeStatus}</p>
                )}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="pt-4 border-t border-amber-900/30 flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-bold text-xs uppercase tracking-wider font-serif shadow-lg shadow-amber-950/60 transition flex items-center justify-center gap-2"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-amber-950" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-950" />
                    <span>Add to Shopping Bag · ₹{activeProduct.priceINR.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar (mobile-first) */}
        <div className="md:hidden p-3 bg-[#180e12] border-t border-amber-900/40 flex items-center justify-between gap-3 sticky bottom-0">
          <div>
            <span className="text-[10px] text-amber-400/60 uppercase block">Total Price</span>
            <span className="text-base font-bold font-mono text-amber-100">
              ₹{activeProduct.priceINR.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 active:bg-amber-500 text-amber-950 font-bold text-xs uppercase tracking-wider font-serif transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
