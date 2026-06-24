"use client";

import React, { useState } from "react";
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
 */
export const Popup = ({ content, children, position = "top" }: PopupProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.popupContainer}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`${styles.popupBubble} ${styles[position]}`}
          role="tooltip"
        >
          <div className={styles.popupContent}>{content}</div>
          <div className={styles.popupArrow} />
        </div>
      )}
    </div>
  );
};

Popup.displayName = "Popup";
