import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useThemeStore = create(
  devtools(
    persist(
      (set) => ({
        theme: "lightTheme",
        toggleTheme: (payload: string) => set({ theme: payload }),
      }),
      { name: "theme" }
    ),
    { name: "themeStore" }
  )
);
