import { create } from 'zustand'

// Simple UI-only global store for theme preference
export const useThemeStore = create((set) => ({
  theme: 'auto', // 'light' | 'dark' | 'auto'
  setTheme: (theme) => {
    set({ theme })
    // Save preference
    localStorage.setItem('theme-preference', theme)
    // Apply immediately
    document.documentElement.dataset.theme = theme
  },
}))
