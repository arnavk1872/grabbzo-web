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
        console.log(message, '1', message.body);  
        try {
          const orderData = JSON.parse(message.body);
          console.log('Parsed order data:', orderData);
          
          // Add to order store if it's a new order
          if (orderData.status === 'NEW') {
            // Get the store instance - this needs to be done in a component/hook context
            // For now we'll dispatch a custom event that components can listen to
            window.dispatchEvent(new CustomEvent('newOrder', { detail: orderData }));
          }
        } catch (error) {
          console.error('Error parsing order data:', error);
        }
      });

      // Order status updates
      const orderStatusUpdates: StompSubscription = stompClient!.subscribe('/topic/order-status', (message: IMessage) => {
        console.log(message, '2', message.body);
        try {
          const statusData = JSON.parse(message.body);
          console.log('Parsed status data:', statusData);
          
          // Dispatch status update event
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
