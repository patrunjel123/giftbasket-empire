
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    toast({
      title: "Produs adăugat în coș",
      description: `${product.name} a fost adăugat în coșul tău.`,
      duration: 2000,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: "Produs eliminat din favorite",
        description: `${product.name} a fost eliminat din lista ta de favorite.`,
        duration: 2000,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Produs adăugat la favorite",
        description: `${product.name} a fost adăugat în lista ta de favorite.`,
        duration: 2000,
      });
    }
  };

  return (
    <div 
      className="h-full flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white animate-fade-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/products/${product.slug}`} className="group block relative">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 max-w-[calc(100%-50px)]">
            {product.isNew && (
              <span className="badge-new">Nou</span>
            )}
            {product.isBestseller && (
              <span className="badge-bestseller">Best Seller</span>
            )}
            {product.isOnSale && (
              <span className="badge-sale">Reducere</span>
            )}
          </div>
          
          <button 
            className={cn("wishlist-button", isWishlisted && "text-secondary")}
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Elimină de la favorite" : "Adaugă la favorite"}
          >
            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
          </button>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-medium mb-1 text-charcoal line-clamp-2 min-h-[56px]">{product.name}</h3>
          
          <div className="mt-1 mb-2">
            {product.isOnSale && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-burgundy">{product.salePrice.toFixed(2)} LEI</span>
                <span className="text-gray-500 line-through text-sm">{product.price.toFixed(2)} LEI</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-burgundy">{product.price.toFixed(2)} LEI</span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow min-h-[40px]">{product.shortDescription}</p>
        </Link>
        
        <div className="mt-auto">
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={handleAddToCart}
          >
            Adaugă în coș
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
