import { Branch } from "./branch";
import { Contact } from "./contact";

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  branches: Branch[];
  contact_info?: Contact;
}
