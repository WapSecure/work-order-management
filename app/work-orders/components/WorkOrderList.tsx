'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button/Button';
import { PlusIcon } from '@/components/icons';
import { WorkOrderTable } from './WorkOrderTable';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal';
import { useDeleteWorkOrder } from '@/hooks/useWorkOrders';
import { ROUTES } from '@/lib/constants/routes';
import { MESSAGES } from '@/lib/constants/work-order.constants';
import { useWorkOrdersContext } from './WorkOrdersProvider';

export function WorkOrderList() {
  const { orders, isLoading, error } = useWorkOrdersContext();
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderTitle, setSelectedOrderTitle] = useState<string>('');
  const deleteMutation = useDeleteWorkOrder();

  const displayOrders = useMemo(() => {
    return orders.filter(order => !deletedIds.has(order.id));
  }, [orders, deletedIds]);

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedOrderId(id);
    setSelectedOrderTitle(title);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrderId) return;

    const orderId = selectedOrderId;

    setDeletedIds(prev => new Set(prev).add(orderId));
    setIsModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderTitle('');

    try {
      await deleteMutation.mutateAsync(orderId);
    } catch (error) {
      setDeletedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
      console.error(MESSAGES.DELETE.ERROR, error);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderTitle('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Error loading work orders</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{error.message}</p>
      </div>
    );
  }

  if (displayOrders.length === 0) {
    return (
      <EmptyState
        title={MESSAGES.EMPTY_STATE.TITLE}
        description={MESSAGES.EMPTY_STATE.DESCRIPTION}
        actionLabel={MESSAGES.EMPTY_STATE.ACTION}
        onAction={() => {
          window.location.href = ROUTES.WORK_ORDER_CREATE;
        }}
      />
    );
  }

  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {MESSAGES.PAGE.TITLE}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {MESSAGES.TABLE.WORK_ORDERS_COUNT(displayOrders.length)}
          </p>
        </div>
        <Link href={ROUTES.WORK_ORDER_CREATE}>
          <Button className="flex items-center gap-2 whitespace-nowrap">
            <PlusIcon className="h-4 w-4" />
            {MESSAGES.EMPTY_STATE.ACTION}
          </Button>
        </Link>
      </div>

      <WorkOrderTable
        orders={displayOrders}
        onDelete={handleDeleteClick}
        isDeleting={deleteMutation.isPending ? selectedOrderId : null}
      />

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        title="Delete Work Order"
        message={`Are you sure you want to delete "${selectedOrderTitle}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
