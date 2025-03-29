
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, User } from 'lucide-react';

interface NavActionsProps {
  cartItemsCount: number;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMegaMenu: () => void;
}

const NavActions = ({ cartItemsCount, mobileMenuOpen, toggleMobileMenu, closeMegaMenu }: NavActionsProps) => {
  return (
    <div className="flex items-center space-x-1 sm:space-x-4">
      <Link to="/wishlist" className="p-2 text-gray-700 hover:text-burgundy relative" onClick={closeMegaMenu}>
        <Heart className="h-6 w-6" />
      </Link>
      
      <Link to="/cart" className="p-2 text-gray-700 hover:text-burgundy relative" onClick={closeMegaMenu}>
        <ShoppingCart className="h-6 w-6" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-burgundy text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </Link>
      
      <Link to="/account" className="hidden sm:flex p-2 text-gray-700 hover:text-burgundy" onClick={closeMegaMenu}>
        <User className="h-6 w-6" />
      </Link>
      
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-gray-700 hover:text-burgundy"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default NavActions;
