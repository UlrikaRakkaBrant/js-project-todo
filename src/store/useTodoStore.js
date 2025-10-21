import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'

// Task: { id, title, completed, createdAt }
export const useTodoStore = create(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title) => {
        const trimmed = title.trim()
        if (!trimmed) return
        const newTask = {
          id: nanoid(),
          title: trimmed,
          completed: false,
          createdAt: new Date().toISOString(),
        }
        set({ tasks: [newTask, ...get().tasks] })
      },

      toggleTask: (id) => set({
        tasks: get().tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      }),

      removeTask: (id) => set({ tasks: get().tasks.filter(t => t.id !== id) }),

      completeAll: () => set({ tasks: get().tasks.map(t => ({ ...t, completed: true })) }),

      clearCompleted: () => set({ tasks: get().tasks.filter(t => !t.completed) }),
    }),
    {
      name: 'zustand-todo-v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)
