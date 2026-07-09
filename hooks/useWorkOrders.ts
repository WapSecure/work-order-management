import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderService } from '@/services/work-order.service';
import {
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
  WorkOrderFilters,
} from '@/types/work-order.types';
import toast from 'react-hot-toast';
import { MESSAGES } from '@/lib/constants/work-order.constants';

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
    onMutate: () => {
      toast.loading('Creating work order...', { id: 'create-work-order' });
    },
    onSuccess: () => {
      toast.success(MESSAGES.CREATE.SUCCESS, { id: 'create-work-order' });
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || MESSAGES.CREATE.ERROR, { id: 'create-work-order' });
    },
  });
}

export function useUpdateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkOrderInput }) =>
      workOrderService.update(id, data),
    onMutate: () => {
      toast.loading('Updating work order...', { id: 'update-work-order' });
    },
    onSuccess: (_, variables) => {
      toast.success(MESSAGES.UPDATE.SUCCESS, { id: 'update-work-order' });
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY, variables.id] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || MESSAGES.UPDATE.ERROR, { id: 'update-work-order' });
    },
  });
}

export function useDeleteWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workOrderService.delete(id),
    onMutate: () => {
      toast.loading('Deleting work order...', { id: 'delete-work-order' });
    },
    onSuccess: () => {
      toast.success(MESSAGES.DELETE.SUCCESS, { id: 'delete-work-order' });
      queryClient.invalidateQueries({ queryKey: [WORK_ORDERS_QUERY_KEY] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || MESSAGES.DELETE.ERROR, { id: 'delete-work-order' });
    },
  });
}
