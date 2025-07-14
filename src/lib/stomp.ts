import { getRestaurantId, getToken } from '@/helpers/api-utils';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useOrderStore } from '@/store/OrderStore';

let stompClient: Client | null = null;

export async function connectStompSocket(): Promise<void> {
  if (stompClient && stompClient.connected) {
    return;
  }
  const token = getToken();
  const restaurantId = await getRestaurantId();
  console.log(restaurantId,"RES ID");
  

  stompClient = new Client({
    webSocketFactory: (): WebSocket => new SockJS('https://api.grabbzo.com/ws') as WebSocket,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    debug: (msg: string): void => {
      console.log('[STOMP]', msg);
    },
    onConnect: () => {
      console.log('🟢 Connected to STOMP');

      // Global order updates
      const orderUpdates: StompSubscription = stompClient!.subscribe(`/topic/orders/${restaurantId}`, (message: IMessage) => {

        try {
          const orderData = JSON.parse(message.body);

          if (orderData.status === 'NEW') {

            window.dispatchEvent(new CustomEvent('newOrder', { detail: orderData }));
          }
        } catch (error) {
          console.error('Error parsing order data:', error);
        }
      });

      // Order status updates
      const orderStatusUpdates: StompSubscription = stompClient!.subscribe('/topic/order-status', (message: IMessage) => {
        try {
          const statusData = JSON.parse(message.body);
    
          window.dispatchEvent(new CustomEvent('orderStatusUpdate', { detail: statusData }));
        } catch (error) {
          console.error('Error parsing status data:', error);
        }
      });

      // Optional: handle order-specific subscriptions with orderId here
    },
    onStompError: (frame) => {
      console.error('🔴 STOMP error:', frame.headers['message']);
      console.error('Details:', frame.body);
    },
  });

  stompClient.activate();
}

export function disconnectStompSocket(): void {
  if (stompClient) {
    stompClient.deactivate();
    console.log('🔌 STOMP client disconnected');
  }
}
