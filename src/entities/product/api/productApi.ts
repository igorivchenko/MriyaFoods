import { supabase } from "@/shared/api/supabaseClient";
import { Product } from "../model/types";

interface DbProduct {
  id: string;
  title: string;
  description?: string | null;
  price: number | string;
  weight: string;
  image_url: string;
  category?: string;
  brand?: string | null;
  manufacturer?: string | null;
  in_stock?: boolean;
}

// Helper to map DB row to FE Product interface
const mapProduct = (p: DbProduct): Product => ({
  id: p.id,
  title: p.title,
  description: p.description || "",
  price: Number(p.price),
  weight: p.weight,
  imageUrl: p.image_url,
  category: p.category,
  brand: p.brand || undefined,
  manufacturer: p.manufacturer || undefined,
  inStock: p.in_stock,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return (data || []).map(mapProduct);
};

export const fetchPopularProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_popular", true);
  if (error) throw error;
  return (data || []).map(mapProduct);
};

export const fetchNewProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true);
  if (error) throw error;
  return (data || []).map(mapProduct);
};
