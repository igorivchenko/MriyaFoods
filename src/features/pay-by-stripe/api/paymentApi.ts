import { CartItem } from "@/entities/cart/model/types";

interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (
  cartItems: CartItem[],
): Promise<CreatePaymentIntentResponse> => {
  const mappedItems = cartItems.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: mappedItems }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to initialize payment intent");
  }

  return data as CreatePaymentIntentResponse;
};
