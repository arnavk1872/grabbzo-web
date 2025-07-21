import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/DefaultTooltip";
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
        <TooltipContent className="max-w-[300px] bg-teal-600 p-4 text-white font-poppins">
          <div className="space-y-2">
            <h4 className="font-semibold text-[16px]">How to create your menu:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Add Category" to create menu categories</li>
              <li>When a category is selected, fill the item details and save changes to add the item into said category.</li>
              <li>Add variants or add-ons if needed</li>
              <li>Upload item images</li>
            </ol>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MenuHelpTooltip; 