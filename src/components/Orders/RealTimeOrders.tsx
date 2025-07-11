"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrderStore } from "@/store/OrderStore";
import { getOrders } from "@/helpers/api-utils";
import { useGlobalAudio } from "@/helpers/useGlobalAudio";
import OrderTable from "./OrderTable";
import NoNewOrders from "./NoNewOrders";
import NoPreparingOrders from "./NoPreparingOrders";
import NoReadyOrders from "./NoReadyOrders";
import NoPickedOrders from "./NoPickedOrders";

interface OrdersResponse {
  orders: {
    content: any[];
    pageable: {
      sort: any;
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: any;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
  page: number;
  "Total Pages": number;
  size: number;
}

interface RealTimeOrdersProps {
  orderType: string;
  initialData?: OrdersResponse;
  initialPage?: number;
}

const RealTimeOrders: React.FC<RealTimeOrdersProps> = ({ 
  orderType, 
  initialData,
  initialPage = 0 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { newOrders, addNewOrder, removeOrder, updateOrderStatus } = useOrderStore();
  const [orderData, setOrderData] = useState<OrdersResponse | null>(initialData || null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [stompOrders, setStompOrders] = useState<any[]>([]);
  const [notificationAudio, setNotificationAudio] = useState<HTMLAudioElement | null>(null);
  const [pendingNotification, setPendingNotification] = useState(false);
  const { audioUnlocked } = useGlobalAudio();
  const pageSize = 10;

  // Use refs to store the latest store functions
  const addNewOrderRef = useRef(addNewOrder);
  const removeOrderRef = useRef(removeOrder);
  const updateOrderStatusRef = useRef(updateOrderStatus);
  const stopNotificationSoundRef = useRef<() => void>();

  // Update refs when store functions change
  useEffect(() => {
    addNewOrderRef.current = addNewOrder;
    removeOrderRef.current = removeOrder;
    updateOrderStatusRef.current = updateOrderStatus;
  }, [addNewOrder, removeOrder, updateOrderStatus]);

  // Unlock audio on any user interaction
  useEffect(() => {
    let isUnlocking = false;
    
    const unlockAudio = async () => {
      if (audioUnlocked || isUnlocking) return;
      isUnlocking = true;
      
      try {
        // Create a very short audio to unlock the audio context
        const audio = new Audio();
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYI';
        
        // Set volume to nearly silent but not zero (some browsers require actual audio)
        audio.volume = 0.01;
        
        // Play and immediately pause to unlock
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          audio.pause();
        }
      
        
        // Remove all event listeners after successful unlock
        unlockEvents.forEach(event => {
          document.removeEventListener(event, handleUserInteraction, true);
        });
        
      } catch (error) {
        console.log('Audio unlock attempt failed:', error);
        isUnlocking = false;
      }
    };

    // List of events that can unlock audio
    const unlockEvents = ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'keydown', 'keyup'];
    
    const handleUserInteraction = (e: Event) => {
      unlockAudio();
    };

    // Add listeners for user interaction if not already unlocked
    if (!audioUnlocked) {
      unlockEvents.forEach(event => {
        document.addEventListener(event, handleUserInteraction, { capture: true, once: false });
      });
    }

    return () => {
      // Cleanup listeners
      unlockEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction, true);
      });
    };
  }, [audioUnlocked]);

  // Initialize API orders on component mount
  useEffect(() => {
    if (!initialData) {
      fetchOrders(initialPage);
    }
  }, []);

  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const response = await getOrders(orderType, page, pageSize);
      setOrderData(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter STOMP orders based on orderType
  useEffect(() => {
    if (orderType === "NEW") {
      setStompOrders(newOrders.filter(order => order.status === "NEW"));
    } else {
      setStompOrders(newOrders.filter(order => order.status === orderType));
    }
  }, [newOrders, orderType]);

  // Combine API orders and STOMP orders
  const allOrders = React.useMemo(() => {
    const apiOrders = orderData?.orders?.content || [];
    // Filter STOMP orders to avoid duplicates with API orders
    const uniqueStompOrders = stompOrders.filter(stompOrder => 
      !apiOrders.some(apiOrder => apiOrder.id === stompOrder.id)
    );
    return [...uniqueStompOrders, ...apiOrders];
  }, [orderData, stompOrders]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 0) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    
    // Determine the correct URL based on order type
    let baseUrl = "/dashboard/orders";
    if (orderType === "PREPARING") {
      baseUrl = "/dashboard/orders/preparing";
    } else if (orderType === "READY") {
      baseUrl = "/dashboard/orders/ready";
    } else if (orderType === "COMPLETED") {
      baseUrl = "/dashboard/orders/pickedup";
    }
    
    router.push(`${baseUrl}${newUrl}`);
  };

  // Fetch orders when page changes (but not on initial load)
  useEffect(() => {
    if (currentPage !== initialPage) {
      fetchOrders(currentPage);
    }
  }, [currentPage, initialPage, orderType]);

  // Function to play notification sound on loop
  const playNotificationSound = () => {

    if (!audioUnlocked) {
      console.log('Audio not unlocked yet, setting pending notification');
      setPendingNotification(true);
      return;
    }

    // Clear pending notification since we're about to play
    setPendingNotification(false);

    try {
      // Stop any currently playing notification
      if (notificationAudio) {
        notificationAudio.pause();
        notificationAudio.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio('/new_order.mp3');
      audio.loop = true;
      audio.volume = 0.7;
    
      
      // Play the audio
      audio.play().then(() => {
        setNotificationAudio(audio);
      }).catch(error => {
        console.log('Could not play notification sound:', error);
        // If audio fails, try to unlock again on next interaction

      });
      
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Play pending notification when audio gets unlocked
  useEffect(() => {
    if (audioUnlocked && pendingNotification && orderType === "NEW") {
      console.log('Audio unlocked, playing pending notification');
      playNotificationSound();
    }
  }, [audioUnlocked, pendingNotification, orderType]);

  // Function to stop notification sound
  const stopNotificationSound = () => {
    console.log('Stopping notification sound...', notificationAudio);
    if (notificationAudio) {
      notificationAudio.pause();
      notificationAudio.currentTime = 0;
      setNotificationAudio(null);
    }
    setPendingNotification(false); // Also clear any pending notifications
  };

  // Update the stop function ref whenever the function changes
  useEffect(() => {
    stopNotificationSoundRef.current = stopNotificationSound;
  }, [notificationAudio, pendingNotification]);

  // Listen for new orders from stomp connection
  useEffect(() => {
    const handleNewOrder = (event: any) => {
      const orderData = event.detail;
      console.log('Received new order:', orderData);
      
      // Format the order data to match expected structure
      const formattedOrder = {
        id: orderData.id || orderData.orderId,
        createdAt: orderData.createdAt || new Date().toISOString(),
        customerName: orderData.customerName || orderData.customer?.name || "Unknown",
        customerArrivingTime: orderData.customerArrivingTime || orderData.arrivalTime,
        total: orderData.order.total || "null",
        status: orderData.status || "NEW",
        type: orderData?.order?.type 
      };
      
      addNewOrderRef.current(formattedOrder);
      
      // Play notification sound only for NEW orders page and when it's actually a new order
      if (orderType === "NEW" && formattedOrder.status === "NEW") {
        playNotificationSound();
      }
    };

    const handleStatusUpdate = (event: any) => {
      const statusData = event.detail;
      console.log('Received status update:', statusData);
      
      if (statusData.orderId && statusData.status) {
        updateOrderStatusRef.current(statusData.orderId, statusData.status);
        
        // If order status changed from NEW, remove it from new orders and stop notification
        if (statusData.status !== "NEW") {
          removeOrderRef.current(statusData.orderId);
          if (stopNotificationSoundRef.current) {
            stopNotificationSoundRef.current();
          }
        }
      }
    };

    window.addEventListener('newOrder', handleNewOrder);
    window.addEventListener('orderStatusUpdate', handleStatusUpdate);

    return () => {
      window.removeEventListener('newOrder', handleNewOrder);
      window.removeEventListener('orderStatusUpdate', handleStatusUpdate);
    };
  }, [orderType]);

  // Cleanup notification sound when component unmounts or order type changes
  useEffect(() => {
    return () => {
      if (stopNotificationSoundRef.current) {
        stopNotificationSoundRef.current();
      }
    };
  }, [orderType]);

  // Also cleanup on unmount
  useEffect(() => {
    return () => {
      if (notificationAudio) {
        notificationAudio.pause();
        notificationAudio.currentTime = 0;
        setNotificationAudio(null);
      }
    };
  }, [notificationAudio]);

  // Function to render appropriate "no orders" component based on orderType
  const renderNoOrdersComponent = () => {
    switch (orderType) {
      case "PREPARING":
        return <NoPreparingOrders />;
      case "READY":
        return <NoReadyOrders />;
      case "COMPLETED":
        return <NoPickedOrders />;
      default:
        return <NoNewOrders />;
    }
  };

  const renderPaginationButtons = () => {
    if (!orderData?.orders || !orderData.orders.totalPages || orderData.orders.totalPages <= 1) {
      return null;
    }

    const { totalPages } = orderData.orders;
    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0 || loading}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Previous
      </button>
    );

    // Page numbers
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {i + 1}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1 || loading}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Next
      </button>
    );

    return buttons;
  };

  const hasOrders = allOrders && allOrders.length > 0;

  return (
    <div className="w-full">
      {!hasOrders ? (
        renderNoOrdersComponent()
      ) : (
        <>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10">
                <div className="text-lg">Loading...</div>
              </div>
            )}
            <OrderTable orderDetails={allOrders} />
          </div>
          
          {/* Pagination Controls */}
          {orderData?.orders?.totalPages && orderData.orders.totalPages > 1 && orderData.orders.numberOfElements && (
            <div className="flex justify-center items-center mt-4 mb-6 font-poppins">
              <div className="flex items-center space-x-2">
                {renderPaginationButtons()}
              </div>
              <div className="ml-4 text-sm text-gray-600">
                Showing {orderData.orders.numberOfElements} of {orderData.orders.totalElements} orders
                {stompOrders.length > 0 && ` (+ ${stompOrders.length} real-time)`}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RealTimeOrders; 