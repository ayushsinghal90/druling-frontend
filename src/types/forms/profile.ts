import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  avatarUrl: z.instanceof(File).nullable(),
});

export type ProfileSchema = z.infer<typeof formSchema>;

export { formSchema };
