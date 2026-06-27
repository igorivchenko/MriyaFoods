import { useAppDispatch, useAppSelector } from "@/app/store";
import { Product } from "@/entities/product";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
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
    dispatch(addToCartAction(product));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCartAction(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantityAction({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCartAction());
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
