import { Feature } from "./feature";

export interface Plan {
    id?: string;
    amount: number;
    duration?: number;
    name?: string;
    is_active?: boolean;
    features?: Feature[];
  }
  