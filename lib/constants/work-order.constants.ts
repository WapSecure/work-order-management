export const WORK_ORDER = {
  TITLE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 80,
    PLACEHOLDER: 'Enter work order title',
    ERROR_MIN: 'Title must be at least 2 characters',
    ERROR_MAX: 'Title must not exceed 80 characters',
  },
  DESCRIPTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 2000,
    PLACEHOLDER: 'Describe the work order details...',
    ERROR_MIN: 'Description is required',
    ERROR_MAX: 'Description must not exceed 2000 characters',
  },
  PRIORITIES: ['Low', 'Medium', 'High'] as const,
  STATUSES: ['Open', 'In Progress', 'Done'] as const,
  DEFAULT_STATUS: 'Open' as const,
  CACHE_TTL: 5000, // 5 seconds
  PAGE_SIZE: 10,
  DATE_FORMAT: 'MMM d, yyyy HH:mm',
} as const;

export const PRIORITY_LABELS: Record<(typeof WORK_ORDER.PRIORITIES)[number], string> = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
};

export const STATUS_LABELS: Record<(typeof WORK_ORDER.STATUSES)[number], string> = {
  Open: 'Open',
  'In Progress': 'In Progress',
  Done: 'Done',
};

export const PRIORITY_COLORS: Record<(typeof WORK_ORDER.PRIORITIES)[number], string> = {
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export const STATUS_COLORS: Record<(typeof WORK_ORDER.STATUSES)[number], string> = {
  Open: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};
