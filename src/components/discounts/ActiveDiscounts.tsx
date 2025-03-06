"use client";
import React, { useState } from "react";
import { Button } from "../UI/Button";
import { deleteDiscount, updateDiscountStatus } from "@/helpers/api-utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import { useSnackbar } from "notistack";

interface Offer {
  id: number;
  couponCode: string;
  percentage: number;
  applicableFor: string;
  maxCap: string;
  minOrderValue: string;
  is_active: boolean;
}

interface ActiveDiscountsProps {
  allDiscounts: Offer[];
}

const ActiveDiscounts: React.FC<ActiveDiscountsProps> = ({ allDiscounts }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Local state to manage discounts dynamically
  const [discounts, setDiscounts] = useState<Offer[]>(allDiscounts);

  const [discountStatuses, setDiscountStatuses] = useState<Record<number, boolean>>(
    allDiscounts.reduce((acc, discount) => {
      acc[discount.id] = discount.is_active;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const deleteClick = async (discountId: number) => {
    try {
      await deleteDiscount(discountId);
      enqueueSnackbar("Discount has been deleted", {
        variant: "error",
        className: "font-poppins",
      });

      // Update the state by filtering out the deleted discount
      setDiscounts((prevDiscounts) => prevDiscounts.filter(discount => discount.id !== discountId));

      setDiscountStatuses((prevStatuses) => {
        const updated = { ...prevStatuses };
        delete updated[discountId];
        return updated;
      });
    } catch (error) {
      console.error("Error deleting discount:", error);
      enqueueSnackbar("Failed to delete discount", { variant: "error" });
    }
  };

  const toggleStatus = async (discountId: number) => {
    try {
      const response = await updateDiscountStatus(discountId);
      console.log(response, "Updated Status Response");

      if (response) {
        setDiscountStatuses((prevStatuses) => ({
          ...prevStatuses,
          [discountId]: response.isActive === "true" ? true : false,
        }));

        enqueueSnackbar(
          response.isActive === "true" ? "Offer is now Active" : "Offer is now Disabled",
          { variant: response.isActive === "true" ? "success" : "warning" }
        );
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error updating discount status:", error);
      enqueueSnackbar("Failed to update discount status", { variant: "error" });
    }
  };

  return (
    <div className="mb-6">
      {discounts.length > 0 ? (
        discounts.map((discount) => (
          <div key={discount.id} className="py-2 text-white mt-4 relative">
            <div
              className="flex justify-between p-6 rounded-lg"
              style={{
                background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)",
              }}
            >
              <div>
                <h3 className="text-xl font-semibold">{discount.couponCode}</h3>
                <p className="text-sm">
                  Price Reduction: {discount.percentage}%
                </p>
              </div>
              <span
                className={`px-6 flex items-center rounded-md font-semibold ${
                  discountStatuses[discount.id] == true
                    ? "bg-green-300 text-green-900"
                    : "bg-red-300 text-red-900"
                }`}
              >
                {discountStatuses[discount.id] == true ? "Active" : "Disabled"}
              </span>
            </div>

            <p className="text-gray-700 mt-3">
              <b>Offer applicable on:</b> {discount.applicableFor}
              <br />
              <b>Maximum discount:</b> {discount.maxCap}
            </p>

            <div className="mt-6 flex space-x-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="border-red-500 text-red-700 px-6 rounded-lg font-medium hover:bg-red-500 h-[42px]"
                  >
                    Delete this offer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="font-poppins">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this offer? Once
                      confirmed, it will be permanently deleted and you will not
                      be able to recover it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white"
                      onClick={() => deleteClick(discount.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                className="border border-blue-600 px-6 text-white rounded-lg font-medium hover:bg-blue-900 h-[42px]"
                onClick={() => toggleStatus(discount.id)}
              >
                {discountStatuses[discount.id]
                  ? "Disable this offer"
                  : "Enable this offer"}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-2">Discounts created are shown here!</div>
      )}
    </div>
  );
};

export default ActiveDiscounts;
