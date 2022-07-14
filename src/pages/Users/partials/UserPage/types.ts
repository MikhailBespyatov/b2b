export interface UserItemProps {
  title: string;
  value: string;
  onEdit: () => void;
  isLoading: boolean;
  isNotEdited?: boolean;
}
