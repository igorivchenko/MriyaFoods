import React from "react";
import Image from "next/image";
import { Heart, Info } from "lucide-react";
import { Button, Popup } from "@/shared/ui";
import { Product } from "../model/types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onShowInfo?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onShowInfo,
}: ProductCardProps) => {
  const { title, price, weight, imageUrl } = product;

  return (
    <article className={styles.card}>
      {/* Product Image on Top */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className={styles.image}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Row with Title + Heart/Info icons */}
      <div className={styles.titleRow}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        <div className={styles.icons}>
          <Popup
            content={product.description || "Premium European brand product."}
          >
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => onShowInfo?.(product)}
              aria-label={`View info for ${title}`}
            >
              <Info size={18} className={styles.infoIcon} />
            </button>
          </Popup>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onToggleWishlist?.(product)}
            aria-label={`Add ${title} to wishlist`}
          >
            <Heart size={18} className={styles.heartIcon} />
          </button>
        </div>
      </div>

      {/* Row with Price + Weight */}
      <div className={styles.priceRow}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        <span className={styles.weight}>{weight}</span>
      </div>

      {/* Prominent yellow Add to cart button stretching at the bottom */}
      <Button
        variant="secondary"
        size="md"
        className={styles.addToCartBtn}
        onClick={() => onAddToCart?.(product)}
      >
        Add to cart
      </Button>
    </article>
  );
};

ProductCard.displayName = "ProductCard";
