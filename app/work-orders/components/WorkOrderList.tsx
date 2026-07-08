'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WorkOrder } from '@/types/work-order.types';
import { Button } from '@/components/ui/button/Button';
import { PlusIcon } from '@/components/icons';
import { WorkOrderTable } from './WorkOrderTable';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { useDeleteWorkOrder } from '@/hooks/useWorkOrders';
import { ROUTES } from '@/lib/constants/routes';
import { MESSAGES } from '@/lib/constants/work-order.constants';

interface WorkOrderListProps {
  initialOrders: WorkOrder[];
  isLoading?: boolean;
}

export function WorkOrderList({ initialOrders, isLoading = false }: WorkOrderListProps) {
  const [optimisticOrders, setOptimisticOrders] = useState(initialOrders);
  const deleteMutation = useDeleteWorkOrder();

  const handleDelete = async (id: string) => {
    if (!confirm(MESSAGES.DELETE.CONFIRM)) {
      return;
    }

    // Optimistic update
    setOptimisticOrders(prev => prev.filter(order => order.id !== id));

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      // Rollback on error
      setOptimisticOrders(initialOrders);
      console.error(MESSAGES.DELETE.ERROR, error);
      alert(MESSAGES.DELETE.ERROR);
    }
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
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending ? 'deleting' : null}
      />
    </div>
  );
}
