export type Locale = 'en' | 'es';

export interface Translation {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    back: string;
    close: string;
    confirm: string;
    search: string;
    clear: string;
  };
  workOrders: {
    title: string;
    create: string;
    edit: string;
    delete: string;
    details: string;
    noOrders: string;
    createFirst: string;
    workOrdersCount: (count: number) => string;
  };
  filters: {
    searchPlaceholder: string;
    searchMinChars: (min: number) => string;
    allStatuses: string;
    clearFilters: string;
  };
  table: {
    title: string;
    priority: string;
    status: string;
    updated: string;
    actions: string;
  };
  form: {
    title: string;
    description: string;
    priority: string;
    status: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    required: string;
    saving: string;
    createButton: string;
    updateButton: string;
    cancel: string;
    validationError: string;
    submitError: string;
  };
  priorities: {
    low: string;
    medium: string;
    high: string;
  };
  statuses: {
    open: string;
    inProgress: string;
    done: string;
  };
  messages: {
    deleteConfirm: string;
    deleteSuccess: string;
    deleteError: string;
    createSuccess: string;
    createError: string;
    updateSuccess: string;
    updateError: string;
    fetchError: string;
    notFound: string;
  };
  page: {
    title: string;
    createTitle: string;
    editTitle: string;
    detailTitle: string;
    notFound: string;
  };
  emptyState: {
    title: string;
    description: string;
    action: string;
  };
}
