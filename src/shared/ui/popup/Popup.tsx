"use client";

import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Popup.module.css";

interface PopupProps {
  /** The content to show inside the popup bubble. */
  content: React.ReactNode;
  /** The trigger element (e.g. an icon button). */
  children: React.ReactNode;
  /** Positioning of the popup relative to the trigger. Defaults to "top". */
  position?: "top" | "bottom" | "left" | "right";
}

/**
 * A reusable hover-triggered popup (tooltip) component.
 * Uses a React Portal to render above all content, avoiding overflow clipping.
 */
export const Popup = ({ content, children, position = "top" }: PopupProps) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const bubbleEl = bubbleRef.current;
    if (!triggerEl || !bubbleEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const bubbleRect = bubbleEl.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = rect.top - bubbleRect.height - gap + window.scrollY;
        left =
          rect.left + rect.width / 2 - bubbleRect.width / 2 + window.scrollX;
        break;
      case "bottom":
        top = rect.bottom + gap + window.scrollY;
        left =
          rect.left + rect.width / 2 - bubbleRect.width / 2 + window.scrollX;
        break;
      case "left":
        top =
          rect.top + rect.height / 2 - bubbleRect.height / 2 + window.scrollY;
        left = rect.left - bubbleRect.width - gap + window.scrollX;
        break;
      case "right":
        top =
          rect.top + rect.height / 2 - bubbleRect.height / 2 + window.scrollY;
        left = rect.right + gap + window.scrollX;
        break;
    }

    bubbleEl.style.top = `${top}px`;
    bubbleEl.style.left = `${left}px`;
    bubbleEl.style.visibility = "visible";
  }, [position]);

  useLayoutEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        requestAnimationFrame(updatePosition);
      });
    }
  }, [visible, updatePosition]);

  return (
    <div
      ref={triggerRef}
      className={styles.popupContainer}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible &&
        createPortal(
          <div
            ref={bubbleRef}
            className={`${styles.popupBubble} ${styles[position]}`}
            role="tooltip"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              visibility: "hidden",
            }}
          >
            <div className={styles.popupContent}>{content}</div>
            <div className={styles.popupArrow} />
          </div>,
          document.body,
        )}
    </div>
  );
};

Popup.displayName = "Popup";
