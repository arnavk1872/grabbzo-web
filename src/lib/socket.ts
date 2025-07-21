// socket.ts
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  receive_message: (data: MessageData) => void;
  new_order: (order: OrderData) => void;
}

interface ClientToServerEvents {
  send_message: (data: MessageData) => void;
  acknowledge_order: (orderId: string) => void;
}

export interface MessageData {
  from: string;
  to: string;
  restaurantId: string;
  message: string;
  timestamp?: string;
}

export interface OrderData {
  orderId: string;
  items: string[];
  customerId: string;
  timestamp: string;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("ws://api.grabbzo.com/ws", {
  query: {
    userId: "RESTAURANT_ID", 
    role: "restaurant",
  },
  transports: ["websocket"],
  autoConnect: false, 
});

export default socket;
