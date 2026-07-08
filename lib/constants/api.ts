export const API = {
  WORK_ORDERS: '/api/work-orders',
  WORK_ORDER: (id: string) => `/api/work-orders/${id}`,
  TIMEOUT: 30000,
  RETRY_COUNT: 1,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation failed. Please check your input.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  DEFAULT: 'An unexpected error occurred. Please try again.',
} as const;
