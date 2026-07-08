import { z } from 'zod';
import { WORK_ORDER } from '@/lib/constants/work-order.constants';

// Create work order schema
export const createWorkOrderSchema = z.object({
  title: z
    .string()
    .min(WORK_ORDER.TITLE.MIN_LENGTH, WORK_ORDER.TITLE.ERROR_MIN)
    .max(WORK_ORDER.TITLE.MAX_LENGTH, WORK_ORDER.TITLE.ERROR_MAX)
    .trim(),
  description: z
    .string()
    .min(WORK_ORDER.DESCRIPTION.MIN_LENGTH, WORK_ORDER.DESCRIPTION.ERROR_MIN)
    .max(WORK_ORDER.DESCRIPTION.MAX_LENGTH, WORK_ORDER.DESCRIPTION.ERROR_MAX)
    .trim(),
  priority: z.enum(WORK_ORDER.PRIORITIES),
});

// Update work order schema (all fields optional)
export const updateWorkOrderSchema = createWorkOrderSchema.partial().extend({
  status: z.enum(WORK_ORDER.STATUSES).optional(),
});

// Work order query schema for API filtering
export const workOrderQuerySchema = z.object({
  status: z.enum(WORK_ORDER.STATUSES).optional(),
  search: z
    .string()
    .optional()
    .transform(val => val?.trim()),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(WORK_ORDER.PAGE_SIZE),
});

// Type inferences
export type CreateWorkOrderData = z.infer<typeof createWorkOrderSchema>;
export type UpdateWorkOrderData = z.infer<typeof updateWorkOrderSchema>;
export type WorkOrderQueryParams = z.infer<typeof workOrderQuerySchema>;
