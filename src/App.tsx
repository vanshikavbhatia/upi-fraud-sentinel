import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/layout/HeroBanner';
import { CategoryFilter } from './components/catalog/CategoryFilter';
import { ProductGrid } from './components/catalog/ProductGrid';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { Footer } from './components/layout/Footer';

const CatalogMain: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d090a] text-amber-100 flex flex-col font-sans selection:bg-amber-600 selection:text-amber-950">
      {/* Top Navbar with live bag, search, wishlist & category tabs */}
      <Navbar />

      {/* Hero Banner with festive collection story and quick filters */}
      <HeroBanner />

      {/* Main Catalog View with Category Filters & Product Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Category & Attribute Filter Sidebar */}
          <CategoryFilter />

          {/* Responsive Product Grid (Sarees, Kurtas, Lehengas, Dupattas, Anarkalis) */}
          <ProductGrid />
        </div>
      </main>

      {/* D2C Brand Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <CatalogMain />
    </CartProvider>
  );
}

export default App;
