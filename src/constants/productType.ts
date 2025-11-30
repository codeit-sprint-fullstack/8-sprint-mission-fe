// export interface ProductType {
//   id: string;
//   name: string;
//   price: number;
//   images: string[];
//   favoriteCount: number;
// }

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  favoriteCount: number;
  userName: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
