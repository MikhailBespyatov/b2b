export interface INotification {
  id: string;
  badge: 'positive' | 'negative' | 'attention';
  title: string;
  text: string;
  show?: boolean;
  autoCloseDelay?: number;
  isEnabledOutsideClick?: boolean;
}
