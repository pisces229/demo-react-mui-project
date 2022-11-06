import create from "zustand";
import { App01P02Action, App01P02ActionEditState } from "./state";

export const useApp01P02ActionStore = create<{
  back?: string;
  setBack: (value?: string) => void;
  action?: App01P02Action;
  setAction: (value?: App01P02Action) => void;
  editState?: App01P02ActionEditState;
  setEditState: (state?: App01P02ActionEditState) => void;
}>()(
  (set, get) => ({
    setBack: (value?: string) => set(() => ({ back: value })),
    setAction: (value?: App01P02Action) => set(() => ({ action: value })),
    setEditState: (state?: App01P02ActionEditState) => set(() => ({ editState: state })),
  })
);
