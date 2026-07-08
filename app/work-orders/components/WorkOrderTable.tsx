'use client';

import Link from 'next/link';
import { WorkOrder } from '@/types/work-order.types';
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { formatRelativeTime } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';
import { PRIORITY_COLORS, STATUS_COLORS, MESSAGES } from '@/lib/constants/work-order.constants';
import { ROUTES } from '@/lib/constants/routes';

interface WorkOrderTableProps {
  orders: WorkOrder[];
  onDelete: (id: string) => void;
  isDeleting?: string | null;
}

export function WorkOrderTable({ orders, onDelete, isDeleting }: WorkOrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{MESSAGES.TABLE.NO_ORDERS}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          {MESSAGES.TABLE.CREATE_FIRST}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {MESSAGES.TABLE.TITLE}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {MESSAGES.TABLE.PRIORITY}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {MESSAGES.TABLE.STATUS}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {MESSAGES.TABLE.UPDATED}
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {MESSAGES.TABLE.ACTIONS}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map(order => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-4 py-3">
                <Link
                  href={ROUTES.WORK_ORDER(order.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  {order.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Badge variant="default" className={cn(PRIORITY_COLORS[order.priority])}>
                  {order.priority}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant="default" className={cn(STATUS_COLORS[order.status])}>
                  {order.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {formatRelativeTime(order.updatedAt)}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={ROUTES.WORK_ORDER_EDIT(order.id)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      aria-label={`Edit ${order.title}`}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50"
                    onClick={() => onDelete(order.id)}
                    disabled={isDeleting === order.id}
                    aria-label={`Delete ${order.title}`}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
