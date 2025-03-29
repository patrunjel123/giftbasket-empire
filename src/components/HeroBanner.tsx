
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Coșuri cadou pentru orice ocazie',
    subtitle: 'Descoperă selecția noastră premium de cadouri care impresionează de fiecare dată',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=1920',
    ctaLink: '/category/cosuri-sarbatori',
    ctaText: 'Descoperă colecția',
  },
  {
    id: 2,
    title: 'Coșuri cadou business',
    subtitle: 'Soluții elegante pentru partenerii și clienții companiei tale',
    image: 'https://images.unsplash.com/photo-1596115763708-69932435a733?q=80&w=1920',
    ctaLink: '/category/cosuri-business',
    ctaText: 'Comenzi corporate',
  },
  {
    id: 3,
    title: 'Creează-ți propriul coș cadou',
    subtitle: 'Personalizează fiecare detaliu pentru un cadou cu adevărat unic',
    image: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=1920',
    ctaLink: '/custom',
    ctaText: 'Personalizează acum',
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative overflow-hidden h-[500px] sm:h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl text-white mb-8">
                {slide.subtitle}
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to={slide.ctaLink}>
                  {slide.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide
                  ? 'bg-primary'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
