import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setCategory, filters } = useCart();

  const chips = [
    { label: 'Royal Banarasi Sarees', category: 'Sarees' },
    { label: 'Bridal Lehengas', category: 'Lehengas' },
    { label: 'Chanderi Kurta Sets', category: 'Kurtas' },
    { label: 'Heritage Dupattas', category: 'Dupattas' },
    { label: 'Royal Anarkalis', category: 'Anarkalis' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#181012] via-[#140b0e] to-[#0d090a] border-b border-amber-900/30 py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Subtitle pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-serif tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>FESTIVE WEDDING EDIT · HANDLOOM COUTURE 2026</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100 max-w-3xl mx-auto leading-tight">
          Handcrafted Indian Ethnic Wear,{' '}
          <span className="italic font-normal text-amber-400">Woven by Master Artisans</span>
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-amber-200/70 max-w-2xl mx-auto font-sans leading-relaxed">
          Explore pure Banarasi and Kanjeevaram Sarees, hand-embroidered Zardozi Lehengas, pure Chanderi Kurta sets, and heirloom Dupattas. Certified Silk Mark purity directly from artisan loom clusters.
        </p>

        {/* Category Quick Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {chips.map((chip) => {
            const isActive = filters.category === chip.category;
            return (
              <button
                key={chip.category}
                onClick={() => setCategory(chip.category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wide transition border ${
                  isActive
                    ? 'bg-amber-500 text-amber-950 font-bold border-amber-400 shadow-md shadow-amber-950/50'
                    : 'bg-[#1e1416]/80 text-amber-200/90 border-amber-900/40 hover:border-amber-600 hover:text-amber-100'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* D2C Trust Badges */}
        <div className="mt-8 pt-6 border-t border-amber-900/20 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-950/20 border border-amber-900/20">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-amber-100">Silk Mark Certified</p>
              <p className="text-[10px] text-amber-400/60">100% Pure Mulberry Silk</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-950/20 border border-amber-900/20">
            <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-amber-100">Fair Trade Artisans</p>
              <p className="text-[10px] text-amber-400/60">500+ Weavers in Varanasi</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-950/20 border border-amber-900/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-amber-100">7-Day Free Returns</p>
              <p className="text-[10px] text-amber-400/60">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-950/20 border border-amber-900/20">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-amber-100">Made to Measure</p>
              <p className="text-[10px] text-amber-400/60">Custom blouse & fall-pico</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
