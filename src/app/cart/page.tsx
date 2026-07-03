import CartPage from "@/app-pages/cart/ui/CartPage";

export const metadata = {
  title: "Shopping Cart — Mriya Foods",
  description:
    "Review items in your shopping cart, update quantities, or proceed to checkout to finalize your purchase.",
};

export default function CartRoute() {
  return <CartPage />;
}
