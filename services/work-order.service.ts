import {
  WorkOrder,
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
  WorkOrderFilters,
} from '@/types/work-order.types';
import { API } from '@/lib/constants/api';
import { createApiError } from '@/lib/utils/error';

export class WorkOrderService {
  private static instance: WorkOrderService;

  private constructor() {}

  static getInstance(): WorkOrderService {
    if (!WorkOrderService.instance) {
      WorkOrderService.instance = new WorkOrderService();
    }
    return WorkOrderService.instance;
  }

  async getAll(filters?: WorkOrderFilters & { page?: number; pageSize?: number }) {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.page) params.append('page', String(filters.page));
      if (filters?.pageSize) params.append('pageSize', String(filters.pageSize));

      const url = `${API.WORK_ORDERS}?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw createApiError(response, data);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch work orders:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<WorkOrder> {
    try {
      const response = await fetch(API.WORK_ORDER(id));

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw createApiError(response, data);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch work order ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreateWorkOrderInput): Promise<WorkOrder> {
    try {
      const response = await fetch(API.WORK_ORDERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw createApiError(response, errorData);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to create work order:', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateWorkOrderInput): Promise<WorkOrder> {
    try {
      const response = await fetch(API.WORK_ORDER(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw createApiError(response, errorData);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update work order ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(API.WORK_ORDER(id), {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw createApiError(response, errorData);
      }
    } catch (error) {
      console.error(`Failed to delete work order ${id}:`, error);
      throw error;
    }
  }
}

export const workOrderService = WorkOrderService.getInstance();
