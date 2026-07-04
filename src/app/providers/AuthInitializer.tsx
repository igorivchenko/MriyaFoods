"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/app/store";
import { supabase } from "@/shared/api/supabaseClient";
import { setUser, setLoading } from "@/entities/user";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    // Clear hash containing auth tokens from URL bar for clean UX and security
    if (
      typeof window !== "undefined" &&
      window.location.hash.includes("access_token=")
    ) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setUser({ user: session.user, session }));
      } else {
        dispatch(setUser({ user: null, session: null }));
      }
      dispatch(setLoading(false));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setUser({ user: session.user, session }));
      } else {
        dispatch(setUser({ user: null, session: null }));
      }
      dispatch(setLoading(false));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};

AuthInitializer.displayName = "AuthInitializer";
export default AuthInitializer;
