
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface MegaMenuProps {
  categories: Category[];
  onClose?: () => void;
}

const MegaMenu = ({ categories, onClose }: MegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const mainCategories = categories.filter(cat => !cat.parentId);
  
  const getSubcategories = (parentId: string) => {
    return categories.filter(cat => cat.parentId === parentId);
  };
  
  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg animate-fade-in z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          {/* Main Categories */}
          <div className="w-1/4 border-r border-gray-200 pr-4">
            <ul className="space-y-2">
              {mainCategories.map((category) => (
                <li key={category.id}>
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium flex items-center justify-between",
                      activeCategory === category.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                  >
                    {category.name}
                    {getSubcategories(category.id).length > 0 && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/custom"
                  className="w-full block text-left px-3 py-2 rounded-md transition-colors text-sm font-medium hover:bg-muted"
                  onClick={onClose}
                >
                  Creează coș personalizat
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Subcategories */}
          <div className="w-3/4 pl-6">
            {activeCategory && (
              <div className="grid grid-cols-3 gap-6">
                {getSubcategories(activeCategory).length > 0 ? (
                  getSubcategories(activeCategory).map((subCategory) => (
                    <div key={subCategory.id} className="space-y-2">
                      <Link
                        to={`/category/${subCategory.slug}`}
                        className="font-medium text-burgundy hover:text-burgundy/80 block"
                        onClick={onClose}
                      >
                        {subCategory.name}
                      </Link>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {subCategory.description || `Descoperă selecția noastră de ${subCategory.name.toLowerCase()}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3">
                    <Link
                      to={`/category/${mainCategories.find(cat => cat.id === activeCategory)?.slug}`}
                      className="font-medium text-burgundy hover:text-burgundy/80 block"
                      onClick={onClose}
                    >
                      Vezi toate produsele
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">
                      {mainCategories.find(cat => cat.id === activeCategory)?.description || 
                        `Descoperă toată colecția noastră de ${mainCategories.find(cat => cat.id === activeCategory)?.name.toLowerCase()}`}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {!activeCategory && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-burgundy">Cosuri Cadou Populare</h3>
                  <ul className="space-y-1">
                    <li><Link to="/category/bestsellers" className="text-sm hover:text-burgundy" onClick={onClose}>Best Sellers</Link></li>
                    <li><Link to="/category/new-arrivals" className="text-sm hover:text-burgundy" onClick={onClose}>Noutăți</Link></li>
                    <li><Link to="/category/sale" className="text-sm hover:text-burgundy" onClick={onClose}>Oferte Speciale</Link></li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-burgundy">Cosuri pentru Sărbători</h3>
                  <ul className="space-y-1">
                    <li><Link to="/category/craciun" className="text-sm hover:text-burgundy" onClick={onClose}>Crăciun</Link></li>
                    <li><Link to="/category/paste" className="text-sm hover:text-burgundy" onClick={onClose}>Paște</Link></li>
                    <li><Link to="/category/valentine" className="text-sm hover:text-burgundy" onClick={onClose}>Ziua Îndrăgostiților</Link></li>
                    <li><Link to="/category/ziua-mamei" className="text-sm hover:text-burgundy" onClick={onClose}>Ziua Mamei</Link></li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-burgundy">După Conținut</h3>
                  <ul className="space-y-1">
                    <li><Link to="/category/vin" className="text-sm hover:text-burgundy" onClick={onClose}>Vin și Șampanie</Link></li>
                    <li><Link to="/category/ciocolata" className="text-sm hover:text-burgundy" onClick={onClose}>Ciocolată și Dulciuri</Link></li>
                    <li><Link to="/category/fructe" className="text-sm hover:text-burgundy" onClick={onClose}>Fructe</Link></li>
                    <li><Link to="/category/branzeturi" className="text-sm hover:text-burgundy" onClick={onClose}>Brânzeturi</Link></li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-burgundy">Pentru Companii</h3>
                  <ul className="space-y-1">
                    <li><Link to="/category/corporate" className="text-sm hover:text-burgundy" onClick={onClose}>Cadouri Corporate</Link></li>
                    <li><Link to="/category/cosuri-business" className="text-sm hover:text-burgundy" onClick={onClose}>Coșuri Business</Link></li>
                    <li><Link to="/category/personalizate" className="text-sm hover:text-burgundy" onClick={onClose}>Personalizare în Masă</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-burgundy">Livrare Gratuită</h4>
              <p className="text-xs text-gray-600">Pentru comenzi peste 300 LEI</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-burgundy">Plată Securizată</h4>
              <p className="text-xs text-gray-600">Prin card sau ramburs</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-burgundy">Produse de Calitate</h4>
              <p className="text-xs text-gray-600">Atent selectate</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-burgundy">Asistență 24/7</h4>
              <p className="text-xs text-gray-600">Suntem aici să te ajutăm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
