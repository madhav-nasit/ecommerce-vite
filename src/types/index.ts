export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
  token?: string;
}

export interface ProductRes {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Cart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

export interface GetProductReq {
  categoryName?: string;
  limit?: number;
  skip?: number;
}
