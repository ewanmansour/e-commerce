import { create } from 'zustand';

export const useQuickViewStore = create((set) => ({
  isOpen: false,
  productId: null,
  openQuickView: (productId) => set({ isOpen: true, productId }),
  closeQuickView: () => set({ isOpen: false, productId: null }),
}));
``