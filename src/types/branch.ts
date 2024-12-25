import { Contact } from "./contact";
import { BranchLocation } from "./branchLocation";

export interface Branch {
  id?: string;
  name: string;
  description?: string;
  location?: BranchLocation;
  manager?: string;
  menu_link?: string;
  contact_info?: Contact;
  restaurant_id?: string;
}
