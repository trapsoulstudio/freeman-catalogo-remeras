import { X, Plus, Minus, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import mapboxgl from 'mapbox-gl';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const COLOR_NAMES: Record<string, string> = {
  white: 'Blanca',
  black: 'Negra',
  beige: 'Beige',
  gray: 'Gris',
  blue: 'Azul',
};

const Cart = ({ open, onClose }: CartProps) => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');

  const calculateDeliveryCost = async () => {
    if (!deliveryAddress.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa una dirección de envío",
        variant: "destructive",
      });
      return;
    }

    if (!mapboxToken.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu token de Mapbox",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    try {
      mapboxgl.accessToken = mapboxToken;
      
      const originAddress = 'San Alberto 1336, Córdoba, Argentina';
      
      // Geocode origin
      const originResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(originAddress)}.json?access_token=${mapboxToken}&limit=1`
      );
      const originData = await originResponse.json();
      
      if (!originData.features || originData.features.length === 0) {
        throw new Error('No se pudo geocodificar la dirección de origen');
      }
      
      // Geocode destination
      const destinationResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(deliveryAddress + ', Córdoba, Argentina')}.json?access_token=${mapboxToken}&limit=1`
      );
      const destinationData = await destinationResponse.json();
      
      if (!destinationData.features || destinationData.features.length === 0) {
        toast({
          title: "Error",
          description: "No se pudo encontrar la dirección ingresada. Por favor verifica la dirección.",
          variant: "destructive",
        });
        setIsCalculating(false);
        return;
      }
      
      const origin = originData.features[0].center;
      const destination = destinationData.features[0].center;
      
      // Calculate distance using Haversine formula
      const R = 6371; // Earth's radius in km
      const dLat = (destination[1] - origin[1]) * Math.PI / 180;
      const dLon = (destination[0] - origin[0]) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(origin[1] * Math.PI / 180) * Math.cos(destination[1] * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      
      // Calculate cost based on distance
      let cost = 0;
      if (distance <= 3) {
        cost = 1000;
      } else if (distance <= 6) {
        cost = 2000;
      } else if (distance <= 10) {
        cost = 3000;
      } else {
        toast({
          title: "Distancia fuera de rango",
          description: `La distancia es ${distance.toFixed(1)}km. Solo realizamos envíos hasta 10km.`,
          variant: "destructive",
        });
        setIsCalculating(false);
        return;
      }
      
      setDeliveryCost(cost);
      toast({
        title: "Costo calculado",
        description: `Distancia: ${distance.toFixed(1)}km - Costo de envío: $${cost}`,
      });
    } catch (error) {
      console.error('Error calculating delivery cost:', error);
      toast({
        title: "Error",
        description: "No se pudo calcular el costo de envío. Por favor verifica tu token de Mapbox.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const message = items
      .map(
        (item) =>
          `• ${item.product.name} - ${COLOR_NAMES[item.color]} - Talle ${item.size} x${item.quantity} = $${
            item.product.price * item.quantity
          }`
      )
      .join('\n');

    const deliveryInfo = deliveryMethod === 'delivery' 
      ? `\n📦 *Envío a domicilio*\nDirección: ${deliveryAddress}\nCosto de envío: $${deliveryCost}`
      : '\n📍 *Retiro en: San Alberto 1336, Barrio San Vicente*';

    const orderTotal = deliveryMethod === 'delivery' ? total + deliveryCost : total;
    const fullMessage = `¡Hola! Quiero encargar estas remeras:\n\n${message}\n\n*Subtotal: $${total}*${deliveryInfo}\n\n*Total final: $${orderTotal}*`;
    
    // Replace with actual WhatsApp number
    const phoneNumber = '5491112345678'; // Format: country code + area code + number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {COLOR_NAMES[item.color]} · Talle {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-semibold">${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 space-y-4 border-t mt-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Método de entrega</Label>
                  <RadioGroup value={deliveryMethod} onValueChange={(value) => {
                    setDeliveryMethod(value as 'delivery' | 'pickup');
                    if (value === 'pickup') {
                      setDeliveryCost(0);
                      setDeliveryAddress('');
                    }
                  }}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="font-normal cursor-pointer">
                        Retiro en Barrio San Vicente (San Alberto 1336)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="font-normal cursor-pointer">
                        Envío a domicilio (1-10km)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="mapbox-token" className="text-xs">
                        Token de Mapbox (obtenerlo en{' '}
                        <a 
                          href="https://account.mapbox.com/access-tokens/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          mapbox.com
                        </a>
                        )
                      </Label>
                      <Input
                        id="mapbox-token"
                        type="text"
                        placeholder="pk.eyJ1..."
                        value={mapboxToken}
                        onChange={(e) => setMapboxToken(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery-address" className="text-sm">
                        Dirección de envío (Córdoba)
                      </Label>
                      <Input
                        id="delivery-address"
                        type="text"
                        placeholder="Ej: Av. Colón 1234"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={calculateDeliveryCost}
                      disabled={isCalculating}
                      className="w-full"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {isCalculating ? 'Calculando...' : 'Calcular costo de envío'}
                    </Button>
                    {deliveryCost > 0 && (
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">Tarifas: 1-3km $1000 • 4-6km $2000 • 7-10km $3000</p>
                        <p className="font-semibold text-primary">Costo de envío: ${deliveryCost}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center text-lg font-bold pt-2">
                  <span>Total:</span>
                  <span>${deliveryMethod === 'delivery' ? total + deliveryCost : total}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Encargar por WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
