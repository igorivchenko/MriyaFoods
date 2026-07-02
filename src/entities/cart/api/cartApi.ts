import { supabase } from "@/shared/api/supabaseClient";
import { CartItem } from "../model/types";

interface DbCartItem {
  quantity: number;
  product: {
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
  };
}

// Helper to map DB cart item structure to FE CartItem structure
const mapCartItem = (item: DbCartItem): CartItem => ({
  product: {
    id: item.product.id,
    title: item.product.title,
    description: item.product.description || "",
    price: Number(item.product.price),
    weight: item.product.weight,
    imageUrl: item.product.image_url,
    category: item.product.category,
    brand: item.product.brand || undefined,
    manufacturer: item.product.manufacturer || undefined,
    inStock: item.product.in_stock,
  },
  quantity: item.quantity,
});

/**
 * Fetches all cart items for a given user from the Supabase database.
 */
export const fetchDbCart = async (userId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, product:products(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching cart from DB:", error.message);
    throw error;
  }

  return (data || []).map(mapCartItem);
};

/**
 * Inserts or updates the quantity of a product in the user's database cart.
 */
export const upsertDbCartItem = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<void> => {
  const { error } = await supabase.from("cart_items").upsert(
    {
      user_id: userId,
      product_id: productId,
      quantity,
    },
    { onConflict: "user_id,product_id" },
  );

  if (error) {
    console.error("Error upserting cart item in DB:", error.message);
    throw error;
  }
};

/**
 * Deletes a single product from the user's database cart.
 */
export const deleteDbCartItem = async (
  userId: string,
  productId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error deleting cart item from DB:", error.message);
    throw error;
  }
};

/**
 * Deletes all cart items for a given user from the database.
 */
export const clearDbCart = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error clearing cart from DB:", error.message);
    throw error;
  }
};
