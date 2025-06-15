import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

export function connectStompSocket(): void {
  if (stompClient && stompClient.connected) {
    return;
  }

  stompClient = new Client({
    webSocketFactory: (): WebSocket => new SockJS('https://api.grabbzo.com/ws') as WebSocket,
    connectHeaders: {
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsIm5hbWUiOiIxMCIsInJvbGVzIjpbIlJFU1RBVVJBTlQiXSwidXNlcklkIjoxMCwiaWF0IjoxNzQ5NzU2MjI3LCJleHAiOjE3NjUzMDgyMjd9.Fbx37D4uyN4Pj49xEwU8UpfJ_Tx21xEl2VTWmUKxlVItDVYdoL6nmraAFJKoFkEb5OEgcbye0ex9zzMu6wxXkw`,
    },
    reconnectDelay: 5000,
    debug: (msg: string): void => {
      console.log('[STOMP]', msg);
    },
    onConnect: () => {
      console.log('🟢 Connected to STOMP');

      // Global order updates
      const orderUpdates: StompSubscription = stompClient!.subscribe('/topic/orders', (message: IMessage) => {
        console.log(message, '1');
      });

      // Order status updates
      const orderStatusUpdates: StompSubscription = stompClient!.subscribe('/topic/order-status', (message: IMessage) => {
        console.log(message, '2');
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
