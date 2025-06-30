"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../UI/Button";
import { MoveLeftIcon } from "lucide-react";
import { changeOrderStatus } from "@/helpers/api-utils";
import { acceptOrder,rejectOrder } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../AlertDialog";


interface OrderDetailsProps {
  orderDetails: any;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  preparationMinutes: number;
  setPreparationMinutes: (minutes: number) => void;
  tableNo: string;
  setTableNo: (table: string) => void;
  viewButton: "accept" | "preparing" | "ready" | "completed";
  setViewButton: (view: "accept" | "preparing" | "ready" | "completed") => void;
  showRejectDialog: boolean;
  setShowRejectDialog: (show: boolean) => void;
}

const OrderDetails = ({ 
  orderDetails, 
  rejectionReason, 
  setRejectionReason, 
  preparationMinutes, 
  setPreparationMinutes, 
  tableNo, 
  setTableNo, 
  viewButton, 
  setViewButton,
  showRejectDialog,
  setShowRejectDialog
}: OrderDetailsProps) => {
  const { slug } = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const buttonConfig = {
    accept: {
      status: "NEW",
      buttons: [
        {
          text: "Reject",
          className: "bg-red-600 hover:bg-red-700",
          disabled: false,
          onClick: () => {
            setShowRejectDialog(true);
          },
        },
        {
          text: "Accept",
          className: "bg-green-600 hover:bg-green-800",
          disabled: false,
          onClick: async () => {
            try {
              // Handle time string directly to avoid timezone issues
              const originalTimeString = orderDetails.customerArrivingTime;
              
              // Parse the time string and add minutes manually to avoid timezone conversion
              const timeRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
              const match = originalTimeString.match(timeRegex);
              
              if (!match) {
                throw new Error("Invalid time format");
              }
              
              const [, year, month, day, hours, minutes, seconds] = match;
              
              // Create date object and add preparation minutes
              const originalDate = new Date(
                parseInt(year),
                parseInt(month) - 1, // Month is 0-indexed
                parseInt(day),
                parseInt(hours),
                parseInt(minutes),
                parseInt(seconds)
              );
              
              const newDate = new Date(originalDate.getTime() + preparationMinutes * 60 * 1000);
              
              // Format back to the same format: YYYY-MM-DDTHH:mm:ss
              const formattedTime = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}T${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}:${String(newDate.getSeconds()).padStart(2, '0')}`;
              
              const payload = {
                orderId: parseInt(String(slug)),
                customerArrivingTime: formattedTime,
                tableNo: tableNo ? parseInt(tableNo) : null
              };
              const response = await acceptOrder(payload);
              if (response && response.status === 200) {
                enqueueSnackbar(`Order #${slug} has been accepted and is now being prepared`, { 
                  variant: "success",
                  autoHideDuration: 3000 
                });
                setViewButton("preparing");
              }
            } catch (error) {
              console.error("Error accepting order:", error);
              enqueueSnackbar("Failed to accept order. Please try again.", { 
                variant: "error",
                autoHideDuration: 3000 
              });
            }
          },
        },
      ],
    },
    preparing: {
      status: "PREPARING",
      buttons: [
        {
          text: "Ready",
          className: "bg-green-600 hover:bg-green-800",
          disabled: false,
          onClick: async () => {
            try {
              await changeOrderStatus("READY", slug);
              enqueueSnackbar(`Order #${slug} is now ready for pickup`, { 
                variant: "success",
                autoHideDuration: 3000 
              });
              setViewButton("ready");
            } catch (error) {
              console.error("Error marking order as ready:", error);
              enqueueSnackbar("Failed to mark order as ready. Please try again.", { 
                variant: "error",
                autoHideDuration: 3000 
              });
            }
          },
        },
      ],
    },
    ready: {
      status: "READY",
      buttons: [
        {
          text: "Picked Up",
          className: "bg-yellow-600 hover:bg-yellow-700",
          disabled: false,
          onClick: async () => {
            try {
              await changeOrderStatus("COMPLETED", slug);
              enqueueSnackbar(`Order #${slug} has been completed successfully`, { 
                variant: "success",
                autoHideDuration: 3000 
              });
              setViewButton("completed");
            } catch (error) {
              console.error("Error completing order:", error);
              enqueueSnackbar("Failed to complete order. Please try again.", { 
                variant: "error",
                autoHideDuration: 3000 
              });
            }
          },
        },
      ],
    },
    completed: {
      status: "COMPLETED",
      buttons: [
        {
          text: "Completed",
          className: "bg-green-800 hover:bg-green-900",
          disabled: false,
          onClick: () => {},
        },
      ],
    },
  };

  return (
    <div className="w-full px-8">
      <section className="flex justify-between items-center w-full">
        <div className="flex items-center gap-x-4">
          <MoveLeftIcon
            className="cursor-pointer text-blue-700"
            size={42}
            onClick={() => router.back()} 
          />
          <h1 className="font-poppins text-[38px] font-semibold text-[#1663DE]">
            ORDER ID #{slug}
          </h1>
        </div>

        <div className="px-12 flex gap-x-4">
          {buttonConfig[viewButton].buttons.map(({ text, className, onClick, disabled }) => (
            <Button
              key={text}
              variant="secondary"
              onClick={onClick}
              disabled={disabled}
              className={`${className} text-[18px] px-10 py-6 text-white`}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>

      {/* Rejection Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent className="font-poppins">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Order #{slug}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <label htmlFor="rejectionReason" className="block font-poppins font-semibold text-sm font-medium text-gray-700 mb-2">
              Rejection Reason (Required)
            </label>
            <input
              id="rejectionReason"
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setRejectionReason("");
              setShowRejectDialog(false);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={`bg-red-600 text-white hover:bg-red-700 ${!rejectionReason.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!rejectionReason.trim()}
              onClick={async () => {
                if (!rejectionReason.trim()) return;
                
                try {
                  const response = await rejectOrder(String(slug), rejectionReason);
                  if (response && response.status === 200) {
                    enqueueSnackbar(`Order #${slug} has been rejected successfully`, { 
                      variant: "error",
                      autoHideDuration: 3000 
                    });
                    setShowRejectDialog(false);
                    setRejectionReason("");
                    router.push("/dashboard/orders");
                  }
                } catch (error) {
                  console.error("Error rejecting order:", error);
                  enqueueSnackbar("Failed to reject order. Please try again.", { 
                    variant: "error",
                    autoHideDuration: 3000 
                  });
                }
              }}
            >
              Reject Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      

    </div>
  );
};

export default OrderDetails;
