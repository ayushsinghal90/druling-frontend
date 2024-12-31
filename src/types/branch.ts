import { Contact } from "./contact";
import { BranchLocation } from "./branchLocation";
import { Restaurant } from "./restaurants";
import { MenuData } from "./menu";

export interface Branch {
  id?: string;
  name: string;
  description?: string;
  location?: BranchLocation;
  manager?: string;
  menu_id?: string;
  contact_info?: Contact;
  restaurant?: Restaurant;
}
