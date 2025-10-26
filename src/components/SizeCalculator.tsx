import { useState } from 'react';
import { Size, SIZE_CHART } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Ruler } from 'lucide-react';

type Build = 'small' | 'medium' | 'large';

const SizeCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [build, setBuild] = useState<Build>('medium');
  const [recommendedSize, setRecommendedSize] = useState<Size | null>(null);

  const calculateSize = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h < 140 || h > 220 || w < 40 || w > 150) {
      return;
    }

    // BMI calculation
    const bmi = w / ((h / 100) ** 2);

    // Size logic based on height, weight and build
    let size: Size = 'M';

    if (h < 165) {
      if (bmi < 20 || build === 'small') size = 'S';
      else if (bmi < 25 || build === 'medium') size = 'M';
      else size = 'L';
    } else if (h < 175) {
      if (bmi < 20 || build === 'small') size = 'M';
      else if (bmi < 25 || build === 'medium') size = 'L';
      else size = 'XL';
    } else if (h < 185) {
      if (bmi < 22 || build === 'small') size = 'L';
      else if (bmi < 27 || build === 'medium') size = 'XL';
      else size = 'XXL';
    } else {
      if (bmi < 24) size = 'XL';
      else size = 'XXL';
    }

    setRecommendedSize(size);
  };

  const getMeasurements = (size: Size) => {
    return SIZE_CHART.find(s => s.size === size);
  };

  return (
    <section id="size-calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Ruler className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Calculadora de Talles</h2>
            <p className="text-muted-foreground text-lg">Encontrá tu talle perfecto</p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="140"
                  max="220"
                />
              </div>

              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="40"
                  max="150"
                />
              </div>

              <div>
                <Label htmlFor="build">Contextura</Label>
                <Select value={build} onValueChange={(value) => setBuild(value as Build)}>
                  <SelectTrigger id="build">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeña</SelectItem>
                    <SelectItem value="medium">Mediana</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" size="lg" onClick={calculateSize}>
                Calcular mi Talle
              </Button>

              {recommendedSize && (
                <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Tu talle ideal es: <span className="text-primary">{recommendedSize}</span>
                  </h3>
                  
                  <div className="mt-6 space-y-2 text-sm">
                    <p className="font-semibold mb-3">Medidas del talle {recommendedSize}:</p>
                    {getMeasurements(recommendedSize) && (
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-muted-foreground">Ancho</p>
                          <p className="font-semibold">{getMeasurements(recommendedSize)?.width} cm</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Largo</p>
                          <p className="font-semibold">{getMeasurements(recommendedSize)?.length} cm</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Manga</p>
                          <p className="font-semibold">{getMeasurements(recommendedSize)?.sleeve} cm</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold mb-4 text-center">Tabla de Medidas Completa</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Talle</th>
                        <th className="text-center py-2">Ancho</th>
                        <th className="text-center py-2">Largo</th>
                        <th className="text-center py-2">Manga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_CHART.map((size) => (
                        <tr key={size.size} className="border-b">
                          <td className="py-2 font-medium">{size.size}</td>
                          <td className="text-center">{size.width} cm</td>
                          <td className="text-center">{size.length} cm</td>
                          <td className="text-center">{size.sleeve} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SizeCalculator;
