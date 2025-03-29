
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  className?: string;
}

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, className }: SearchBarProps) => {
  return (
    <form onSubmit={handleSearch} className={`w-full relative ${className}`}>
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
  );
};

export default SearchBar;
