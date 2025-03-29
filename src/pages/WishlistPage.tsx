
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useStore } from '@/context/StoreContext';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  
  const handleRemoveItem = (productId: string) => {
    removeFromWishlist(productId);
  };
  
  const handleAddToCart = (productId: string) => {
    const item = wishlist.find(item => item.product.id === productId);
    if (item) {
      addToCart(item.product, 1);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Lista mea de favorite</h1>
        
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div 
                key={item.product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden relative animate-fade-in"
              >
                <Link to={`/products/${item.product.slug}`} className="block">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-10">
                      {item.product.isNew && (
                        <span className="badge-new">Nou</span>
                      )}
                      {item.product.isBestseller && (
                        <span className="badge-bestseller">Best Seller</span>
                      )}
                      {item.product.isOnSale && (
                        <span className="badge-sale">Reducere</span>
                      )}
                    </div>
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link 
                    to={`/products/${item.product.slug}`}
                    className="block text-lg font-medium text-gray-800 hover:text-burgundy mb-1 truncate"
                  >
                    {item.product.name}
                  </Link>
                  
                  <div className="mb-3">
                    {item.product.isOnSale && item.product.salePrice ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-burgundy">{item.product.salePrice.toFixed(2)} LEI</span>
                        <span className="text-gray-500 line-through text-sm">{item.product.price.toFixed(2)} LEI</span>
                      </div>
                    ) : (
                      <span className="font-bold text-burgundy">{item.product.price.toFixed(2)} LEI</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAddToCart(item.product.id)}
                      className="flex-1 bg-burgundy hover:bg-burgundy/90 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adaugă în coș
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="p-2 border-gray-300"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Lista ta de favorite este goală</h2>
            <p className="text-gray-600 mb-6">Salvează produsele preferate pentru mai târziu.</p>
            <Button asChild className="bg-burgundy hover:bg-burgundy/90 text-white">
              <Link to="/">Descoperă produse</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
