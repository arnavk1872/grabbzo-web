import { Input } from "@/components/UI/Input";

interface TimePickerProps {
  date: Date | string | undefined;
  setDate: (time: string | undefined, field: string | undefined) => void;
  value: string | undefined;
}

export default function TimePicker({ date, setDate,value }: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    setDate(timeValue,value);
  };

  return (
    <>
      <Input
        type="time"
        id="time"
        aria-label="Choose time"
        className="w-3/4 sm:w-3/4 mt-2 cursor-pointer"
        value={date ? date.toString().slice(0, 5) : ""}
        onChange={handleChange}
      />
    </>
  );
}
