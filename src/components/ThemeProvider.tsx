import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // Apply theme class to <html> tag
      defaultTheme="system" // Default to system preference
      enableSystem // Enable system preference detection
      disableTransitionOnChange // Optional: Prevent transitions on theme change
      {...props} // Allow overriding props
    >
      {children}
    </NextThemesProvider>
  );
}
