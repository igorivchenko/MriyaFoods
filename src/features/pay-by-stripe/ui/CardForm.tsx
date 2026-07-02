"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/shared/ui";
import { CheckoutFormValues } from "@/features/create-order";
import styles from "./StripePayment.module.css";

interface CardFormProps {
  onSuccess: () => void;
  billingDetails: CheckoutFormValues;
}

const getCountryCode = (countryName: string): string => {
  const normalized = countryName.trim().toLowerCase();
  const mapping: Record<string, string> = {
    ukraine: "UA",
    україна: "UA",
    украина: "UA",
    ua: "UA",
    "united states": "US",
    usa: "US",
    us: "US",
    "united kingdom": "GB",
    uk: "GB",
    gb: "GB",
    germany: "DE",
    de: "DE",
    poland: "PL",
    pl: "PL",
  };
  return mapping[normalized] || "UA";
};

export const CardForm = ({ onSuccess, billingDetails }: CardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { firstName, lastName, phone, email, country, city, street, postcode } =
    billingDetails;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`,
              email: email,
              phone: phone,
              address: {
                country: getCountryCode(country),
                city: city,
                line1: street,
                postal_code: postcode,
              },
            },
          },
        },
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Payment confirmation failed");
        setIsProcessing(false);
      } else {
        // Successful payment, run the callback (cart clearing & redirect)
        onSuccess();
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.cardInputWrapper}>
        <label className={styles.cardInputLabel}>Payment details</label>
        {/* Render Stripe's unified, automatically configured Payment Element */}
        <PaymentElement id="stripe-payment-element" />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className={styles.submitBtn}
        disabled={!stripe || isProcessing}
        isLoading={isProcessing}
      >
        Pay secure
      </Button>
    </form>
  );
};

CardForm.displayName = "CardForm";
export default CardForm;
