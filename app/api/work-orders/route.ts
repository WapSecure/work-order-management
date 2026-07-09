import { NextRequest, NextResponse } from 'next/server';
import { workOrderRepository } from '@/lib/data/work-order.repository';
import { createWorkOrderSchema, workOrderQuerySchema } from '@/lib/validation/work-order.schema';
import { WorkOrderFilters } from '@/types/work-order.types';
import { ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams);

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

    const filters: WorkOrderFilters = {};
    if (status) filters.status = status;
    if (search && search.length >= 3) filters.search = search;

    const orders = await workOrderRepository.findAll(filters);

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'GET, POST, OPTIONS',
    },
  });
}
