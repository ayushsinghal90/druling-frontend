import { Contact } from "./contact";
import { BranchLocation } from "./branchLocation";

export interface Branch {
  id: string;
  name: string;
  description?: string;
  location?: BranchLocation;
  manager?: string;
  menuLink?: string;
  contactInfo?: Contact;
}
