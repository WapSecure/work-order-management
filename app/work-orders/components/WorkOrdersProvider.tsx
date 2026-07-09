'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useWorkOrders } from '@/hooks/useWorkOrders';
import { WorkOrder, WorkOrderFilters } from '@/types/work-order.types';

interface WorkOrdersContextType {
  orders: WorkOrder[];
  isLoading: boolean;
  error: Error | null;
}

const WorkOrdersContext = createContext<WorkOrdersContextType | undefined>(undefined);

interface WorkOrdersProviderProps {
  children: ReactNode;
  initialOrders: WorkOrder[];
  filters?: WorkOrderFilters;
}

export function WorkOrdersProvider({ children, initialOrders, filters }: WorkOrdersProviderProps) {
  const { data, isLoading, error } = useWorkOrders(filters);

  // Use data from query if available, otherwise use initial data
  const orders = data?.data ?? initialOrders;

  return (
    <WorkOrdersContext.Provider value={{ orders, isLoading, error }}>
      {children}
    </WorkOrdersContext.Provider>
  );
}

export function useWorkOrdersContext() {
  const context = useContext(WorkOrdersContext);
  if (context === undefined) {
    throw new Error('useWorkOrdersContext must be used within a WorkOrdersProvider');
  }
  return context;
}
