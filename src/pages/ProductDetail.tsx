
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { products } from '@/data/products';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Heart, Minus, Plus, ChevronRight, Truck, Package, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  
  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    setProduct(foundProduct || null);
    
    // Reset state when product changes
    setQuantity(1);
    setActiveImageIndex(0);
    
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
  }, [slug]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Produs negăsit</h1>
            <p className="mb-6">Produsul pe care îl căutați nu există sau a fost eliminat.</p>
            <Link to="/" className="text-burgundy hover:underline">
              Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const isProductInWishlist = isInWishlist(product.id);
  const hasDiscount = product.isOnSale && product.salePrice;
  const discount = hasDiscount 
    ? Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100) 
    : 0;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-burgundy">Acasă</Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link to="/category/all" className="hover:text-burgundy">Produse</Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-gray-700">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative bg-white rounded-lg overflow-hidden h-96 sm:h-[500px] shadow-md mb-4">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product.isNew && (
                  <span className="badge-new">Nou</span>
                )}
                {product.isBestseller && (
                  <span className="badge-bestseller">Best Seller</span>
                )}
                {hasDiscount && (
                  <span className="badge-sale">-{discount}%</span>
                )}
              </div>
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "border-2 rounded-md overflow-hidden min-w-[80px] h-20 transition-all",
                      activeImageIndex === index
                        ? "border-burgundy"
                        : "border-transparent hover:border-gray-300"
                    )}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-burgundy">
                    {product.salePrice?.toFixed(2)} LEI
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    {product.price.toFixed(2)} LEI
                  </span>
                  <span className="bg-burgundy text-white px-2 py-1 rounded text-sm">
                    -{ discount }%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-burgundy">
                  {product.price.toFixed(2)} LEI
                </span>
              )}
            </div>
            
            {/* Short Description */}
            <p className="text-gray-700 mb-6">{product.shortDescription}</p>
            
            {/* Stock Status */}
            <div className="mb-6">
              <p className={cn(
                "font-medium",
                product.stock > 0 ? "text-green-600" : "text-red-500"
              )}>
                {product.stock > 0 ? "În stoc" : "Stoc epuizat"}
              </p>
            </div>
            
            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">Cantitate:</label>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="bg-gray-100 p-2 rounded-l-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={product.stock}
                    className="w-16 text-center py-2 border-y border-gray-200"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="bg-gray-100 p-2 rounded-r-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="bg-burgundy hover:bg-burgundy/90 text-white px-8 py-2 rounded" 
                    onClick={handleAddToCart}
                  >
                    Adaugă în coș
                  </Button>
                  
                  <Button
                    variant="outline"
                    className={cn(
                      "border-burgundy",
                      isProductInWishlist && "text-burgundy fill-burgundy"
                    )}
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={cn("h-5 w-5", isProductInWishlist && "fill-current")} />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Delivery Benefits */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-burgundy" />
                  <span className="text-sm">Livrare rapidă</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-burgundy" />
                  <span className="text-sm">Ambalare premium</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-burgundy" />
                  <span className="text-sm">Plata securizată</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b">
              <TabsTrigger value="description">Descriere</TabsTrigger>
              <TabsTrigger value="ingredients">Ingrediente</TabsTrigger>
              <TabsTrigger value="delivery">Livrare</TabsTrigger>
              {product.allergens && <TabsTrigger value="allergens">Alergeni</TabsTrigger>}
              {product.nutritionalInfo && <TabsTrigger value="nutrition">Informații nutriționale</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="pt-6">
              <div className="prose max-w-none">
                <p>{product.ingredients}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="pt-6">
              <div className="prose max-w-none">
                <p>{product.deliveryInfo}</p>
              </div>
            </TabsContent>
            
            {product.allergens && (
              <TabsContent value="allergens" className="pt-6">
                <div className="prose max-w-none">
                  <ul className="list-disc pl-5">
                    {product.allergens.map((allergen, index) => (
                      <li key={index}>{allergen}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            )}
            
            {product.nutritionalInfo && (
              <TabsContent value="nutrition" className="pt-6">
                <div className="prose max-w-none">
                  <p>{product.nutritionalInfo}</p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
