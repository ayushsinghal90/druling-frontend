export interface Transaction {
  id?: string;
  amount: number;
  discount?: number;
  taxes?: number;
  total_amount?: number;
  status?: string;
  method?: string;
  completed_at?: string;
  reference_number?: string;
  subscription?: string;
}
