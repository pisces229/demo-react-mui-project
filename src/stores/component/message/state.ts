export interface MessageComponentState {
  display: boolean;
  message: string;
  open: (message: string) => void;
  close: () => void;
}
