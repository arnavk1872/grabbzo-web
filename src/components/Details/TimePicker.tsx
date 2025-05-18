import { Input } from "@/components/UI/Input";

interface TimePickerProps {
  date: Date | string | undefined; 
  setDate: (time: string | undefined) => void; 
}

export default function TimePicker({ date, setDate }: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value; 
    setDate(timeValue); 
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="grid w-full items-center my-4">
          <Input
            type="time"
            id="time"
            aria-label="Choose time"
            className="w-1/2 sm:w-1/6 cursor-pointer"
            value={date ? date.toString().slice(0, 5) : ''}
            onChange={handleChange} 
          />
        </div>
      </div>
    </>
  );
}
