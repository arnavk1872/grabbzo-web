// types.ts
export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

export interface OrderItem {
  id: number;
  menuItem: MenuItem;
  quantity: number;
  totalItemPrice: number;
}

export interface Order {
  id: number;
  createdAt: string;
  type: string;
  subtotal: number;
  total: number;
  platformFees: number;
  carModel?: string;
  carNumber?: string;
  tableNo?: string;
  orderNote?: string;
  orderItems: OrderItem[];
}
