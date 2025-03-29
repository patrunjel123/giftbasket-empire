
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className="product-card animate-fade-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="product-image-container">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="product-image"
          />
          
          <div className="product-badges">
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
        
        <div className="product-content">
          <h3 className="product-title truncate">{product.name}</h3>
          
          <div className="mt-1 mb-2">
            {product.isOnSale && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="product-price">{product.salePrice.toFixed(2)} LEI</span>
                <span className="text-gray-500 line-through text-sm">{product.price.toFixed(2)} LEI</span>
              </div>
            ) : (
              <span className="product-price">{product.price.toFixed(2)} LEI</span>
            )}
          </div>
          
          <p className="product-description line-clamp-2">{product.shortDescription}</p>
          
          <Button 
            className="cart-button mt-2"
            onClick={handleAddToCart}
          >
            Adaugă în coș
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
