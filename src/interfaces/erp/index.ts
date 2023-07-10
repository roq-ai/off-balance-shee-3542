import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ErpInterface {
  id?: string;
  organization_id?: string;
  integration_settings: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ErpGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
  integration_settings?: string;
}
