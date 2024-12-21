export interface Branch {
  id: string;
  name: string;
  description?: string;
  location?: BranchLocation;
  manager?: string;
  menuLink?: string;
  contactInfo?: Contact;
}

export interface BranchLocation {
  id: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

export interface Contact {
  id: string;
  phoneNumber: string;
  email: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  branches: Branch[];
  contactInfo?: Contact;
}
