import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import whiteImg from '@/assets/tshirt-white.jpg';
import blackImg from '@/assets/tshirt-black.jpg';
import beigeImg from '@/assets/tshirt-beige.jpg';
import grayImg from '@/assets/tshirt-gray.jpg';
import blueImg from '@/assets/tshirt-blue.jpg';

const PRODUCTS: Product[] = [
  {
    id: 'tshirt-white',
    name: 'Remera Lisa Blanca',
    price: 8500,
    colors: ['white'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: whiteImg,
  },
  {
    id: 'tshirt-black',
    name: 'Remera Lisa Negra',
    price: 8500,
    colors: ['black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: blackImg,
  },
  {
    id: 'tshirt-beige',
    name: 'Remera Lisa Beige',
    price: 8500,
    colors: ['beige'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: beigeImg,
  },
  {
    id: 'tshirt-gray',
    name: 'Remera Lisa Gris',
    price: 8500,
    colors: ['gray'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: grayImg,
  },
  {
    id: 'tshirt-blue',
    name: 'Remera Lisa Azul',
    price: 8500,
    colors: ['blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: blueImg,
  },
];

const ProductGrid = () => {
  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nuestras Remeras</h2>
          <p className="text-muted-foreground text-lg">Elegí tu estilo, talle y color</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
