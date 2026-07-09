import { notFound } from 'next/navigation';
import Link from 'next/link';
import { workOrderRepository } from '@/lib/data/work-order.repository';
import { Button } from '@/components/ui/button/Button';
import { Badge } from '@/components/ui/badge/Badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card/Card';
import { PencilIcon, ArrowLeftIcon } from '@/components/icons';
import { formatDate } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/lib/constants/work-order.constants';
import { ROUTES } from '@/lib/constants/routes';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await workOrderRepository.findById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <Link href={ROUTES.WORK_ORDERS}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Work Orders
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{order.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="default" className={cn(PRIORITY_COLORS[order.priority])}>
                {order.priority}
              </Badge>
              <Badge variant="default" className={cn(STATUS_COLORS[order.status])}>
                {order.status}
              </Badge>
            </div>
          </div>
          <Link href={ROUTES.WORK_ORDER_EDIT(order.id)}>
            <Button className="flex items-center gap-2">
              <PencilIcon className="h-4 w-4" />
              Edit Work Order
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Last updated: {formatDate(order.updatedAt)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {order.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {order.id}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
                <dd className="mt-1">
                  <Badge variant="default" className={cn(PRIORITY_COLORS[order.priority])}>
                    {order.priority}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1">
                  <Badge variant="default" className={cn(STATUS_COLORS[order.status])}>
                    {order.status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {formatDate(order.updatedAt)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
