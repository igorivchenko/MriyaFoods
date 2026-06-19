"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Custom liquid glass theme styling
        style: {
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          color: "var(--foreground)",
          backdropFilter: "blur(var(--glass-backdrop-blur))",
          WebkitBackdropFilter: "blur(var(--glass-backdrop-blur))",
          boxShadow: "var(--glass-shadow)",
          fontFamily: "var(--font-label)",
          fontSize: "var(--font-size-sm)",
          borderRadius: "var(--radius-sm)",
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--color-white)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-error)",
            secondary: "var(--color-white)",
          },
        },
      }}
    />
  );
};
