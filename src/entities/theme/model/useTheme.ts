import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleTheme as toggleThemeAction } from "./themeSlice";
import { flushSync } from "react-dom";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const handleToggleTheme = () => {
    // Fallback if View Transitions API is unsupported or user prefers reduced motion
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      dispatch(toggleThemeAction());
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        dispatch(toggleThemeAction());
      });
    });
  };

  const isDark = theme === "dark";

  return {
    theme,
    isDark,
    toggleTheme: handleToggleTheme,
  };
};
