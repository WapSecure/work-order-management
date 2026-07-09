'use client';

import { useRouter } from 'next/navigation';
import { WorkOrderForm } from '../components/WorkOrderForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card/Card';
import { useCreateWorkOrder } from '@/hooks/useWorkOrders';
import { MESSAGES } from '@/lib/constants/work-order.constants';
import { ROUTES } from '@/lib/constants/routes';
import { CreateWorkOrderInput } from '@/types/work-order.types';

export default function CreateWorkOrderPage() {
  const router = useRouter();
  const createMutation = useCreateWorkOrder();

  const handleSubmit = async (data: CreateWorkOrderInput) => {
    await createMutation.mutateAsync(data);
    router.push(ROUTES.WORK_ORDERS);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{MESSAGES.PAGE.CREATE_TITLE}</CardTitle>
          <CardDescription>Fill in the details to create a new work order</CardDescription>
        </CardHeader>
        <CardContent>
          <WorkOrderForm
            onSubmit={
              handleSubmit as (
                data: CreateWorkOrderInput | import('@/types/work-order.types').UpdateWorkOrderInput
              ) => Promise<void>
            }
            isLoading={createMutation.isPending}
            isEdit={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
