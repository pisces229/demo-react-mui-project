import create from "zustand";
import { ProgressComponentState } from "./state";

export const useProgressComponentStore = create<ProgressComponentState>()(
  (set, get) => ({
    display: false,
    message: 'Progress',
    open: (message = 'Progress') => set(() => ({ display: true, message: message })),
    close: () => set(() => ({ display: false, message: 'Progress' })),
  })
);
