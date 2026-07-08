'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Select } from '@/components/ui/select/Select';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { SearchIcon, CloseIcon } from '@/components/icons';
import { WORK_ORDER } from '@/lib/constants/work-order.constants';
import { useDebounce } from '@/hooks/useDebounce';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  ...WORK_ORDER.STATUSES.map(status => ({
    value: status,
    label: status,
  })),
];

export function WorkOrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams?.get('status') || '';
  const currentSearch = searchParams?.get('search') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`${pathname}?${createQueryString('status', value)}`);
  };

  const handleSearchChange = (value: string) => {
    router.push(`${pathname}?${createQueryString('search', value)}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  // Debounced search to avoid too many URL updates
  const debouncedSearch = useDebounce((value: string) => {
    handleSearchChange(value);
  }, 300);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const hasActiveFilters = currentStatus || currentSearch;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-50">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search by title or description..."
            defaultValue={currentSearch}
            onChange={onSearchInputChange}
            aria-label="Search work orders"
          />
        </div>

        <Select
          className="w-full sm:w-45"
          options={STATUS_OPTIONS}
          value={currentStatus}
          onChange={handleStatusChange}
          aria-label="Filter by status"
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="flex items-center gap-1 whitespace-nowrap"
        >
          <CloseIcon className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
