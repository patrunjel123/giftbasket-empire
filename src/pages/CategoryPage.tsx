
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/data/products';
import { Category, Product } from '@/types';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [filterBestseller, setFilterBestseller] = useState<boolean>(false);
  const [filterNew, setFilterNew] = useState<boolean>(false);
  const [filterOnSale, setFilterOnSale] = useState<boolean>(false);

  useEffect(() => {
    const currentCategory = categories.find(c => c.slug === slug);
    setCategory(currentCategory || null);
    
    // Collecting child categories of the current category
    const childCategories = categories
      .filter(c => c.parentId === currentCategory?.id)
      .map(c => c.id);
    
    // Initial state for selectedCategories
    setSelectedCategories(childCategories.length > 0 ? [] : [currentCategory?.id || '']);
    
  }, [slug]);

  // Effect for filtering products
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category or its children
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    } else if (category) {
      // If no specific subcategories selected, show all products from current category and its children
      const childCategories = categories
        .filter(c => c.parentId === category.id)
        .map(c => c.id);
      
      filtered = filtered.filter(product => 
        product.category === category.id || childCategories.includes(product.category)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => {
      const priceToCheck = product.salePrice || product.price;
      return priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1];
    });
    
    // Filter by stock
    if (onlyInStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    
    // Filter by badges
    if (filterBestseller) {
      filtered = filtered.filter(product => product.isBestseller);
    }
    
    if (filterNew) {
      filtered = filtered.filter(product => product.isNew);
    }
    
    if (filterOnSale) {
      filtered = filtered.filter(product => product.isOnSale);
    }
    
    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case 'price-low-high':
          filtered.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            return priceA - priceB;
          });
          break;
        case 'price-high-low':
          filtered.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            return priceB - priceA;
          });
          break;
        case 'newest':
          // Assuming newer products have isNew flag
          filtered.sort((a, b) => {
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return 0;
          });
          break;
        case 'bestsellers':
          filtered.sort((a, b) => {
            if (a.isBestseller && !b.isBestseller) return -1;
            if (!a.isBestseller && b.isBestseller) return 1;
            return 0;
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(filtered);
  }, [category, selectedCategories, priceRange, sortBy, onlyInStock, filterBestseller, filterNew, filterOnSale]);

  // Get subcategories of current category
  const subcategories = category 
    ? categories.filter(c => c.parentId === category.id)
    : [];

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setOnlyInStock(false);
    setFilterBestseller(false);
    setFilterNew(false);
    setFilterOnSale(false);
    setSortBy('');
  };

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Categorie negăsită</h1>
          <p>Categoria pe care o căutați nu există.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mb-6">{category.description}</p>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline"
              onClick={toggleFilter}
              className="w-full flex items-center justify-center"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {isFilterOpen ? 'Ascunde filtrele' : 'Arată filtrele'}
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <div 
            className={`w-full md:w-64 bg-white p-4 rounded-lg shadow md:block ${
              isFilterOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filtre</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-burgundy"
              >
                Resetează
              </Button>
            </div>
            
            {/* Category filter */}
            {subcategories.length > 0 && (
              <Accordion type="single" collapsible defaultValue="categories" className="mb-4">
                <AccordionItem value="categories">
                  <AccordionTrigger className="text-sm font-medium">Categorii</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {subcategories.map((subcat) => (
                        <div key={subcat.id} className="flex items-center">
                          <Checkbox 
                            id={`category-${subcat.id}`}
                            checked={selectedCategories.includes(subcat.id)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(subcat.id, checked as boolean)
                            }
                          />
                          <label 
                            htmlFor={`category-${subcat.id}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {subcat.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            
            {/* Price range filter */}
            <Accordion type="single" collapsible defaultValue="price" className="mb-4">
              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-medium">Preț</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">De la:</span>
                      <Input 
                        type="number" 
                        min="0" 
                        max={priceRange[1]} 
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                        className="w-24 text-right"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Până la:</span>
                      <Input 
                        type="number" 
                        min={priceRange[0]} 
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Availability filter */}
            <Accordion type="single" collapsible defaultValue="availability" className="mb-4">
              <AccordionItem value="availability">
                <AccordionTrigger className="text-sm font-medium">Disponibilitate</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center">
                    <Checkbox 
                      id="in-stock"
                      checked={onlyInStock}
                      onCheckedChange={(checked) => setOnlyInStock(checked as boolean)}
                    />
                    <label 
                      htmlFor="in-stock"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Doar produse în stoc
                    </label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Product features filter */}
            <Accordion type="single" collapsible defaultValue="features" className="mb-4">
              <AccordionItem value="features">
                <AccordionTrigger className="text-sm font-medium">Caracteristici</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="bestseller"
                        checked={filterBestseller}
                        onCheckedChange={(checked) => setFilterBestseller(checked as boolean)}
                      />
                      <label 
                        htmlFor="bestseller"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Best Seller
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="new"
                        checked={filterNew}
                        onCheckedChange={(checked) => setFilterNew(checked as boolean)}
                      />
                      <label 
                        htmlFor="new"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Noutăți
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="sale"
                        checked={filterOnSale}
                        onCheckedChange={(checked) => setFilterOnSale(checked as boolean)}
                      />
                      <label 
                        htmlFor="sale"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Reduceri
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and count bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produs' : 'produse'}
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sortează după:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sortează după" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low-high">Preț: ascendent</SelectItem>
                    <SelectItem value="price-high-low">Preț: descendent</SelectItem>
                    <SelectItem value="newest">Cele mai noi</SelectItem>
                    <SelectItem value="bestsellers">Cele mai populare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-muted p-8 text-center rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Nu s-au găsit produse</h3>
                <p className="text-gray-600">
                  Încercați să modificați filtrele pentru a vedea mai multe produse.
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Resetează filtrele
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
