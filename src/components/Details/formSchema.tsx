import { z } from "zod";

export const DocFormSchema = z.object({
  panNumber: z
    .string()
    .min(1, { message: "PAN Number is required!" })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
      message: "PAN Number is invalid!",
    }),

  panName: z
    .string()
    .min(1, {
      message: "Name is required!",
    })
    .max(50, {
      message: "Name must not exceed 50 characters",
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain Letters",
    })
    .trim(),

  GstNumber: z
    .string()
    .min(1, { message: "GST Number is required!" })
    .regex(
      /^([0-9]{2})([A-Z]{5})([0-9]{4})([A-Z]{1})([A-Z0-9]{1})([A-Z]{1})([0-9]{1})$/,
      {
        message: "GST Number is invalid!",
      }
    ),

  FssaiNumber: z
    .string()
    .min(1, { message: "FSSAI Number is required!" })
    .regex(/^[0-9]{14}$/, {
      message: "FSSAI Number is invalid!",
    }),

  BankAccountNumber: z
    .string()
    .min(1, { message: "Bank Account Number is required!" })
    .regex(/^[0-9]{9,18}$/, {
      message: "Bank Account Number is invalid!",
    }),

  BankIfscCode: z
    .string()
    .min(1, { message: "Bank IFSC Code is required!" })
    .regex(/^[A-Za-z]{4}\d{7}$/, {
      message: "Bank IFSC Code is invalid!",
    }),
});

export const BasicFormSchema = z.object({
  ownerName: z
    .string()
    .min(1, { message: "Owner Name is required!" })
    .max(100, { message: "Owner Name must not exceed 100 characters." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Owner Name can only contain letters.",
    }),

  restaurantName: z
    .string()
    .min(1, { message: "Restaurant Name is required!" })
    .max(100, { message: "Restaurant Name must not exceed 100 characters." }),

  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Please enter a valid email address." }),

  shopNo: z.string().min(1, { message: "Shop Number is required!" }),

  floor: z.string().min(1, { message: "Floor is required!" }),

  area: z
    .string()
    .min(1, { message: "Area is required!" })
    .max(100, { message: "Area must not exceed 100 characters." }),

  pinCode: z
    .string()
    .min(1, { message: "PinCode is required! " })
    .max(6, { message: "PinCode does not exceed 6 digits!" }),
});
