export const ROUTES = {
  HOME: '/',
  WORK_ORDERS: '/work-orders',
  WORK_ORDER: (id: string) => `/work-orders/${id}`,
  WORK_ORDER_EDIT: (id: string) => `/work-orders/${id}/edit`,
  WORK_ORDER_CREATE: '/work-orders/create',
} as const;
