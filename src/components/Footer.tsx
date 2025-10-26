import { Instagram, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-4">FREEMAN</h3>
            <p className="text-primary-foreground/80">
              Remeras lisas premium hechas en Argentina
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#catalog" className="hover:text-primary-foreground transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#size-calculator" className="hover:text-primary-foreground transition-colors">
                  Calculadora de Talles
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <a
                href="https://wa.me/5491112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/freeman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                Instagram
              </a>
              <a
                href="mailto:contacto@freeman.com.ar"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Freeman. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
