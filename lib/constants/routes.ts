export const ROUTES = {
  HOME: '/',
  WORK_ORDERS: '/work-orders',
  WORK_ORDER: (id: string) => `/work-orders/${id}`,
  WORK_ORDER_EDIT: (id: string) => `/work-orders/${id}/edit`,
  WORK_ORDER_CREATE: '/work-orders/create',
} as const;

export const API_ROUTES = {
  WORK_ORDERS: '/api/work-orders',
  WORK_ORDER: (id: string) => `/api/work-orders/${id}`,
} as const;
