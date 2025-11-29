import { Article } from "@/types/entities";

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

export interface DropDownOption {
  label: string;
  value: string;
}

export interface DropDownProps {
  options: DropDownOption[];
  selected?: DropDownOption;
  onSelect: (option: DropDownOption) => void;
}

export interface SearchBarProps {
  search: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export interface Controls {
  search?: boolean;
  orderBy?: boolean;
}

export interface ControllerProps {
  controls?: Controls;
  articles: Article[];
  setSortedArticles: (articles: Article[]) => void;
}
