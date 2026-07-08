import { NextRequest, NextResponse } from 'next/server';
import { workOrderRepository } from '@/lib/data/work-order.repository';
import { createWorkOrderSchema, workOrderQuerySchema } from '@/lib/validation/work-order.schema';
import { WorkOrderFilters } from '@/types/work-order.types';
import { ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/work-orders
 * Fetch work orders with optional filters and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams);

    // Validate query parameters
    const validationResult = workOrderQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.VALIDATION_ERROR,
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const { status, search, page, pageSize } = validationResult.data;

    // Build filters
    const filters: WorkOrderFilters = {};
    if (status) filters.status = status;
    if (search) filters.search = search;

    // Fetch orders
    const orders = await workOrderRepository.findAll(filters);

    // Apply pagination
    const start = (page - 1) * pageSize;
    const paginatedOrders = orders.slice(start, start + pageSize);

    return NextResponse.json({
      data: paginatedOrders,
      total: orders.length,
      page,
      pageSize,
      totalPages: Math.ceil(orders.length / pageSize),
    });
  } catch (error) {
    console.error('Failed to fetch work orders:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * POST /api/work-orders
 * Create a new work order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = createWorkOrderSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.VALIDATION_ERROR,
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Create work order
    const order = await workOrderRepository.create(validationResult.data);

    return NextResponse.json(order, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    console.error('Failed to create work order:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
