import { Branch } from "./branch";
import { Contact } from "./contact";

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  branches: Branch[];
  contactInfo?: Contact;
}
