
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface DesktopNavProps {
  megaMenuOpen: boolean;
  toggleMegaMenu: () => void;
  closeMegaMenu: () => void;
}

const DesktopNav = ({ megaMenuOpen, toggleMegaMenu, closeMegaMenu }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center justify-between py-3">
      {/* Catalog button for mega menu */}
      <button
        className={`flex items-center text-charcoal hover:text-burgundy font-medium px-4 py-2 rounded-md ${megaMenuOpen ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
        onClick={toggleMegaMenu}
      >
        <span>Catalog Produse</span>
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <Link
        to="/category/bestsellers"
        className="text-charcoal hover:text-burgundy font-medium px-2"
        onClick={closeMegaMenu}
      >
        Best Sellers
      </Link>
      
      <Link
        to="/category/new-arrivals"
        className="text-charcoal hover:text-burgundy font-medium px-2"
        onClick={closeMegaMenu}
      >
        Noutăți
      </Link>
      
      <Link
        to="/category/sale"
        className="text-charcoal hover:text-burgundy font-medium px-2"
        onClick={closeMegaMenu}
      >
        Oferte
      </Link>
      
      <Link
        to="/custom"
        className="text-charcoal hover:text-burgundy font-medium px-2"
        onClick={closeMegaMenu}
      >
        Creează coș personalizat
      </Link>
      
      <Link
        to="/category/corporate"
        className="text-charcoal hover:text-burgundy font-medium px-2"
        onClick={closeMegaMenu}
      >
        Pentru Companii
      </Link>
      
      <Link
        to="/contact"
        className="text-charcoal hover:text-burgundy font-medium px-2"
        onClick={closeMegaMenu}
      >
        Contact
      </Link>
    </div>
  );
};

export default DesktopNav;
