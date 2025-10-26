import heroImage from '@/assets/hero-image.jpg';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Remeras Lisas Premium
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Hechas en Argentina con la mejor calidad
        </p>
        <Button 
          size="lg" 
          className="text-base px-8"
          onClick={scrollToCatalog}
        >
          Ver Catálogo
        </Button>
      </div>
    </section>
  );
};

export default Hero;
