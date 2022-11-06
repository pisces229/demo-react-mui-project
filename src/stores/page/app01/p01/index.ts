import create from "zustand";
import { App01P01Action, App01P01ActionQueryState } from "./state";

export const useApp01P01ActionStore = create<{
  back?: string;
  setBack: (value?: string) => void;
  action?: App01P01Action;
  setAction: (value?: App01P01Action) => void;
  queryState?: App01P01ActionQueryState;
  setQueryState: (state?: App01P01ActionQueryState) => void;
}>()(
  (set, get) => ({
    setBack: (value?: string) => set(() => ({ back: value })),
    setAction: (value?: App01P01Action) => set(() => ({ action: value })),
    setQueryState: (state?: App01P01ActionQueryState) => set(() => ({ queryState: state })),
  })
);
