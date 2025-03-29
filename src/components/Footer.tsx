
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Despre Noi</h3>
            <p className="text-gray-300 mb-4">
              GiftBasket Empire oferă coșuri cadou premium pentru toate ocaziile. Ne specializăm în crearea de experiențe memorabile prin selecții rafinate și prezentare impecabilă.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Link-uri Rapide</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Acasă
                </Link>
              </li>
              <li>
                <Link to="/category/cosuri-sarbatori" className="text-gray-300 hover:text-white">
                  Coșuri pentru Sărbători
                </Link>
              </li>
              <li>
                <Link to="/category/cosuri-gourmet" className="text-gray-300 hover:text-white">
                  Coșuri Gourmet
                </Link>
              </li>
              <li>
                <Link to="/category/cosuri-business" className="text-gray-300 hover:text-white">
                  Coșuri Business
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-300 hover:text-white">
                  Coșuri Personalizate
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Servicii Clienți</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-gray-300 hover:text-white">
                  Contul Meu
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white">
                  Urmărire Comandă
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  Întrebări Frecvente
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white">
                  Informații Livrare
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">
                  Politica de Returnare
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gold" />
                <span className="text-gray-300">
                  Strada Exemplu 123, București, România
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gold" />
                <a href="tel:+40123456789" className="text-gray-300 hover:text-white">
                  +40 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gold" />
                <a href="mailto:contact@giftbasketempire.ro" className="text-gray-300 hover:text-white">
                  contact@giftbasketempire.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GiftBasket Empire. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
