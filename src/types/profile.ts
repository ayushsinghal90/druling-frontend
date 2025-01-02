import { Contact } from "./contact";

export interface Profile {
  id?: string;
  first_name: string;
  last_name: string;
  contact_info: Contact;
  img_url?: string;
}
