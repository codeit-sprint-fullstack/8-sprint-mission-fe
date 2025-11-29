export interface ItemTagProps {
  tags: string | number | Array<string | number> | null;
  removable?: boolean;
  onRemove?: (tag: string) => void;
}
