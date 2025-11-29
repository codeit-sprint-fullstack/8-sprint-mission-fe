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

export interface LikeButtonProps {
  type: "article" | "product";
  targetId: string | number;
  initialCount?: number;
  addMethod?: (id: string | number) => Promise<void>;
  removeMethod?: (id: string | number) => Promise<void>;
}

export interface PageButtonProps {
  nowPage?: number;
  buttonLength?: number;
  pageSize?: number;
  totalCount?: number;
  onChange?: (page: number) => void;
}

export interface RegistrationControllerProps {
  onClick: () => void;
  mode?: "create" | "edit";
  disabled?: boolean;
}

// 폼 초기값 타입 정의
interface ProductFormInitialData {
  img?: string;
  title?: string;
  description?: string;
  price?: string;
  tags?: string[];
}

// onSubmit에 전달할 데이터 타입
interface SubmitPayload {
  title: string;
  description: string;
  price: string;
}

export interface ProductFormProps {
  initialData?: ProductFormInitialData;
  onSubmit: (data: SubmitPayload) => void | Promise<void>;
  mode?: "create" | "edit";
}
