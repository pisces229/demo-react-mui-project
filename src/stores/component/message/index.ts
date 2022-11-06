import create from "zustand";
import { MessageComponentState } from "./state";

export const useMessageComponentStore = create<MessageComponentState>()(
  (set, get) => ({
    display: false,
    message: 'Message',
    open: (message: string) => set(() => ({ display: true, message: message })),
    close: () => set(() => ({ display: false, message: 'Message' })),
  })
);
