import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInterfaceStore = create(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({
        language: state.language === 'en' ? 'ar' : 'en',
      })),
    }),
    {
      name: 'forever-interface',
    },
  ),
);
