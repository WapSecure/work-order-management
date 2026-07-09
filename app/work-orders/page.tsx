import { Suspense } from 'react';
import { workOrderRepository } from '@/lib/data/work-order.repository';
import { WorkOrderList } from './components/WorkOrderList';
import { WorkOrderFilters } from './components/WorkOrderFilters';
import { WorkOrderFilters as Filters } from '@/types/work-order.types';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { MESSAGES, WORK_ORDER } from '@/lib/constants/work-order.constants';
import { WorkOrdersProvider } from './components/WorkOrdersProvider';

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkOrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters: Filters = {};

  if (params.status && ['Open', 'In Progress', 'Done'].includes(params.status)) {
    filters.status = params.status as Filters['status'];
  }

  if (params.search && params.search.length >= WORK_ORDER.SEARCH.MIN_CHARS) {
    filters.search = params.search;
  }

  const initialOrders = await workOrderRepository.findAll(filters);

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {MESSAGES.PAGE.TITLE}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your work orders efficiently
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <Suspense
            fallback={<div className="animate-pulse h-10 bg-gray-100 dark:bg-gray-800 rounded" />}
          >
            <WorkOrderFilters />
          </Suspense>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <WorkOrdersProvider initialOrders={initialOrders} filters={filters}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              }
            >
              <WorkOrderList />
            </Suspense>
          </WorkOrdersProvider>
        </div>
      </div>
    </div>
  );
}
