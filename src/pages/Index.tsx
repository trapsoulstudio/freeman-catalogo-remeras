import { useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SizeCalculator from '@/components/SizeCalculator';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header onCartClick={() => setCartOpen(true)} />
        <Hero />
        <ProductGrid />
        <SizeCalculator />
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
