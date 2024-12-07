export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  menuLink: string;
}

export interface Restaurant {
  id: number;
  name: string;
  imageUrl?: string;
  branches: Branch[];
}
