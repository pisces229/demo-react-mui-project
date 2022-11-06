import create from "zustand";
import { App02P04Action } from "./state";

export const useApp02P04ActionStore = create<{
  back?: string;
  setBack: (value?: string) => void;
  action?: App02P04Action;
  setAction: (value?: App02P04Action) => void;
}>()(
  (set, get) => ({
    setBack: (value?: string) => set(() => ({ back: value })),
    setAction: (value?: App02P04Action) => set(() => ({ action: value })),
  })
);
