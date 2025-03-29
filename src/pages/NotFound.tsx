
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <ShoppingBag className="h-24 w-24 text-burgundy opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-burgundy">404</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Pagină negăsită</h1>
        
        <p className="text-gray-600 mb-8">
          Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-burgundy hover:bg-burgundy/90">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Înapoi acasă
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-burgundy text-burgundy hover:bg-burgundy/5">
            <Link to="/category/all">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Vizitează magazinul
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
