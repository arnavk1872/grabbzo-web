import React, { useState, useEffect } from "react";
import Plus from "../Icons/Plus";
import { usePathname } from "next/navigation";
import { inStock } from "@/helpers/api-utils";
import Dustbin from "../Icons/Dustbin";
import Pencil from "../Icons/Pencil";
import { useSnackbar } from "notistack";

interface Item {
  id: number;
  title: string;
  isEnabled: boolean;
}

interface AvailableItemsProps {
  items: Item[];
  changeToggleEditor: (toggle: boolean) => void;
}

const AvailableItems: React.FC<AvailableItemsProps> = ({
  items,
  changeToggleEditor,
}) => {
  const [localItems, setLocalItems] = useState<Item[]>(items);
  const pathname = usePathname();
  const isEditor = pathname.includes("editor");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      await inStock(id, updatedStatus);
      if (updatedStatus == true) {
        enqueueSnackbar("Item in Stock !", {
          variant: "success",
          className: "font-poppins",
        });
      } else {
        enqueueSnackbar("Item Out of Stock !", {
          variant: "warning",
          className: "font-poppins",
        });
      }
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, isEnabled: updatedStatus } : item
        )
      );
    } catch (error) {
      console.error("Failed to update stock status:", error);
    }
  };

  return (
    <div className="flex w-[80%] flex-col">
      <div className="flex justify-between w-full font-semibold text-[18px] font-poppins px-6 my-4">
        ITEMS
      </div>
      <div className="border rounded-[30px] p-4 bg-white w-[90%] h-[80vh] px-8 mx-6">
        {localItems.length > 0 ? (
          localItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center cursor-pointer text-[17px] font-poppins justify-between py-2 border-b last:border-b-0"
            >
              <span>{item.title}</span>
              {isEditor && (
                <>
                  <div className="flex gap-x-2">
                    <Dustbin />
                    <Pencil />
                  </div>
                </>
              )}
              {!isEditor && (
                <button
                  onClick={() => handleToggle(item.id, item.isEnabled)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 ${
                    item.isEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transform ${
                      item.isEnabled ? "translate-x-4" : ""
                    } transition`}
                  ></div>
                </button>
              )}
            </div>
          ))
        ) : (
          <span className="font-poppins text-[16px]">No Items added yet!</span>
        )}
        {isEditor && (
          <div
            onClick={() => {
              changeToggleEditor(true);
            }}
            className="flex my-4 items-center w-fit cursor-pointer gap-x-1 text-[14px] font-poppins font-bold text-blue-700"
          >
            <Plus /> Add Item
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableItems;
