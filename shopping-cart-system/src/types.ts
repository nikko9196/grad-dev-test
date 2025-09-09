export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Cart {
  productId: number;
  quantity: number;
}
