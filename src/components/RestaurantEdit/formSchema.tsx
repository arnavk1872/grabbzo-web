import { z } from "zod";

export const EditFormSchema = z.object({
  ownerName: z
    .string()
    .min(1, { message: "Owner Name is required!" })
    .max(100, { message: "Owner Name must not exceed 100 characters." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Owner Name can only contain letters.",
    }),

  emailAddress: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Please enter a valid email address." }),

  shopNumber: z.string().min(1, { message: "Shop Number is required!" }),

  floorOrTower: z.string().min(1, { message: "Floor is required!" }),

  areaOrSectorOrLocality: z
    .string()
    .min(1, { message: "Area is required!" })
    .max(100, { message: "Area must not exceed 100 characters." }),
});
