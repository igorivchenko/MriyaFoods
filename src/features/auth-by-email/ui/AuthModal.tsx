"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { signIn, signUp, signInWithOtp } from "../api/auth";
import styles from "./AuthModal.module.css";
import { Button } from "@/shared/ui";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "signin" | "signup" | "magiclink";

const authSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
});

type AuthFormValues = z.infer<typeof authSchema>;

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!isOpen) return null;

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    reset();
  };

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (mode === "magiclink") {
        await signInWithOtp(values.email);
        toast.success("Magic link sent! Check your email inbox.", {
          duration: 6000,
        });
        onClose();
      } else if (mode === "signin") {
        if (!values.password) {
          toast.error("Password is required for Sign In");
          setIsLoading(false);
          return;
        }
        await signIn({ email: values.email, password: values.password });
        toast.success("Successfully signed in!");
        onClose();
      } else {
        if (!values.password) {
          toast.error("Password is required for Sign Up");
          setIsLoading(false);
          return;
        }
        await signUp({ email: values.email, password: values.password });
        toast.success("Successfully signed up! Please check email to verify.");
        onClose();
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Authentication failed";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFooter = () => {
    if (mode === "signin") {
      return (
        <>
          <p className={styles.switchText}>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => handleModeChange("signup")}
              disabled={isLoading}
            >
              Sign Up
            </button>
          </p>
          <button
            type="button"
            className={styles.switchModeLink}
            onClick={() => handleModeChange("magiclink")}
            disabled={isLoading}
          >
            Or sign in with Magic Link
          </button>
        </>
      );
    }

    if (mode === "signup") {
      return (
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => handleModeChange("signin")}
            disabled={isLoading}
          >
            Sign In
          </button>
        </p>
      );
    }

    return (
      <button
        type="button"
        className={styles.switchModeLink}
        onClick={() => handleModeChange("signin")}
        disabled={isLoading}
      >
        Back to Password Sign In
      </button>
    );
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.logoIcon}>
            <Sparkles size={24} className={styles.sparkle} />
          </div>
          <h2 className={styles.title}>
            {mode === "signin" && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "magiclink" && "Magic Sign In"}
          </h2>
          <p className={styles.subtitle}>
            {mode === "signin" && "Sign in to manage your orders & preferences"}
            {mode === "signup" && "Join us and enjoy premium foods delivered"}
            {mode === "magiclink" && "Get a one-click login link in your email"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="auth-email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                id="auth-email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                placeholder="you@example.com"
                disabled={isLoading}
                {...register("register" in register ? "email" : "email")}
              />
            </div>
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          {mode !== "magiclink" && (
            <div className={styles.inputGroup}>
              <label htmlFor="auth-password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  id="auth-password"
                  type="password"
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <span className={styles.errorText}>
                  {errors.password.message}
                </span>
              )}
            </div>
          )}

          <Button
            type="submit"
            variant="secondary"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={20} color="currentColor" />
            ) : (
              <span className={styles.btnContent}>
                <span>
                  {mode === "signin" && "Sign In"}
                  {mode === "signup" && "Sign Up"}
                  {mode === "magiclink" && "Send Link"}
                </span>
                <ArrowRight size={16} className={styles.arrow} />
              </span>
            )}
          </Button>
        </form>

        {/* Footer actions */}
        <div className={styles.modalFooter}>{renderFooter()}</div>
      </div>
    </div>
  );
};

AuthModal.displayName = "AuthModal";
export default AuthModal;
