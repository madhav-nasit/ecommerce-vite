export interface User {
  id: number;
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
  _id: string;
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

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignUpReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetProductReq {
  categoryName?: string;
  limit?: number;
  skip?: number;
}

export interface CartRes {
  limit: number;
  skip: number;
  total: number;
  carts: Carts[];
}

export interface Carts {
  _id: string;
  products: {
    product: Product;
    quantity: number;
  }[];
  userId: number;
  totalAmount: number;
  totalDiscount: number;
  finalAmount: number;
}

export interface Order extends Carts {
  status:
    | 'ORDER_PLACED'
    | 'ORDER_PROCESSING'
    | 'ORDER_SHIPPED'
    | 'IN_TRANSIT'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'ORDER_COMPLETED'
    | 'CANCELLED';
}

export interface AddCart {
  productId: string;
  quantity: number;
}

export interface UpdateCartReq {
  merge: boolean;
  products: {
    id: number;
    quantity: number;
  }[];
}
