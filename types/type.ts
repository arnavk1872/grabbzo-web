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
  carDelivery?: boolean;
  carModel?: string;
  carNumber?: string;
  carColor?: string;
  tableNo?: string;
  orderNote?: string;
  orderItems: OrderItem[];
  deliveryCharge?: number;
  driverTip?: number;
  serviceFee?: number;
  gst?: number;
  otp?: string;
}
