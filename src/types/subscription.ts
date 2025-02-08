import { Plan } from "./plan";
import { Transaction } from "./transaction";

export interface Subscription {
    id?: string;
    plan: Plan;
    transaction?: Transaction;
    start_date?: string;
    end_date?: string;
    status?: string;
    next_billing_date?: string;
    auto_renewal?: boolean;
  }
  