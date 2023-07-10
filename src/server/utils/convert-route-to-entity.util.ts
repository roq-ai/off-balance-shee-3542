const mapping: Record<string, string> = {
  erps: 'erp',
  finances: 'finance',
  inventories: 'inventory',
  orders: 'order',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
