import { useAppDispatch, useAppSelector } from "@/app/store";
import { Product } from "@/entities/product";
import {
  addToCartThunk,
  removeFromCartThunk,
  updateQuantityThunk,
  clearCartThunk,
} from "./cartSlice";
import toast from "react-hot-toast";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      toast.success(
        `Increased ${product.title} quantity to ${existing.quantity + 1}!`,
      );
    } else {
      toast.success(`${product.title} added to cart!`);
    }
    dispatch(addToCartThunk(product));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCartThunk(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantityThunk({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCartThunk());
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return {
    cartItems,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    totalCount,
    totalPrice,
  };
};
