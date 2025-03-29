
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useStore } from '@/context/StoreContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart, cartTotal } = useStore();
  const [couponCode, setCouponCode] = useState('');
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement coupon functionality in future iteration
    console.log('Applying coupon:', couponCode);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Coșul meu</h1>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                  <div className="col-span-6">
                    <span className="font-medium">Produs</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Preț</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Cantitate</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Total</span>
                  </div>
                </div>
                
                {cart.map((item) => {
                  const productPrice = item.product.salePrice || item.product.price;
                  const itemTotal = productPrice * item.quantity;
                  
                  return (
                    <div 
                      key={item.product.id} 
                      className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 sm:col-span-6">
                        <div className="flex items-center">
                          <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              className="w-20 h-20 object-cover rounded"
                            />
                          </Link>
                          <div className="ml-4">
                            <Link 
                              to={`/products/${item.product.slug}`}
                              className="font-medium text-gray-800 hover:text-burgundy"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                        <span className="sm:hidden font-medium text-gray-600 mr-2">Preț:</span>
                        <span>{productPrice.toFixed(2)} LEI</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                        <span className="sm:hidden font-medium text-gray-600 mr-2">Cantitate:</span>
                        <div className="flex items-center justify-start sm:justify-center">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="bg-gray-100 p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= (item.product.stock || 1)}
                            className="bg-gray-100 p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center">
                        <div>
                          <span className="sm:hidden font-medium text-gray-600 mr-2">Total:</span>
                          <span className="font-medium">{itemTotal.toFixed(2)} LEI</span>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-gray-500 hover:text-burgundy ml-4"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Sumar comandă</h2>
                
                {/* Coupon */}
                <form onSubmit={handleApplyCoupon} className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Cod promoțional
                  </label>
                  <div className="flex">
                    <Input
                      id="coupon"
                      type="text"
                      placeholder="Introdu codul"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="submit" 
                      className="rounded-l-none bg-gray-800 hover:bg-gray-700"
                    >
                      Aplică
                    </Button>
                  </div>
                </form>
                
                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{cartTotal.toFixed(2)} LEI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livrare</span>
                    <span className="font-medium">Calculat la checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-burgundy">{cartTotal.toFixed(2)} LEI</span>
                  </div>
                </div>
                
                <Button 
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-white py-3 rounded"
                >
                  <Link to="/checkout">
                    Continuă spre checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Coșul tău este gol</h2>
            <p className="text-gray-600 mb-6">Adaugă produse pentru a începe cumpărăturile.</p>
            <Button asChild className="bg-burgundy hover:bg-burgundy/90 text-white">
              <Link to="/">Continuă cumpărăturile</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
