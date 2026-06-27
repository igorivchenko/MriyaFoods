"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useCart, CartItem } from "@/entities/cart";
import { Button } from "@/shared/ui";
import styles from "./CartPage.module.css";

export const CartPage = () => {
  const router = useRouter();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();
  const [mounted, setMounted] = useState(false);

  // Handle client-side hydration delays gracefully
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (!mounted) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader
          color="var(--color-primary)"
          size={50}
          speedMultiplier={0.8}
        />
        <p className={styles.loadingText}>Loading your cart...</p>
      </div>
    );
  }

  return (
    <main className={styles.pageContainer}>
      <div className={`${styles.wrapper} container`}>
        {/* Title Zone */}
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>
            Shopping Cart
            {totalCount > 0 && (
              <span className={styles.countBadge}>
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            )}
          </h1>
        </header>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <ShoppingBag size={48} className={styles.emptyIcon} />
            </div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptySubtitle}>
              Looks like you haven&apos;t added anything to your cart yet.
              Explore our premium selection of natural food products.
            </p>
            <Link href="/catalog" passHref>
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={18} />}
              >
                Go to Catalog
              </Button>
            </Link>
          </div>
        ) : (
          /* E-commerce 2-column Grid */
          <div className={styles.grid}>
            {/* Left Column: Cart items container */}
            <section className={styles.itemsSection}>
              <div className={styles.itemsCard}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}

                <div className={styles.clearCartRow}>
                  <button
                    type="button"
                    className={styles.clearCartBtn}
                    onClick={clearCart}
                  >
                    <Trash2 size={15} />
                    Clear Cart
                  </button>
                </div>
              </div>
            </section>

            {/* Right Column: Checkout summary sticky card */}
            <aside className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>

                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span className={styles.rowLabel}>Subtotal</span>
                    <span className={styles.rowValue}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span className={styles.rowLabel}>Delivery</span>
                    <span
                      className={`${styles.rowValue} ${styles.deliveryInfo}`}
                    >
                      Calculated at checkout
                    </span>
                  </div>

                  <hr className={styles.divider} />

                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span className={styles.totalLabel}>Total Price</span>
                    <span className={styles.totalValue}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="primary"
                  className={styles.checkoutBtn}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <div className={styles.additionalInfo}>
                  <p>✓ Fast local delivery in GTA area</p>
                  <p>✓ All items carefully selected and packed</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

CartPage.displayName = "CartPage";
export default CartPage;
