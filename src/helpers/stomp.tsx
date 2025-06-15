import { useEffect } from 'react';
import { connectStompSocket , disconnectStompSocket } from '../lib/stomp';

export default function stompConnection() {
  useEffect(() => {
    connectStompSocket();

    return () => {
      disconnectStompSocket();
    };
  }, []);

  return <div></div>;
}
