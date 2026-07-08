export const WORK_ORDER = {
  TITLE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 80,
    PLACEHOLDER: 'Enter work order title',
  },
  DESCRIPTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 2000,
    PLACEHOLDER: 'Describe the work order details...',
  },
  PRIORITIES: ['Low', 'Medium', 'High'] as const,
  STATUSES: ['Open', 'In Progress', 'Done'] as const,
  DEFAULT_STATUS: 'Open',
  CACHE_TTL: 5000, // 5 seconds
  PAGE_SIZE: 10,
} as const;
