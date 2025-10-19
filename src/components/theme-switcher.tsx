"use client"

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button"

const ThemeSwitcher = () => {
  // We need to wait for the component to mount to read from localStorage
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // Set the theme on the document element whenever the theme state changes
  useEffect(() => {
    if (theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  // Don't render until the theme is determined to avoid hydration mismatch
  if (theme === null) {
      return <div className="h-9 w-9" />; // Return a placeholder to prevent layout shift
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
