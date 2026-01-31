import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

interface FavoritesState {
  items: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addToFavorites: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state;
          }
          return {
            items: [...state.items, product],
          };
        });
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleFavorite: (product) => {
        const isFav = get().isFavorite(product.id);
        if (isFav) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
