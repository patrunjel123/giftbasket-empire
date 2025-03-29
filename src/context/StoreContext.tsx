
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem } from '@/types';
import { toast } from '@/hooks/use-toast';

interface StoreContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartItemsCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  // Load cart and wishlist from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate cart total and item count
    const total = cart.reduce(
      (sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity,
      0
    );
    setCartTotal(total);
    
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemsCount(itemsCount);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Product already exists in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Coș actualizat",
          description: `${product.name} cantitate actualizată în coș`,
        });
        
        return updatedCart;
      } else {
        // Product doesn't exist in cart, add new item
        toast({
          title: "Produs adăugat",
          description: `${product.name} a fost adăugat în coș`,
        });
        
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.product.id !== productId
      );
      
      if (updatedCart.length !== prevCart.length) {
        toast({
          title: "Produs eliminat",
          description: "Produsul a fost eliminat din coș",
        });
      }
      
      return updatedCart;
    });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Coș golit",
      description: "Toate produsele au fost eliminate din coș",
    });
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.product.id === product.id)) {
        // Product already in wishlist
        return prevWishlist;
      }
      
      toast({
        title: "Produs adăugat la favorite",
        description: `${product.name} a fost adăugat la lista de favorite`,
      });
      
      return [...prevWishlist, { product }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (item) => item.product.id !== productId
      );
      
      if (updatedWishlist.length !== prevWishlist.length) {
        toast({
          title: "Produs eliminat",
          description: "Produsul a fost eliminat din favorite",
        });
      }
      
      return updatedWishlist;
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartTotal,
        cartItemsCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
