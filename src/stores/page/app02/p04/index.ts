import create from "zustand";
import { App02P04Action } from "./state";

interface Store {
  back: string;
  setBack: (value?: string) => void;
  action: App02P04Action;
  setAction: (value?: App02P04Action) => void;
}

export const useApp02P04ActionStore = create<Store>()(
  (set, get) => ({
    back: '',
    setBack: (value: string = '') => set(() => ({ back: value })),
    action: App02P04Action.Empty,
    setAction: (value: App02P04Action = App02P04Action.Empty) => set(() => ({ action: value })),
  })
);
