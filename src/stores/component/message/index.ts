import create from "zustand";
import { MessageComponentState } from "./state";

export const useMessageComponentStore = create<MessageComponentState>()(
  (set, get) => ({
    display: false,
    message: '',
    severity: 'info',
    success: (message: string) => set(() => ({ display: true, message: message, severity: 'success' })),
    error: (message: string) => set(() => ({ display: true, message: message, severity: 'error' })),
    info: (message: string) => set(() => ({ display: true, message: message, severity: 'info' })),
    warning: (message: string) => set(() => ({ display: true, message: message, severity: 'warning' })),
    close: () => set(() => ({ display: false })),
  })
);
