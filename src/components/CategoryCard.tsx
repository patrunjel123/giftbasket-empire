
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/category/${category.slug}`} 
      className="group block relative overflow-hidden rounded-lg shadow-md aspect-square animate-fade-in transition-all duration-300 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300 z-10" />
      
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-md group-hover:text-primary group-hover:scale-110 transition-all duration-300">{category.name}</h3>
        {category.description && (
          <p className="text-white text-sm max-w-xs drop-shadow-md hidden md:block group-hover:text-white/90">
            {category.description}
          </p>
        )}
        <span className="mt-3 inline-block bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium group-hover:bg-primary/90 transition-colors">
          Vezi produse
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
