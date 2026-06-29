"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useCart } from "@/entities/cart";
import { successToast, errorToast } from "@/shared/lib/helpers/toast";
import { CheckoutForm, CheckoutFormValues } from "@/features/create-order";
import { OrderSummary } from "@/widgets/order-summary";
import styles from "./CheckoutPage.module.css";

export const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle client-side hydration delays
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Redirect to catalog if cart is empty on initial load
  useEffect(() => {
    if (mounted && cartItems.length === 0 && !isSubmitted) {
      router.push("/catalog");
    }
  }, [mounted, cartItems.length, router, isSubmitted]);

  const handleSubmit = async (_values: CheckoutFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting order details:", _values);
      // Mock API request with 1.5-second delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mark as submitted to prevent empty cart redirect logic
      setIsSubmitted(true);

      successToast(
        "Order placed successfully! Thank you for choosing MriyaFoods.",
      );

      // Wipe persistent cart state
      clearCart();

      // Redirect to catalog
      router.push("/catalog");
    } catch (error) {
      errorToast(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || (cartItems.length === 0 && !isSubmitted)) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader
          color="var(--color-primary)"
          size={50}
          speedMultiplier={0.8}
        />
        <p className={styles.loadingText}>Preparing checkout...</p>
      </div>
    );
  }

  return (
    <main className={styles.pageContainer}>
      <div className={`${styles.wrapper} container`}>
        {/* Left Column: Form & Title */}
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <ChevronRight size={12} className={styles.breadcrumbSeparator} />
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Checkout
              </span>
            </nav>

            <h1 className={styles.pageTitle}>Checkout</h1>

            <div className={styles.formCard}>
              <CheckoutForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <aside className={styles.rightColumn}>
            <div className={styles.stickySummary}>
              <OrderSummary />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

CheckoutPage.displayName = "CheckoutPage";
export default CheckoutPage;
