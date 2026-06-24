import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  weight: string;
  imageUrl: string | StaticImageData;
}
