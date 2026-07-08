import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderService } from '@/services/work-order.service';
import {
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
  WorkOrderFilters,
} from '@/types/work-order.types';

export const WORK_ORDERS_QUERY_KEY = 'workOrders';

export function useWorkOrders(filters?: WorkOrderFilters & { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: [WORK_ORDERS_QUERY_KEY, filters],
    queryFn: () => workOrderService.getAll(filters),
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useWorkOrder(id: string) {
  return useQuery({
    queryKey: [WORK_ORDERS_QUERY_KEY, id],
    queryFn: () => workOrderService.getById(id),
    enabled: !!id,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkOrderInput) => workOrderService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY] });
    },
  });
}

export function useUpdateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkOrderInput }) =>
      workOrderService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workOrderService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY] });
    },
  });
}
