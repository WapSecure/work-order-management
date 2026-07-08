export const API = {
  WORK_ORDERS: '/api/work-orders',
  WORK_ORDER: (id: string) => `/api/work-orders/${id}`,
} as const;
