import { WORK_ORDER } from '@/lib/constants/work-order.constants';

export type Priority = (typeof WORK_ORDER.PRIORITIES)[number];
export type Status = (typeof WORK_ORDER.STATUSES)[number];

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  updatedAt: string;
}

export interface CreateWorkOrderInput {
  title: string;
  description: string;
  priority: Priority;
}

export interface UpdateWorkOrderInput extends Partial<CreateWorkOrderInput> {
  status?: Status;
}

export interface WorkOrderFilters {
  status?: Status;
  search?: string;
}

export interface WorkOrderResponse {
  data: WorkOrder[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
