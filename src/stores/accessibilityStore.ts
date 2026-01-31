import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ContrastMode, FontSize } from '../types';

interface AccessibilityState {
  contrastMode: ContrastMode;
  fontSize: FontSize;
  setContrastMode: (mode: ContrastMode) => void;
  setFontSize: (size: FontSize) => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      contrastMode: 'normal',
      fontSize: 'normal',

      setContrastMode: (mode) => {
        set({ contrastMode: mode });
        const html = document.documentElement;
        html.classList.remove('dark', 'high-contrast');
        if (mode !== 'normal') {
          html.classList.add(mode);
        }
      },

      setFontSize: (size) => {
        set({ fontSize: size });
        const html = document.documentElement;
        html.classList.remove('font-large', 'font-x-large');
        if (size !== 'normal') {
          html.classList.add(`font-${size}`);
        }
      },
    }),
    {
      name: 'accessibility-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const html = document.documentElement;
          if (state.contrastMode !== 'normal') {
            html.classList.add(state.contrastMode);
          }
          if (state.fontSize !== 'normal') {
            html.classList.add(`font-${state.fontSize}`);
          }
        }
      },
    }
  )
);
