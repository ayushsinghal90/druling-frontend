import { Branch } from "../branch";
import { Contact } from "../contact";
import { BranchLocation } from "../branchLocation";
import { Restaurant } from "../restaurants";

export interface CreateBranch {
  branch: Branch;
  restaurant_id?: string;
  location_id?: string;
  location?: BranchLocation;
  restaurant?: Restaurant;
  contact: Contact;
}
