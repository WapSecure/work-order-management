'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WorkOrder } from '@/types/work-order.types';
import { Button } from '@/components/ui/button/Button';
import { PlusIcon } from '@/components/icons';
import { WorkOrderTable } from './WorkOrderTable';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal';
import { useDeleteWorkOrder } from '@/hooks/useWorkOrders';
import { ROUTES } from '@/lib/constants/routes';
import { MESSAGES } from '@/lib/constants/work-order.constants';

interface WorkOrderListProps {
  initialOrders: WorkOrder[];
  isLoading?: boolean;
}

export function WorkOrderList({ initialOrders, isLoading = false }: WorkOrderListProps) {
  const [optimisticOrders, setOptimisticOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderTitle, setSelectedOrderTitle] = useState<string>('');
  const deleteMutation = useDeleteWorkOrder();

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedOrderId(id);
    setSelectedOrderTitle(title);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrderId) return;

    const orderId = selectedOrderId;

    // Close modal first
    setIsModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderTitle('');

    // Optimistic update
    setOptimisticOrders(prev => prev.filter(order => order.id !== orderId));

    try {
      await deleteMutation.mutateAsync(orderId);
    } catch (error) {
      // Rollback on error
      setOptimisticOrders(initialOrders);
      console.error(MESSAGES.DELETE.ERROR, error);
      alert(MESSAGES.DELETE.ERROR);
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

  if (optimisticOrders.length === 0) {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {MESSAGES.PAGE.TITLE}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {MESSAGES.TABLE.WORK_ORDERS_COUNT(optimisticOrders.length)}
          </p>
        </div>
        <Link href={ROUTES.WORK_ORDER_CREATE}>
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            {MESSAGES.EMPTY_STATE.ACTION}
          </Button>
        </Link>
      </div>

      <WorkOrderTable
        orders={optimisticOrders}
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
