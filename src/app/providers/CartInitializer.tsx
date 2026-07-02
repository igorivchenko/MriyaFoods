"use client";

import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchCartThunk, mergeGuestCartThunk } from "@/entities/cart";

interface CartInitializerProps {
  children: React.ReactNode;
}

export const CartInitializer = ({ children }: CartInitializerProps) => {
  const dispatch = useAppDispatch();
  const { user, loading: authLoading } = useAppSelector((state) => state.user);
  const { items: cartItems, isLoaded } = useAppSelector((state) => state.cart);

  // Track previous user ID to identify login/logout transitions
  const prevUserIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (authLoading) return;

    const currentUserId = user?.id;
    const prevUserId = prevUserIdRef.current;

    // Only load/sync if the user ID has actually changed (or on initial load)
    if (currentUserId === prevUserId && isLoaded) return;

    prevUserIdRef.current = currentUserId;

    if (!currentUserId) {
      // Guest user: Load guest cart from local storage
      dispatch(fetchCartThunk(null));
      return;
    }

    // User logged in: If we have items in the cart currently (guest cart), merge them
    if (cartItems.length > 0 && !prevUserId) {
      dispatch(mergeGuestCartThunk(currentUserId));
      return;
    }

    // Otherwise, just fetch the user's cart from Supabase
    dispatch(fetchCartThunk(currentUserId));
  }, [user, authLoading, isLoaded, cartItems.length, dispatch]);

  // Synchronize guest cart changes to localStorage
  useEffect(() => {
    if (!authLoading && !user && isLoaded) {
      localStorage.setItem("mriyafoods-cart:guest", JSON.stringify(cartItems));
    }
  }, [cartItems, user, authLoading, isLoaded]);

  return <>{children}</>;
};

CartInitializer.displayName = "CartInitializer";
export default CartInitializer;
