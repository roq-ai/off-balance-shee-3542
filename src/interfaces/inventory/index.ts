import { FinanceInterface } from 'interfaces/finance';
import { OrderInterface } from 'interfaces/order';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  name: string;
  status: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  finance?: FinanceInterface[];
  order?: OrderInterface[];
  organization?: OrganizationInterface;
  _count?: {
    finance?: number;
    order?: number;
  };
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  organization_id?: string;
}
