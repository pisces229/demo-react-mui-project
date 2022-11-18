import create from "zustand";
import { Action, StoreState } from "./state";

interface Store {
  back?: string;
  setBack: (value?: string) => void;
  action?: Action;
  setAction: (value?: Action) => void;
  state?: StoreState;
  setState: (state?: StoreState) => void;
}

export const useActionStore = create<Store>()(
  (set, get) => ({
    setBack: (value?: string) => set(() => ({ back: value })),
    setAction: (value?: Action) => set(() => ({ action: value })),
    setState: (value?: StoreState) => set(() => ({ state: value })),
  })
);
