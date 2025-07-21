import { create } from "zustand";

interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerArrivingTime: string;
  total: string;
  status: string;
  type: string;
  // Add other order properties as needed
}

interface OrderState {
  newOrders: Order[];
  addNewOrder: (order: Order) => void;
  removeOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, newStatus: string) => void;
  clearNewOrders: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  newOrders: [],
  addNewOrder: (order) =>
    set((state) => ({
      newOrders: [order, ...state.newOrders],
    })),
  removeOrder: (orderId) =>
    set((state) => ({
      newOrders: state.newOrders.filter((order) => order.id !== orderId),
    })),
  updateOrderStatus: (orderId, newStatus) =>
    set((state) => ({
      newOrders: state.newOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ),
    })),
  clearNewOrders: () => set({ newOrders: [] }),
})); 