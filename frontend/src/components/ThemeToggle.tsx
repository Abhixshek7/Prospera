import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initialTheme =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    setTheme(initialTheme);

    const root = window.document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    const root = window.document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", nextTheme);
  };

  if (theme === null) {
    return <div className="w-9 h-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full hover:bg-muted/50 transition-all duration-200 relative overflow-hidden"
      onClick={toggleTheme}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-amber-500 transition-all duration-500 rotate-0 scale-100" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-400 transition-all duration-500 rotate-0 scale-100" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
