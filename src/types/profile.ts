import { Contact } from "./contact";

export interface Profile {
  profile_id: string;
  first_name: string;
  last_name: string;
  contact_info: Contact;
}
