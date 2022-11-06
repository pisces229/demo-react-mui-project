import create from "zustand";
import { App01P03Action } from "./state";

export const useApp01P03ActionStore = create<{
  back?: string;
  setBack: (value?: string) => void;
  action?: App01P03Action;
  setAction: (value?: App01P03Action) => void;
}>()(
  (set, get) => ({
    setBack: (value?: string) => set(() => ({ back: value })),
    setAction: (value?: App01P03Action) => set(() => ({ action: value })),
  })
);
