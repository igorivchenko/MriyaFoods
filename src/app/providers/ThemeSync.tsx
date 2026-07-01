"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/app/store";

export const ThemeSync = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
};

ThemeSync.displayName = "ThemeSync";
export default ThemeSync;
