import { Branch } from "../branch";
import { Contact } from "../contact";
import { BranchLocation } from "../branchLocation";
import { Restaurant } from "../restaurants";

export interface CreateBranch {
  branch: Branch;
  restaurantId: string;
  locationId: string;
  location: BranchLocation;
  restarant: Restaurant;
  contact: Contact;
}
