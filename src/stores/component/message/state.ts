export interface MessageComponentState {
  display: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  close: () => void;
}
