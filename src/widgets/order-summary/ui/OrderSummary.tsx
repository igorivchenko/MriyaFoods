"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/entities/cart";
import { Button } from "@/shared/ui";
import styles from "./OrderSummary.module.css";

// Helper function to parse weight string (e.g. "100 g" -> { value: 100, unit: "g" })
const parseWeight = (weightStr: string) => {
  const match = weightStr.match(
    /^(\d+(?:\.\d+)?)\s*([a-zA-Zа-яА-ЯіІїЇєЄґҐ]+)$/u,
  );
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2],
    };
  }
  return { value: 1, unit: "pcs" };
};

export const OrderSummary = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  // Delivery Cost: $5.00 default (or $0 if cart is empty)
  const deliveryCost = cartItems.length > 0 ? 5.0 : 0.0;
  const grandTotal = totalPrice + deliveryCost;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>Your order:</h3>

      {/* Pricing breakdowns */}
      <div className={styles.pricingRows}>
        <div className={styles.priceRow}>
          <span className={styles.rowLabel}>Subtotal:</span>
          <span className={styles.rowValue}>${totalPrice.toFixed(2)}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.rowLabel}>Delivery:</span>
          <span className={styles.rowValue}>${deliveryCost.toFixed(2)}</span>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalValue}>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Submit Button connected to checkout form */}
      <Button
        type="submit"
        form="checkout-form"
        variant="secondary"
        size="lg"
        className={styles.purchaseBtn}
        disabled={cartItems.length === 0}
      >
        Purchase
      </Button>

      {/* Scrollable list of items */}
      {cartItems.length > 0 && (
        <div className={styles.itemsListContainer}>
          <div className={styles.itemsList}>
            {cartItems.map((item) => {
              const { product, quantity } = item;
              const { id, title, price, weight, imageUrl } = product;
              const itemTotal = price * quantity;

              // Parse weight for weight controller rendering
              const parsed = parseWeight(weight);
              const totalWeightDisplay = `${(parsed.value * quantity).toFixed(0)} ${parsed.unit}`;

              return (
                <div key={id} className={styles.itemRow}>
                  {/* Thumbnail */}
                  <div className={styles.imageWrapper}>
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      sizes="64px"
                      className={styles.itemImage}
                    />
                  </div>

                  {/* Info Column */}
                  <div className={styles.itemInfo}>
                    <div className={styles.titleRow}>
                      <span className={styles.itemTitle}>{title}</span>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => removeFromCart(id)}
                        aria-label={`Remove ${title} from order`}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className={styles.controlsRow}>
                      {/* Weight Controller pill */}
                      <div className={styles.weightController}>
                        <button
                          type="button"
                          className={styles.controlBtn}
                          onClick={() => updateQuantity(id, quantity - 1)}
                          disabled={quantity <= 1}
                          aria-label={`Decrease weight of ${title}`}
                        >
                          <Minus size={10} />
                        </button>
                        <span className={styles.weightVal}>
                          {totalWeightDisplay}
                        </span>
                        <button
                          type="button"
                          className={styles.controlBtn}
                          onClick={() => updateQuantity(id, quantity + 1)}
                          aria-label={`Increase weight of ${title}`}
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className={styles.itemPrice}>
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

OrderSummary.displayName = "OrderSummary";
export default OrderSummary;
