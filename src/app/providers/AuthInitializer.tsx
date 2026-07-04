"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store";
import { supabase } from "@/shared/api/supabaseClient";
import { setUser, setLoading } from "@/entities/user";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setLoading(true));

    const cleanHash = () => {
      if (
        typeof window !== "undefined" &&
        window.location.hash.includes("access_token=")
      ) {
        router.replace(window.location.pathname + window.location.search);
      }
    };

    const initialTimer = setTimeout(cleanHash, 500);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setUser({ user: session.user, session }));
        cleanHash();
      } else {
        dispatch(setUser({ user: null, session: null }));
      }
      dispatch(setLoading(false));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        dispatch(setUser({ user: session.user, session }));
        if (event === "SIGNED_IN") {
          setTimeout(cleanHash, 100);
        }
      } else {
        dispatch(setUser({ user: null, session: null }));
      }
      dispatch(setLoading(false));
    });

    return () => {
      clearTimeout(initialTimer);
      subscription.unsubscribe();
    };
  }, [dispatch, router]);

  return <>{children}</>;
};

AuthInitializer.displayName = "AuthInitializer";
export default AuthInitializer;
