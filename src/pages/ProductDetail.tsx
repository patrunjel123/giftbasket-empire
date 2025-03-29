
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { products } from '@/data/products';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Heart, Minus, Plus, ChevronRight, Truck, Package, CreditCard, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  
  // Find related products based on category and exclude current product
  const findRelatedProducts = (currentProduct: Product) => {
    return products
      .filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || 
         p.occasion?.some(occ => currentProduct.occasion?.includes(occ)))
      )
      .slice(0, 4);
  };
  
  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    setProduct(foundProduct || null);
    
    // Reset state when product changes
    setQuantity(1);
    setActiveImageIndex(0);
    
    // Find related products
    if (foundProduct) {
      setRelatedProducts(findRelatedProducts(foundProduct));
    }
    
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
        <nav className="flex text-sm text-gray-500 mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-burgundy whitespace-nowrap">Acasă</Link>
          <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />
          <Link to="/category/all" className="hover:text-burgundy whitespace-nowrap">Produse</Link>
          <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />
          <span className="text-gray-700 truncate">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images Gallery */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
              <AspectRatio ratio={1} className="bg-white">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
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
            
            {/* Thumbnails Carousel */}
            {product.images.length > 1 && (
              <Carousel
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/5 sm:basis-1/5 md:basis-1/5 lg:basis-1/5">
                      <button
                        className={cn(
                          "border-2 rounded-md overflow-hidden h-20 w-full transition-all",
                          activeImageIndex === index
                            ? "border-burgundy"
                            : "border-transparent hover:border-gray-300"
                        )}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <AspectRatio ratio={1}>
                          <img
                            src={image}
                            alt={`${product.name} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {product.images.length > 5 && (
                  <>
                    <CarouselPrevious className="hidden sm:flex -left-4" />
                    <CarouselNext className="hidden sm:flex -right-4" />
                  </>
                )}
              </Carousel>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* SKU and Brand if available */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              {product.id && <span>SKU: {product.id}</span>}
              {product.brand && <span>Brand: {product.brand}</span>}
            </div>
            
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
                    -{discount}%
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
                "font-medium flex items-center",
                product.stock > 0 ? "text-green-600" : "text-red-500"
              )}>
                <span className={cn(
                  "inline-block w-3 h-3 rounded-full mr-2",
                  product.stock > 0 ? "bg-green-600" : "bg-red-500"
                )}></span>
                {product.stock > 0 ? `În stoc (${product.stock} buc)` : "Stoc epuizat"}
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
                    aria-label="Scade cantitatea"
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
                    aria-label="Cantitate"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="bg-gray-100 p-2 rounded-r-md hover:bg-gray-200 disabled:opacity-50"
                    aria-label="Crește cantitatea"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="bg-burgundy hover:bg-burgundy/90 text-white px-8 py-2 rounded flex-grow sm:flex-grow-0" 
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
                    aria-label={isProductInWishlist ? "Elimină de la favorite" : "Adaugă la favorite"}
                  >
                    <Heart className={cn("h-5 w-5", isProductInWishlist && "fill-current")} />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Categories and Occasions */}
            <div className="space-y-3 mb-6">
              {product.category && (
                <div className="flex items-start">
                  <span className="text-gray-600 w-24">Categorie:</span>
                  <Link to={`/category/${product.category}`} className="text-burgundy hover:underline">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Link>
                </div>
              )}
              
              {product.occasion && product.occasion.length > 0 && (
                <div className="flex items-start">
                  <span className="text-gray-600 w-24">Ocazii:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.occasion.map((occ, i) => (
                      <span key={i} className="bg-cream text-burgundy text-sm px-2 py-1 rounded">
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Delivery Benefits */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full border-b bg-transparent flex overflow-x-auto">
              <TabsTrigger 
                value="description"
                className="data-[state=active]:border-b-2 data-[state=active]:border-burgundy data-[state=active]:text-burgundy rounded-none flex-1 sm:flex-none"
              >
                Descriere
              </TabsTrigger>
              <TabsTrigger 
                value="ingredients"
                className="data-[state=active]:border-b-2 data-[state=active]:border-burgundy data-[state=active]:text-burgundy rounded-none flex-1 sm:flex-none"
              >
                Ingrediente
              </TabsTrigger>
              <TabsTrigger 
                value="delivery"
                className="data-[state=active]:border-b-2 data-[state=active]:border-burgundy data-[state=active]:text-burgundy rounded-none flex-1 sm:flex-none"
              >
                Livrare
              </TabsTrigger>
              {product.allergens && (
                <TabsTrigger 
                  value="allergens"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-burgundy data-[state=active]:text-burgundy rounded-none flex-1 sm:flex-none"
                >
                  Alergeni
                </TabsTrigger>
              )}
              {product.nutritionalInfo && (
                <TabsTrigger 
                  value="nutrition"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-burgundy data-[state=active]:text-burgundy rounded-none flex-1 sm:flex-none"
                >
                  Informații nutriționale
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="pt-6">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{product.ingredients}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="pt-6">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{product.deliveryInfo}</p>
              </div>
            </TabsContent>
            
            {product.allergens && (
              <TabsContent value="allergens" className="pt-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Informații despre alergeni</h3>
                  <ul className="list-disc pl-5 space-y-2">
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
                  <h3 className="text-xl font-semibold mb-4">Informații nutriționale</h3>
                  <p className="whitespace-pre-line">{product.nutritionalInfo}</p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Produse similare</h2>
              <Link to={`/category/${product.category}`} className="text-burgundy hover:underline hidden sm:block">
                Vezi toate
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-6 sm:hidden">
              <Link 
                to={`/category/${product.category}`} 
                className="text-burgundy hover:underline inline-block"
              >
                Vezi toate produsele similare
              </Link>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
