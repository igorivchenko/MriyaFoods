import { Product } from "../types";
import cherryImg from "@/assets/images/catalog/cherry.png";
import condensedMilkImg from "@/assets/images/catalog/condensed_milk.png";
import peachImg from "@/assets/images/catalog/peach.png";
import plombiriniImg from "@/assets/images/catalog/plombirini.png";
import strawberryImg from "@/assets/images/catalog/strawberry.png";
import wildBerriesImg from "@/assets/images/catalog/wild_berries.png";

export const popularProducts: Product[] = [
  {
    id: "p1",
    title: "Sweet Condensed Milk",
    description: "Classic sweet condensed milk, perfect for desserts and coffee.",
    price: 4.99,
    weight: "100g",
    imageUrl: condensedMilkImg,
  },
  {
    id: "p2",
    title: "Plombirini Gelato",
    description: "Rich and creamy traditional plombir ice cream.",
    price: 3.49,
    weight: "100g",
    imageUrl: plombiriniImg,
  },
  {
    id: "p3",
    title: "Forest Wild Berries Mix",
    description: "A delicious blend of forest wild berries.",
    price: 6.99,
    weight: "100g",
    imageUrl: wildBerriesImg,
  },
  {
    id: "p4",
    title: "Sour Cherry Jam",
    description: "Premium sour cherries, ideal for baking or eating fresh.",
    price: 5.49,
    weight: "100g",
    imageUrl: cherryImg,
  },
  {
    id: "p5",
    title: "Juicy Peach Halves",
    description: "Juicy peach slices preserved in light syrup.",
    price: 5.99,
    weight: "100g",
    imageUrl: peachImg,
  },
  {
    id: "p6",
    title: "Strawberry Nectar",
    description: "Freshly pressed strawberry juice with pulp.",
    price: 4.29,
    weight: "100g",
    imageUrl: strawberryImg,
  },
];

export const newProducts: Product[] = [
  {
    id: "n1",
    title: "Sour Cherry Jam",
    description: "Premium sour cherries, ideal for baking or eating fresh.",
    price: 5.49,
    weight: "100g",
    imageUrl: cherryImg,
  },
  {
    id: "n2",
    title: "Juicy Peach Halves",
    description: "Juicy peach slices preserved in light syrup.",
    price: 5.99,
    weight: "100g",
    imageUrl: peachImg,
  },
  {
    id: "n3",
    title: "Strawberry Nectar",
    description: "Freshly pressed strawberry juice with pulp.",
    price: 4.29,
    weight: "100g",
    imageUrl: strawberryImg,
  },
  {
    id: "n4",
    title: "Sour Cherry Jam",
    description: "Premium sour cherries, ideal for baking or eating fresh.",
    price: 5.49,
    weight: "100g",
    imageUrl: cherryImg,
  },
  {
    id: "n5",
    title: "Juicy Peach Halves",
    description: "Juicy peach slices preserved in light syrup.",
    price: 5.99,
    weight: "100g",
    imageUrl: peachImg,
  },
  {
    id: "n6",
    title: "Strawberry Nectar",
    description: "Freshly pressed strawberry juice with pulp.",
    price: 4.29,
    weight: "100g",
    imageUrl: strawberryImg,
  },
];
