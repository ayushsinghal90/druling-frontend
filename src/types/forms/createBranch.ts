import { z } from "zod";

const Defaults = {
  restaurant: {
    name: "",
    image: null,
    description: "",
  },
  branch: {
    name: "",
    image: null,
    manager: "",
    description: "",
  },
  contact: {
    email: "",
    phone: "",
  },
  location: {
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
};

// Define schema for form validation
const createBranchSchema = z.object({
  restaurant: z.object({
    name: z.string().min(1, "Restaurant name is required"),
    image: z.instanceof(File).nullable(),
    description: z.string().optional(),
  }),
  branch: z.object({
    name: z.string().min(1, "Branch name is required"),
    image: z.instanceof(File).nullable(),
    manager: z.string().optional(),
    description: z.string().optional(),
  }),
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
  }),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

export type CreateBranchSchema = z.infer<typeof createBranchSchema>;

export { Defaults, createBranchSchema as formSchema };
