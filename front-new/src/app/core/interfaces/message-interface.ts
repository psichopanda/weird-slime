export interface MessageInterface {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secundary' | 'contrast';
  message: string;
  show_loading?: boolean;
}
