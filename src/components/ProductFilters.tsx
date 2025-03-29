
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

interface FilterOption {
  id: string;
  name: string;
  count: number;
}

interface FiltersProps {
  onFilterChange: (filterType: string, value: string | number[] | boolean) => void;
  activeFilters: Record<string, any>;
  priceRange: [number, number];
  categories: FilterOption[];
  types: FilterOption[];
  brands: FilterOption[];
  occasions: FilterOption[];
  availability: FilterOption[];
}

const ProductFilters = ({
  onFilterChange,
  activeFilters,
  priceRange,
  categories,
  types,
  brands,
  occasions,
  availability
}: FiltersProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setLocalPriceRange(newRange);
  };
  
  const handlePriceChangeEnd = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    onFilterChange('price', newRange);
  };
  
  const handleCheckboxChange = (filterType: string, value: string, checked: boolean) => {
    onFilterChange(filterType, checked ? value : '');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold text-burgundy mb-4">Filtre</h2>
      
      <Accordion type="multiple" defaultValue={['price', 'categories']} className="space-y-2">
        <AccordionItem value="price" className="border-b pb-2">
          <AccordionTrigger className="font-medium">Preț</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <Slider 
                defaultValue={[localPriceRange[0], localPriceRange[1]]} 
                min={priceRange[0]} 
                max={priceRange[1]} 
                step={1}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceChangeEnd}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>{localPriceRange[0]} LEI</span>
                <span>{localPriceRange[1]} LEI</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="categories" className="border-b pb-2">
          <AccordionTrigger className="font-medium">Categorii</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={activeFilters.category === category.id}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('category', category.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm flex-grow cursor-pointer"
                  >
                    {category.name} <span className="text-gray-500">({category.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="types" className="border-b pb-2">
          <AccordionTrigger className="font-medium">Tip produs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {types.map((type) => (
                <div key={type.id} className="flex items-center">
                  <Checkbox 
                    id={`type-${type.id}`}
                    checked={activeFilters.type === type.id}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('type', type.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`type-${type.id}`}
                    className="ml-2 text-sm flex-grow cursor-pointer"
                  >
                    {type.name} <span className="text-gray-500">({type.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="brands" className="border-b pb-2">
          <AccordionTrigger className="font-medium">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <Checkbox 
                    id={`brand-${brand.id}`}
                    checked={activeFilters.brand === brand.id}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('brand', brand.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`brand-${brand.id}`}
                    className="ml-2 text-sm flex-grow cursor-pointer"
                  >
                    {brand.name} <span className="text-gray-500">({brand.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="occasions" className="border-b pb-2">
          <AccordionTrigger className="font-medium">Ocazii</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {occasions.map((occasion) => (
                <div key={occasion.id} className="flex items-center">
                  <Checkbox 
                    id={`occasion-${occasion.id}`}
                    checked={activeFilters.occasion === occasion.id}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('occasion', occasion.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`occasion-${occasion.id}`}
                    className="ml-2 text-sm flex-grow cursor-pointer"
                  >
                    {occasion.name} <span className="text-gray-500">({occasion.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability" className="border-b pb-2">
          <AccordionTrigger className="font-medium">Disponibilitate</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {availability.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox 
                    id={`availability-${option.id}`}
                    checked={activeFilters.availability === option.id}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('availability', option.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`availability-${option.id}`}
                    className="ml-2 text-sm flex-grow cursor-pointer"
                  >
                    {option.name} <span className="text-gray-500">({option.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
