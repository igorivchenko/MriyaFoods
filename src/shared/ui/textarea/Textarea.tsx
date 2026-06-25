import React, { useId } from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | boolean;
  wrapperClassName?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const Textarea = ({
  label,
  error,
  wrapperClassName = "",
  className = "",
  id: customId,
  disabled,
  ref,
  ...props
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = customId || generatedId;
  const hasError = !!error;

  const textareaClasses = [
    styles.textarea,
    hasError ? styles.textareaError : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`.trim()}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        className={textareaClasses}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={
          hasError && typeof error === "string"
            ? `${textareaId}-error`
            : undefined
        }
        {...props}
      />
      {hasError && typeof error === "string" && (
        <span
          id={`${textareaId}-error`}
          className={styles.errorText}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

Textarea.displayName = "Textarea";
