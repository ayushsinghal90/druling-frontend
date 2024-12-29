import { SocialContacts } from "./socialContact";

export interface Contact {
  id?: string;
  phone_number: string;
  email: string;
  social_contacts?: SocialContacts;
}
