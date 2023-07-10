import { InventoryInterface } from 'interfaces/inventory';
import { GetQueryInterface } from 'interfaces';

export interface FinanceInterface {
  id?: string;
  inventory_id?: string;
  financial_details: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  _count?: {};
}

export interface FinanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  inventory_id?: string;
  financial_details?: string;
}
