import create from "zustand";
import {
  App01P01Action,
  App01P01ActionQueryState,
  initApp01P01ActionQueryState
} from "./state";

interface Store {
  back: string;
  setBack: (value?: string) => void;
  action: App01P01Action;
  setAction: (value?: App01P01Action) => void;
  queryState: App01P01ActionQueryState;
  setQueryState: (state?: App01P01ActionQueryState) => void;
}

export const useApp01P01ActionStore = create<Store>()(
  (set, get) => ({
    back: '',
    setBack: (value: string = '') => set(() => ({ back: value })),
    action:  App01P01Action.Empty,
    setAction: (value: App01P01Action = App01P01Action.Empty) => set(() => ({ action: value })),
    queryState: initApp01P01ActionQueryState,
    setQueryState: (state: App01P01ActionQueryState = initApp01P01ActionQueryState) => set(() => ({ queryState: state })),
  })
);
