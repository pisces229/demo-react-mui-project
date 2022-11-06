export interface ProgressComponentState {
  display: boolean;
  message: string;
  open: (message?: string) => void;
  close: () => void;
}
