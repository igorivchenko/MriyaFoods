"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, Product } from "@/entities/product";
import { useCart } from "@/entities/cart";
import styles from "./ProductCarousel.module.css";

// Import Swiper styles directly into the widget file as instructed
import "swiper/css";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  autoplay?: boolean;
}

export const ProductCarousel = ({
  title,
  products,
  autoplay = false,
}: ProductCarouselProps) => {
  const { addToCart } = useCart();
  const modules = [Navigation];
  if (autoplay) {
    modules.push(Autoplay);
  }

  // Create unique selectors for multiple carousels on the same page
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const prevClass = `carousel-prev-${cleanTitle}`;
  const nextClass = `carousel-next-${cleanTitle}`;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.carouselWrapper}>
          {/* Custom Navigation Buttons Matching Brand Identity */}
          <button
            type="button"
            className={`${styles.navButton} ${styles.prevButton} ${prevClass}`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={`${styles.navButton} ${styles.nextButton} ${nextClass}`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>

          <Swiper
            modules={modules}
            navigation={{
              prevEl: `.${prevClass}`,
              nextEl: `.${nextClass}`,
              disabledClass: styles.disabled,
            }}
            autoplay={
              autoplay
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className={styles.swiperContainer}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className={styles.slide}>
                <ProductCard product={product} onAddToCart={addToCart} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

ProductCarousel.displayName = "ProductCarousel";
