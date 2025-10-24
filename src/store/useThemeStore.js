// src/store/useThemeStore.js
import { create } from 'zustand'

// Simple UI-only global store for theme preference
export const useThemeStore = create((set) => ({
  theme: 'light', // only 'light' | 'dark'
  setTheme: (theme) => {
    set({ theme })
    // Save preference
    localStorage.setItem('theme-preference', theme)
    // Apply immediately
    document.documentElement.dataset.theme = theme
  },
}))

// 🧠 Restore saved preference on page load
const saved = localStorage.getItem('theme-preference')
if (saved) {
  document.documentElement.dataset.theme = saved
}
