
import Layout from '@/components/Layout';
import HeroBanner from '@/components/HeroBanner';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredCategories = categories.filter(category => category.featured);
  const bestsellers = products.filter(product => product.isBestseller);
  const newProducts = products.filter(product => product.isNew);
  const onSaleProducts = products.filter(product => product.isOnSale);

  return (
    <Layout>
      <HeroBanner />
      
      {/* Featured Categories Section */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Categorii populare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Cele mai populare</h2>
            <Link 
              to="/category/bestsellers" 
              className="flex items-center text-burgundy hover:text-burgundy/80 font-medium"
            >
              Vezi toate <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Noutăți</h2>
              <Link 
                to="/category/new-arrivals" 
                className="flex items-center text-burgundy hover:text-burgundy/80 font-medium"
              >
                Vezi toate <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* On Sale Section */}
      {onSaleProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Oferte speciale</h2>
              <Link 
                to="/category/sale" 
                className="flex items-center text-burgundy hover:text-burgundy/80 font-medium"
              >
                Vezi toate <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* USP Section */}
      <section className="py-12 bg-burgundy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gold rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-burgundy">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Calitate garantată</h3>
              <p className="text-white/80">Toate produsele sunt atent selecționate pentru a asigura cea mai bună experiență</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gold rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-burgundy">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4m16 0l-8 4m8 4l-8 4-8-4m16 0l-8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Livrare rapidă</h3>
              <p className="text-white/80">Livrăm oriunde în România, direct la ușa ta sau a destinatarului</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gold rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-burgundy">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Plată securizată</h3>
              <p className="text-white/80">Multiple metode de plată, toate procesate prin canale sigure</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Rămâi la curent</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Abonează-te la newsletter pentru a primi cele mai noi oferte și inspirație pentru cadouri
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy"
              required
            />
            <button
              type="submit"
              className="bg-burgundy hover:bg-burgundy/90 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              Abonează-te
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
