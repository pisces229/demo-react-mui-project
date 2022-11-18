import create from "zustand";

interface Store {
  display: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  close: () => void;
}

export const useMessageComponentStore = create<Store>()(
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
