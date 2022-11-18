import create from "zustand";
import { ProgressComponentState } from "./state";

export const useProgressComponentStore = create<ProgressComponentState>()(
  (set, get) => ({
    count: 0,
    display: false,
    message: 'Progress',
    open: () => set((state) => ({ count: (state.count + 1), display: true })),
    close: () => set((state) => ({ count: (state.count - 1), display: ((state.count - 1) > 0) })),
  })
);
