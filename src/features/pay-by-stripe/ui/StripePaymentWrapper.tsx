"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import { useCart } from "@/entities/cart";
import { errorToast } from "@/shared/lib/helpers/toast";
import { createPaymentIntent } from "../api/paymentApi";
import { CardForm } from "./CardForm";
import { CheckoutFormValues } from "@/features/create-order";
import { useTheme } from "@/entities/theme";
import styles from "./StripePayment.module.css";

// Initialize Stripe outside component render to avoid re-instantiation
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  {
    developerTools: {
      assistant: {
        enabled: process.env.NODE_ENV === "development",
      },
    },
  },
);

interface StripePaymentWrapperProps {
  onSuccess: () => void;
  billingDetails: CheckoutFormValues;
}

export const StripePaymentWrapper = ({
  onSuccess,
  billingDetails,
}: StripePaymentWrapperProps) => {
  const { cartItems } = useCart();
  const { isDark } = useTheme();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(cartItems.length > 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        const data = await createPaymentIntent(cartItems);
        setClientSecret(data.clientSecret);
      } catch (err: unknown) {
        errorToast(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [cartItems]);

  // Configure Stripe's appearance API to match project look and feel
  const appearance = {
    theme: (isDark ? "night" : "stripe") as "night" | "stripe",
    variables: {
      colorPrimary: isDark ? "#ffd42f" : "#4e2e1e",
      colorBackground: isDark ? "#291810" : "#ffffff", // Dark brown palette or pure white
      colorText: isDark ? "#ffffff" : "#1a1a1a",
      colorDanger: "#a31d1d",
      borderRadius: "4px",
      colorBorder: isDark
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(78, 46, 30, 0.15)",
      colorBorderHover: isDark
        ? "rgba(255, 255, 255, 0.25)"
        : "rgba(78, 46, 30, 0.25)",
      colorBorderFocus: isDark ? "#ffd42f" : "#4e2e1e",
    },
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <ClipLoader
          color="var(--color-primary)"
          size={35}
          speedMultiplier={0.8}
        />
        <p className={styles.loadingText}>Initializing secure payment...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Unable to initialize payment processor.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.paymentTitle}>Pay secure</h4>
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <CardForm onSuccess={onSuccess} billingDetails={billingDetails} />
      </Elements>
    </div>
  );
};

StripePaymentWrapper.displayName = "StripePaymentWrapper";
export default StripePaymentWrapper;
