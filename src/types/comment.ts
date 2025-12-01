export interface Comment {
  id: string;
  content: string;
  owner: {
    id?: string;
    nickname?: string;
  };
  createdAt: string;
  updatedAt: string;
}
