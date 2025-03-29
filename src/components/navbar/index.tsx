
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { categories } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import MegaMenu from '@/components/MegaMenu';
import SearchBar from '@/components/navbar/SearchBar';
import NavActions from '@/components/navbar/NavActions';
import MobileMenu from '@/components/navbar/MobileMenu';
import DesktopNav from '@/components/navbar/DesktopNav';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { cartItemsCount } = useStore();
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMegaMenuOpen(false);
  };

  const toggleMegaMenu = () => {
    setMegaMenuOpen(!megaMenuOpen);
    setMobileMenuOpen(false);
  };

  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement search functionality in future iteration
    console.log('Searching for:', searchQuery);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" ref={navRef}>
      {/* Top bar with logo, search and actions */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-burgundy flex items-center" onClick={closeMegaMenu}>
            <span className="text-gold">Gift</span>Basket <span className="hidden sm:inline ml-1">Empire</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <NavActions 
            cartItemsCount={cartItemsCount}
            mobileMenuOpen={mobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            closeMegaMenu={closeMegaMenu}
          />
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <DesktopNav 
            megaMenuOpen={megaMenuOpen}
            toggleMegaMenu={toggleMegaMenu}
            closeMegaMenu={closeMegaMenu}
          />
        </div>
        
        {/* Mega Menu */}
        {megaMenuOpen && !isMobile && (
          <MegaMenu categories={categories} onClose={closeMegaMenu} />
        )}
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={toggleMobileMenu}
        categories={categories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </nav>
  );
};

export default Navbar;
