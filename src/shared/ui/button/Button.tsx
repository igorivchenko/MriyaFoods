import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "icon";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = ({
  variant = "primary",
  size = "md",
  rounded = false,
  className = "",
  children,
  ref,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    rounded ? styles.circular : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "Button";
