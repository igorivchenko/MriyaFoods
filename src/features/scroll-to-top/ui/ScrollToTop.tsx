"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import styles from "./ScrollToTop.module.css";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility based on vertical scroll offset (threshold: 400px)
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrolled > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check in case page starts scrolled down
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          className={styles.scrollBtn}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className={styles.icon} size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

ScrollToTop.displayName = "ScrollToTop";
