import { notFound } from 'next/navigation';
import { workOrderRepository } from '@/lib/data/work-order.repository';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card/Card';
import { EditWorkOrderForm } from './EditWorkOrderForm';
import { MESSAGES } from '@/lib/constants/work-order.constants';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EditWorkOrderPage({ params }: PageProps) {
  const { id } = await params;

  const order = await workOrderRepository.findById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{MESSAGES.PAGE.EDIT_TITLE}</CardTitle>
          <CardDescription>Update the details of this work order</CardDescription>
        </CardHeader>
        <CardContent>
          <EditWorkOrderForm initialData={order} />
        </CardContent>
      </Card>
    </div>
  );
}
