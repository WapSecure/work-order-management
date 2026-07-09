import { NextRequest, NextResponse } from 'next/server';
import { workOrderRepository } from '@/lib/data/work-order.repository';
import { updateWorkOrderSchema } from '@/lib/validation/work-order.schema';
import { ERROR_MESSAGES, HTTP_STATUS } from '@/lib/constants/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/work-orders/:id
 * Fetch a single work order by ID
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const order = await workOrderRepository.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to fetch work order:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * PUT /api/work-orders/:id
 * Update an existing work order
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = updateWorkOrderSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.VALIDATION_ERROR,
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // Check if order exists
    const existingOrder = await workOrderRepository.findById(id);
    if (!existingOrder) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    // Update order
    const order = await workOrderRepository.update(id, validationResult.data);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to update work order:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * DELETE /api/work-orders/:id
 * Delete a work order
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingOrder = await workOrderRepository.findById(id);
    if (!existingOrder) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    const deleted = await workOrderRepository.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Work order deleted successfully' },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('Failed to delete work order:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
