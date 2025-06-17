import React, { useState, useEffect } from "react";
import Plus from "../Icons/Plus";
import { usePathname } from "next/navigation";
import { deleteItem, inStock } from "@/helpers/api-utils";
import { deleteMenuItem } from "@/helpers/menu-utils";
import { getItemDetails, addBlankItem } from "@/helpers/menu-utils";
import Dustbin from "../Icons/Dustbin";
import Pencil from "../Icons/Pencil";
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
  AlertDialogTrigger,
} from "../AlertDialog";
import { useItemStore } from "@/store/MenuStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./MenuAccordian";
import ViewItem from "./ViewItem";
import { ChevronDown } from "lucide-react";

interface Item {
  id: number;
  title: string;
  isEnabled: boolean;
}

interface AvailableItemsProps {
  items: Item[];
  changeToggleEditor: (toggle: boolean) => void;
  localItems: any;
  setLocalItems: any;
  stockVisible: boolean;
}

const AvailableItems: React.FC<AvailableItemsProps> = ({
  items,
  changeToggleEditor,
  localItems,
  setLocalItems,
  stockVisible,
}) => {
  const pathname = usePathname();
  const isEditor = pathname.includes("editor");
  const { enqueueSnackbar } = useSnackbar();
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

const {setItemId, setAccordionValue} = useItemStore();
  useEffect(() => {
    const filteredItems = items.filter((item) => !deletedIds.includes(item.id));

    const prevIds = localItems.map((item: any) => item.id).sort().join(",");
    const nextIds = filteredItems.map((item) => item.id).sort().join(",");

    if (prevIds !== nextIds) {
      setLocalItems(filteredItems);
    }
  }, [items, deletedIds]);


  const handleEditItem = async (itemId: number) => {
    setItemId(itemId);
    setAccordionValue('section-0');
  };

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
      setLocalItems((prevItems: any[]) =>
        prevItems.map((item: { id: number }) =>
          item.id === id ? { ...item, isEnabled: updatedStatus } : item
        )
      );
    } catch (error) {
      console.error("Failed to update stock status:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteMenuItem(itemId);
      enqueueSnackbar("Item Deleted!", {
        variant: "error",
        className: "font-poppins",
      });

      setDeletedIds((prev) => [...prev, itemId]); // Track deleted ID
      setLocalItems((prevItems: any[]) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddBlankItem = async () => {
    try {
      console.log("Creating new blank item...");
      const response = await addBlankItem();
      console.log("Add blank item response:", response);
      
      // The response from addBlankItem is response.data directly
      const newItem = {
        id: response.id || response.data?.id , // Fallback to timestamp if no ID
        title: "New Item",
        isEnabled: false,
      };
      
      console.log("New item created:", newItem);
      setLocalItems((prevItems: any[]) => {
        console.log("Previous items:", prevItems);
        const updatedItems = [...prevItems, newItem];
        console.log("Updated items:", updatedItems);
        return updatedItems;
      });
      
      enqueueSnackbar("New item created!", {
        variant: "success",
        className: "font-poppins",
      });
    } catch (error) {
      console.error("Error adding blank item:", error);
      enqueueSnackbar("Failed to create item", {
        variant: "error",
        className: "font-poppins",
      });
    }
  };


  return (
    <div className="flex  flex-col w-full">
      <div className="flex justify-between w-full font-semibold text-[18px] font-poppins px-6 my-4">
        ITEMS | {localItems?.length}
      </div>
      <div className="border rounded-[30px] p-4 bg-white w-[90%] min-w-[200px] h-[80vh] px-8 mx-6  overflow-y-auto no-scrollbar">
        {localItems?.length > 0 ? (
          localItems.map((item: any, index: number) => (
            <div
              key={`item-${item.id}-${index}`}
              className="flex items-center cursor-pointer w-full font-poppins justify-between py-2 border-b last:border-b-0"
            >
              <div className="w-11/12">
                <Accordion type="single" collapsible>
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="w-full">
                      {" "}
                      <div className="flex justify-between items-center w-full">
                        <div
                          className={`text-[18px] text-left truncate overflow-hidden whitespace-nowrap ${isEditor ? "w-24" : ""
                            }`}
                        >
                          {item.title}
                        </div>
                        {!isEditor && <ChevronDown />}
                      </div>
                    </AccordionTrigger>
                    {!isEditor && (
                      <AccordionContent>
                        <ViewItem itemId={item.id} />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>

              </div>

              {isEditor && (
                <>
                  <div className="flex gap-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Dustbin />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="font-poppins">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmation</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action is irreversible, and all item details
                            will be permanently lost.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="text-white"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <div onClick={() => handleEditItem(item.id)}>
                      <Pencil />
                    </div>
                  </div>
                </>
              )}
              {!isEditor && stockVisible && (
                <button
                  onClick={() => handleToggle(item.id, item.isEnabled)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 ${item.isEnabled ? "bg-green-500" : "bg-gray-300"
                    }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transform ${item.isEnabled ? "translate-x-4" : ""
                      } transition`}
                  ></div>
                </button>
              )}
            </div>
          ))
        ) : (
          <div className=" font-poppins cursor-pointer w-full rounded-lg px-2 py-8 text-[16px] bg-[#E5F2FF] flex flex-col items-center justify-center">
            <Plus /><div className="text-center text-[#1E3A56] font-semibold">Add Items To This New Category</div><div className="text-center text-[12px] py-2">You need to add items to this category as it cannot be empty</div></div>
        )}
        {/* {isEditor && (
          <div
            onClick={handleAddBlankItem}
            className="flex my-4 items-center w-fit cursor-pointer gap-x-1 text-[14px] font-poppins font-bold text-blue-700"
          >
            <Plus /> Add Item
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AvailableItems;
