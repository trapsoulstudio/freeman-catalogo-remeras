import { X, Plus, Minus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

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
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('pickup');

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
      ? '\n📦 *Envío a domicilio*'
      : '\n📍 *Retiro en: San Alberto 1336, Barrio San Vicente*';

    const fullMessage = `¡Hola! Quiero encargar estas remeras:\n\n${message}\n\n*Total: $${total}*${deliveryInfo}`;
    
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
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Método de entrega</Label>
                  <RadioGroup value={deliveryMethod} onValueChange={(value) => setDeliveryMethod(value as 'delivery' | 'pickup')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="font-normal cursor-pointer">
                        Retiro en Barrio San Vicente (San Alberto 1336)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="font-normal cursor-pointer">
                        Envío a domicilio
                      </Label>
                    </div>
                  </RadioGroup>
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
