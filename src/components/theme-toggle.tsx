"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      id="theme-toggle-btn"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 text-[#8b949e] hover:text-white hover:bg-[#161b22] relative transition-colors"
      title="Toggle theme (Light / Dark)"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#e3b341]" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#58a6ff]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
