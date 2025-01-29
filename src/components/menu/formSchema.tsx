import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Item name is required"),
  selectedCategory: z.string().min(1, "Please select a Category"), 
  restaurantCategory: z.object({
    id: z.number().positive("Please select a valid Category"), 
  }),
  isVeg: z.boolean(),
  price: z.preprocess(
    (value) => {
      if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
        return parseFloat(value);
      }
      return value;
    },
    z
      .number()
      .positive("Price must be greater than 0")
      .refine((val) => val > 0, "Price must be greater than 0")
  ),
  description: z.string().min(1, "Description is required"),
});
