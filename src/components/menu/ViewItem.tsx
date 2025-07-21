import React, { useEffect, useState } from "react";
import { Heart, Loader, Timer } from "lucide-react";
import { updateItemDetails } from "@/helpers/menu-utils";
import { getItemDetails } from "@/helpers/menu-utils";
import { cn } from "@/lib/utils";
import { useSnackbar } from "notistack";

interface ItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  portionSize: string;
  servingInfo: string;
  preparationTime: number;
  isVeg: boolean;
  recommended: boolean;
}

interface ViewItemProps {
  itemId: number;
}

const ViewItem: React.FC<ViewItemProps> = ({ itemId }) => {
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [isRecommended, setIsRecommended] = useState(false);


  const { enqueueSnackbar } = useSnackbar();

  const changeRecommendation = async () => {
    if (itemData) {
      const updatedValue = !isRecommended;
      setIsRecommended(updatedValue);
      const payload = { recommended: updatedValue };
      await updateItemDetails(itemData.id, payload);
      enqueueSnackbar(
        updatedValue ? "Recommendation Added" : "Recommendation Removed",
        {
          variant: updatedValue ? "success" : "error",
          className: "font-poppins",
        }
      );
    }
  };

  useEffect(() => {
    const getItemData = async () => {
      try {
        const response = await getItemDetails(itemId);
        setItemData(response);
        setIsRecommended(response.recommended);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
    };

    getItemData();
  }, [itemId]);

  if (!itemData) return <p className="text-center py-4"><Loader/></p>;

  return (
    <div className="flex flex-col border-none shadow-none justify-between w-full md:flex-row items-center md:items-start bg-white p-2 rounded-lg gap-6 max-w-2xl mx-auto">
      {/* Image Section */}
      {itemData.imageUrl && (
        <img
          src={itemData.imageUrl}
          alt={itemData.title}
          className="w-28 h-24 object-cover rounded-lg"
        />
      )}

      {/* Details Section */}
      <div className="flex-1 space-y-2 w-full">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">Item Description: </span>
          {itemData.description}
        </p>

        <p
          className={cn(
            "text-sm font-medium",
            itemData.isVeg ? "text-green-600" : "text-red-600"
          )}
        >
          {itemData.isVeg ? "Vegetarian" : "Non-Vegetarian"}
        </p>
        <p className="text-lg font-bold text-green-600">₹{itemData.price}</p>
      </div>

      {/* Extra Info & Actions */}
      <div className="flex flex-col items-start gap-2">
        {/* {itemData.portionSize && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Portion Size:</span>{" "}
            {itemData.portionSize}
          </p>
        )}

        {itemData.servingInfo && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Serving Info: </span>
            {itemData.servingInfo}
          </p>
        )} */}

        <button
          onClick={changeRecommendation}
          className="flex items-center gap-2 px-2 py-1 rounded-full border hover:bg-gray-100 transition"
        >
          <Heart
            className={cn(
              "w-5 h-5",
              isRecommended ? "fill-red-500 text-red-500" : "text-gray-500"
            )}
          />
          <span className="text-sm font-medium">
            {isRecommended ? "Recommended" : "Recommend"}
          </span>
        </button>

        {/* {itemData.preparationTime > 0 && (
          <div className="text-sm flex gap-x-2 border rounded-full py-1 px-2 whitespace-nowrap items-center justify-center w-[120px] text-gray-700">
            <Timer size={23} />
            <div className="text-md">{itemData.preparationTime} mins</div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ViewItem;
