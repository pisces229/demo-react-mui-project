import create from "zustand";
import { persist } from 'zustand/middleware'

interface Store {
  token: string;
  setToken: (value: string) => void;
}

export const useAuthStore = create<Store>()(
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
