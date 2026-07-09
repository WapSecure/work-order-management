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
  SEARCH: {
    MIN_CHARS: 3,
    DEBOUNCE_MS: 500,
  },
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

export const MESSAGES = {
  DELETE: {
    CONFIRM: 'Are you sure you want to delete this work order?',
    SUCCESS: 'Work order deleted successfully! 🗑️',
    ERROR: 'Failed to delete work order. Please try again.',
  },
  CREATE: {
    SUCCESS: 'Work order created successfully! 🎉',
    ERROR: 'Failed to create work order. Please try again.',
  },
  UPDATE: {
    SUCCESS: 'Work order updated successfully! ✅',
    ERROR: 'Failed to update work order. Please try again.',
  },
  FETCH: {
    ERROR: 'Failed to fetch work orders. Please try again.',
    NOT_FOUND: 'Work order not found',
  },
  FORM: {
    SUBMIT_ERROR: 'Failed to save work order. Please try again.',
    VALIDATION_ERROR: 'Please fix the validation errors',
    SAVING: 'Saving...',
    CREATE_BUTTON: 'Create Work Order',
    UPDATE_BUTTON: 'Update Work Order',
    CANCEL: 'Cancel',
  },
  EMPTY_STATE: {
    TITLE: 'No work orders found',
    DESCRIPTION: 'Get started by creating your first work order to track tasks and projects.',
    ACTION: 'Create Work Order',
  },
  TABLE: {
    TITLE: 'Title',
    PRIORITY: 'Priority',
    STATUS: 'Status',
    UPDATED: 'Updated',
    ACTIONS: 'Actions',
    NO_ORDERS: 'No work orders found',
    CREATE_FIRST: 'Create your first work order to get started',
    WORK_ORDERS_COUNT: (count: number) => `${count} work order${count !== 1 ? 's' : ''}`,
  },
  FILTERS: {
    SEARCH_PLACEHOLDER: 'Search by title or description...',
    SEARCH_MIN_CHARS: (min: number) => `Type at least ${min} characters to search`,
    ALL_STATUSES: 'All Statuses',
    CLEAR_FILTERS: 'Clear filters',
  },
  PAGE: {
    TITLE: 'Work Orders',
    CREATE_TITLE: 'Create Work Order',
    EDIT_TITLE: 'Edit Work Order',
    DETAIL_TITLE: 'Work Order Details',
  },
  TOAST: {
    CREATE: {
      LOADING: 'Creating work order...',
      SUCCESS: 'Work order created successfully! 🎉',
      ERROR: 'Failed to create work order. Please try again.',
    },
    UPDATE: {
      LOADING: 'Updating work order...',
      SUCCESS: 'Work order updated successfully! ✅',
      ERROR: 'Failed to update work order. Please try again.',
    },
    DELETE: {
      LOADING: 'Deleting work order...',
      SUCCESS: 'Work order deleted successfully! 🗑️',
      ERROR: 'Failed to delete work order. Please try again.',
    },
    FETCH: {
      LOADING: 'Loading work orders...',
      SUCCESS: 'Work orders loaded successfully! 📋',
      ERROR: 'Failed to load work orders. Please try again.',
    },
  },
} as const;
