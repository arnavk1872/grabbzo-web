import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Item name is required"),
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
  preparationTime: z.preprocess(
    (value) => {
      if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
        return parseFloat(value);
      }
      return value;
    },
    z
      .number()
      .positive("Preparation time must be greater than 0")
      .refine((val) => val > 0, "Preparation time must be greater than 0")
      .optional()
  ),
  // imageFile: z
  //   .instanceof(File, { message: "Please upload an image" })
  //   .refine((file) => file.size < 500 * 1024, "File size must be under 500KB"),
});
