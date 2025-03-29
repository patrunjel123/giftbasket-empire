
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, User } from 'lucide-react';
import { Category } from '@/types';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  categories,
  searchQuery,
  setSearchQuery,
  handleSearch
}: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const mainCategories = categories.filter(cat => !cat.parentId);
  
  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  if (!isOpen) return null;

  return (
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
          <Link
            to="/category/bestsellers"
            className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
            onClick={onClose}
          >
            Best Sellers
          </Link>
          
          <Link
            to="/category/new-arrivals"
            className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
            onClick={onClose}
          >
            Noutăți
          </Link>
          
          <Link
            to="/category/sale"
            className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
            onClick={onClose}
          >
            Oferte
          </Link>
          
          {/* Categories with collapsible subcategories */}
          {mainCategories.map((category) => {
            const subCategories = categories.filter(cat => cat.parentId === category.id);
            
            return (
              <Collapsible 
                key={category.id} 
                open={expandedCategory === category.id}
                onOpenChange={() => handleCategoryToggle(category.id)}
                className="py-1"
              >
                <div className="flex items-center justify-between">
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
                    onClick={(e) => {
                      if (subCategories.length > 0) {
                        e.preventDefault();
                        handleCategoryToggle(category.id);
                      } else {
                        onClose();
                      }
                    }}
                  >
                    {category.name}
                  </Link>
                  
                  {subCategories.length > 0 && (
                    <CollapsibleTrigger asChild>
                      <button className="p-1 text-gray-500 hover:text-burgundy">
                        {expandedCategory === category.id ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                  )}
                </div>
                
                {subCategories.length > 0 && (
                  <CollapsibleContent>
                    <div className="ml-4 mt-2 flex flex-col space-y-2">
                      {subCategories.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          to={`/category/${subCategory.slug}`}
                          className="text-gray-700 hover:text-burgundy py-1"
                          onClick={onClose}
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            );
          })}
          
          <Link
            to="/custom"
            className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
            onClick={onClose}
          >
            Creează coș personalizat
          </Link>
          
          <Link
            to="/contact"
            className="text-lg font-medium text-charcoal hover:text-burgundy py-1"
            onClick={onClose}
          >
            Contact
          </Link>
          
          <div className="pt-2 border-t border-gray-200">
            <Link
              to="/account"
              className="text-lg font-medium text-charcoal hover:text-burgundy py-1 flex items-center"
              onClick={onClose}
            >
              <User className="h-5 w-5 mr-2" />
              Contul meu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
