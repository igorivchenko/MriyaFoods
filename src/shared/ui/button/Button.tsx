import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Style variant of the button.
   * - `primary`: Dark brown background with brand styling.
   * - `secondary`: Bright yellow/gold background.
   * - `glass`: Translucent glassmorphic off-white style.
   * - `icon`: Styled square/circular container optimized for icons.
   */
  variant?: "primary" | "secondary" | "glass" | "icon";
  /**
   * Sizing of the button.
   * - `sm`: 32px height, smaller fonts and padding.
   * - `md`: 40px height, default UI size.
   * - `lg`: 52px height, large action size.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Make button fully rounded/circular (often used for circular icon buttons).
   */
  rounded?: boolean;
  /**
   * Icon to render to the left of the button text.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to render to the right of the button text.
   */
  rightIcon?: React.ReactNode;
  /**
   * General icon slot. Renders on the left by default unless `iconPosition` is "right".
   */
  icon?: React.ReactNode;
  /**
   * Position of the general `icon` prop relative to children. Defaults to "left".
   */
  iconPosition?: "left" | "right";
  /**
   * React 19 ref type signature.
   */
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = ({
  variant = "primary",
  size = "md",
  rounded = false,
  leftIcon,
  rightIcon,
  icon,
  iconPosition = "left",
  className = "",
  children,
  ref,
  ...props
}: ButtonProps) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.circular]: rounded,
    },
    className,
  );

  const renderLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (icon && iconPosition === "left") return icon;
    return null;
  };

  const renderRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (icon && iconPosition === "right") return icon;
    return null;
  };

  return (
    <button ref={ref} className={buttonClasses} {...props}>
      {renderLeftIcon()}
      {children && <span className={styles.text}>{children}</span>}
      {renderRightIcon()}
    </button>
  );
};

Button.displayName = "Button";
