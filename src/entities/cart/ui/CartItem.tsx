"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../model/types";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const { product, quantity } = item;
  const { id, title, price, weight, imageUrl } = product;
  const totalPrice = price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  return (
    <article className={styles.itemRow}>
      {/* 1. Product Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 70px, 80px"
          className={styles.image}
        />
      </div>

      {/* 2. Product Title & Weight */}
      <div className={styles.details}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.weight}>{weight}</span>
      </div>

      {/* 3. Quantity Controls */}
      <div className={styles.quantityControls}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={handleDecrease}
          disabled={quantity <= 1}
          aria-label={`Decrease quantity of ${title}`}
        >
          <Minus size={12} />
        </button>
        <span className={styles.qtyVal} aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${title}`}
        >
          <Plus size={12} />
        </button>
      </div>

      {/* 4. Single / Total Price */}
      <div className={styles.priceZone}>
        <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
        {quantity > 1 && (
          <span className={styles.singlePrice}>(${price.toFixed(2)} each)</span>
        )}
      </div>

      {/* 5. Minimalist Trash Action */}
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onRemove(id)}
        aria-label={`Remove ${title} from cart`}
      >
        <Trash2 size={16} />
      </button>
    </article>
  );
};

CartItem.displayName = "CartItem";
export default CartItem;
