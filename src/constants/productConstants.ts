export interface ProductType {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

export interface ProductRequest {
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

export interface ProductResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  description: string;
  userName: string;
  tags: string[];
  images: string[];
  favoriteCount: number;
  userId: string | null;
}