import CheckoutPage from "@/app-pages/checkout/ui/CheckoutPage";

export const metadata = {
  title: "Checkout — Mriya Foods",
  description:
    "Provide your shipping information, choose a delivery option and packaging, select a payment method, and complete your purchase securely.",
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
