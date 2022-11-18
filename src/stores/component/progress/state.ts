export interface ProgressComponentState {
  count: number;
  display: boolean;
  message: string;
  open: () => void;
  close: () => void;
}
