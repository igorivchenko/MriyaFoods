import React, { useId } from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  wrapperClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = ({
  label,
  error,
  wrapperClassName = "",
  className = "",
  id: customId,
  disabled,
  ref,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const hasError = !!error;

  const inputClasses = [
    styles.input,
    hasError ? styles.inputError : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`.trim()}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        className={inputClasses}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={
          hasError && typeof error === "string" ? `${inputId}-error` : undefined
        }
        {...props}
      />
      {hasError && typeof error === "string" && (
        <span id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

Input.displayName = "Input";
