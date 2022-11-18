import create from "zustand";

interface Store {
  count: number;
  display: boolean;
  message: string;
  open: () => void;
  close: () => void;
}

export const useProgressComponentStore = create<Store>()(
  (set, get) => ({
    count: 0,
    display: false,
    message: 'Progress',
    open: () => set((state) => ({ count: (state.count + 1), display: true })),
    close: () => set((state) => ({ count: (state.count - 1), display: ((state.count - 1) > 0) })),
  })
);
