import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { HelpCircle } from "lucide-react";

const MenuHelpTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 text-gray-500 hover:text-gray-700 ">
            <HelpCircle className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-4 text-white font-poppins">
          <div className="space-y-2">
            <h4 className="font-semibold">How to create your menu:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Add Category" to create menu categories</li>
              <li>Click "Add Item" within a category to add menu items</li>
              <li>Fill in item details like name, price, and description</li>
              <li>Add variants or add-ons if needed</li>
              <li>Upload item images</li>
              <li>Click "Save Changes" to save your menu</li>
            </ol>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MenuHelpTooltip; 