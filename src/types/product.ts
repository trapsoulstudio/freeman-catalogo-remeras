export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Color = 'white' | 'black' | 'beige' | 'gray' | 'blue';

export interface Product {
  id: string;
  name: string;
  price: number;
  colors: Color[];
  sizes: Size[];
  image: string;
}

export interface CartItem {
  product: Product;
  color: Color;
  size: Size;
  quantity: number;
}

export interface SizeMeasurements {
  size: Size;
  width: number;
  length: number;
  sleeve: number;
}

export const SIZE_CHART: SizeMeasurements[] = [
  { size: 'S', width: 45, length: 68, sleeve: 18 },
  { size: 'M', width: 49, length: 73, sleeve: 19 },
  { size: 'L', width: 53, length: 75, sleeve: 19 },
  { size: 'XL', width: 56, length: 77, sleeve: 20 },
  { size: 'XXL', width: 60, length: 80, sleeve: 22 },
];
