import { z } from "zod";
import { formSchema } from "./createBranch";

const editFormSchema = formSchema.pick({
  branch: true,
  contact: true,
  location: true,
});

export type EditBranchSchema = z.infer<typeof editFormSchema>;

export { editFormSchema as formSchema };
