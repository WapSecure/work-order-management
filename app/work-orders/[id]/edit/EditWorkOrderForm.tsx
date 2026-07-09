'use client';

import { useRouter } from 'next/navigation';
import { WorkOrder, UpdateWorkOrderInput } from '@/types/work-order.types';
import { WorkOrderForm } from '../../components/WorkOrderForm';
import { useUpdateWorkOrder } from '@/hooks/useWorkOrders';
import { ROUTES } from '@/lib/constants/routes';

interface EditWorkOrderFormProps {
  initialData: WorkOrder;
}

export function EditWorkOrderForm({ initialData }: EditWorkOrderFormProps) {
  const router = useRouter();
  const updateMutation = useUpdateWorkOrder();

  const handleSubmit = async (data: UpdateWorkOrderInput) => {
    await updateMutation.mutateAsync({
      id: initialData.id,
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
      },
    });
    router.push(ROUTES.WORK_ORDER(initialData.id));
  };

  return (
    <WorkOrderForm
      key={initialData.id}
      initialData={initialData}
      onSubmit={handleSubmit}
      isLoading={updateMutation.isPending}
      isEdit={true}
    />
  );
}
