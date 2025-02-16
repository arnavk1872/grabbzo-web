import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../UI/Dropdown";
import DownwardArrow from "../Icons/DownwardArrow";

interface DropdownProps {
  label: string;
  options: Array<{ id: number; name: string } | number>; 
  selected: number | string | null;
  onSelect: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => (
  <div className="border border-borderColor p-2 px-6 rounded-[16px] w-full">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex justify-between items-center gap-x-4">
          {selected || label}
          <DownwardArrow />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        {options.map((option) =>
          // Check if the option is an object (category) or a number
          typeof option === "object" && option !== null && "name" in option ? (
            <DropdownMenuItem
            className="cursor-pointer"
              key={option.id}
              onClick={() => onSelect(option.id)}
            >
              {option.name} 
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={option as number}
              onClick={() => onSelect(option as number)}
            >
              {option} 
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default Dropdown;
