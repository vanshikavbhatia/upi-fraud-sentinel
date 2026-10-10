import React from 'react';
import { useCart } from '../../context/CartContext';
import { Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCategory } = useCart();

  return (
    <footer className="bg-[#0b0708] border-t border-amber-900/30 text-amber-200/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Mission Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center font-serif font-bold text-amber-100 text-base">
                V
              </div>
              <span className="font-serif text-xl font-bold text-amber-100 tracking-wider">
                VIRASAT
              </span>
            </div>
            <p className="text-xs text-amber-200/70 leading-relaxed font-sans max-w-sm">
              India’s premier D2C ethnic wear studio bridging centuries-old weaving communities with contemporary festive wardrobes. Every Saree, Lehenga, Kurta, and Dupatta supports fair-wage artisan livelihoods across Varanasi, Kanchipuram, and Awadh.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certified 100% Pure Mulberry Silk & Handloom Mark</span>
            </div>
          </div>

          {/* Saree Collections */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-100">
              Sarees & Handlooms
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-200/70 font-sans">
              <li>
                <button onClick={() => setCategory('Sarees')} className="hover:text-amber-100 transition">
                  Banarasi Katan Silk Sarees
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Sarees')} className="hover:text-amber-100 transition">
                  Kanjeevaram Temple Sarees
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Sarees')} className="hover:text-amber-100 transition">
                  Chanderi Handblock Sarees
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Sarees')} className="hover:text-amber-100 transition">
                  Organza Embroidered Sarees
                </button>
              </li>
            </ul>
          </div>

          {/* Couture & Sets */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-100">
              Couture & Kurtas
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-200/70 font-sans">
              <li>
                <button onClick={() => setCategory('Lehengas')} className="hover:text-amber-100 transition">
                  Bridal Velvet Lehengas
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Kurtas')} className="hover:text-amber-100 transition">
                  Chanderi Kurta & Palazzo Sets
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Kurtas')} className="hover:text-amber-100 transition">
                  Lucknowi Chikankari Kurtas
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Anarkalis')} className="hover:text-amber-100 transition">
                  Gota Patti Flared Anarkalis
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('Dupattas')} className="hover:text-amber-100 transition">
                  Heirloom Silk Dupattas
                </button>
              </li>
            </ul>
          </div>

          {/* Artisan Guarantee */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-100">
              D2C Promise
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-200/70 font-sans">
              <li>Direct from Loom Pricing</li>
              <li>Silk Mark Guarantee</li>
              <li>Made to Measure Tailoring</li>
              <li>Pan-India Express Shipping</li>
              <li>7-Day Doorstep Returns</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-400/60 font-sans">
          <p>© 2026 Virasat Ethnic Studio Private Limited · All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Indian Handloom Weavers
          </p>
        </div>
      </div>
    </footer>
  );
};
