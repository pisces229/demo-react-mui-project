import create from "zustand";
import { persist } from 'zustand/middleware'

interface StoreState {
  token: string;
  setToken: (value: string) => void;
}

export const useAuthStore = create<StoreState>()(
  persist(
    (set, get) => ({
      token: '',
      setToken: (value: string) => set(() => ({ token: value })),
    }),
    {
      name: 'AuthStore',
      getStorage: () => localStorage,
    }
  )
);
