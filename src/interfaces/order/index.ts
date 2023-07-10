import { InventoryInterface } from 'interfaces/inventory';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  inventory_id?: string;
  customer_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  user?: UserInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  inventory_id?: string;
  customer_id?: string;
  status?: string;
}
