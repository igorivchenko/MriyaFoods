"use client";

import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/shared/ui";
import styles from "./LogoutConfirmModal.module.css";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const LogoutConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: LogoutConfirmModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <LogOut size={24} />
        </div>
        <h2 className={styles.title}>Sign Out</h2>
        <p className={styles.message}>
          Are you sure you want to sign out of your account?
        </p>
        <div className={styles.actions}>
          <Button
            type="button"
            variant="glass"
            className={styles.btnCancel}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.btnConfirm}
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

LogoutConfirmModal.displayName = "LogoutConfirmModal";
