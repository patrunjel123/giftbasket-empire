
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, ChevronDown, Search, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItemsCount } = useStore();

  const mainCategories = categories.filter(cat => !cat.parentId);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement search functionality in future iteration
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar with logo, search and actions */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-burgundy flex items-center">
            <span className="text-gold">Gift</span>Basket <span className="hidden sm:inline ml-1">Empire</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Caută produse..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-burgundy relative">
              <Heart className="h-6 w-6" />
            </Link>
            
            <Link to="/cart" className="p-2 text-gray-700 hover:text-burgundy relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <Link to="/account" className="hidden sm:flex p-2 text-gray-700 hover:text-burgundy">
              <User className="h-6 w-6" />
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-burgundy"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center justify-between py-3">
            {mainCategories.map((category) => {
              const subCategories = categories.filter(cat => cat.parentId === category.id);
              
              return subCategories.length > 0 ? (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-charcoal hover:text-burgundy font-medium px-2">
                      {category.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-white">
                    <DropdownMenuItem asChild>
                      <Link to={`/category/${category.slug}`} className="w-full">
                        Toate {category.name}
                      </Link>
                    </DropdownMenuItem>
                    {subCategories.map((subCategory) => (
                      <DropdownMenuItem key={subCategory.id} asChild>
                        <Link to={`/category/${subCategory.slug}`} className="w-full">
                          {subCategory.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-charcoal hover:text-burgundy font-medium px-2"
                >
                  {category.name}
                </Link>
              );
            })}
            <Link
              to="/custom"
              className="text-charcoal hover:text-burgundy font-medium px-2"
            >
              Creează coș personalizat
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-in">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="w-full relative mb-4">
              <Input
                type="text"
                placeholder="Caută produse..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
            
            <div className="flex flex-col space-y-3">
              {mainCategories.map((category) => {
                const subCategories = categories.filter(cat => cat.parentId === category.id);
                
                return (
                  <div key={category.id} className="py-1">
                    <Link
                      to={`/category/${category.slug}`}
                      className="text-lg font-medium text-charcoal hover:text-burgundy"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    
                    {subCategories.length > 0 && (
                      <div className="ml-4 mt-2 flex flex-col space-y-2">
                        {subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.id}
                            to={`/category/${subCategory.slug}`}
                            className="text-gray-700 hover:text-burgundy"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subCategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <Link
                to="/custom"
                className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Creează coș personalizat
              </Link>
              
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/account"
                  className="text-lg font-medium text-charcoal hover:text-burgundy py-1 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Contul meu
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
