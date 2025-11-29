export type KebabType = "article" | "comment" | "item";

export interface KebabMenuProps {
  type: KebabType;
  id: string;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
}

export interface DeleteModalProps {
  id: string;
  onClose: () => void;
}
