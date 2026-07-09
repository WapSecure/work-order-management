'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState, useRef, useEffect } from 'react';
import { Select } from '@/components/ui/select/Select';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { SearchIcon, CloseIcon } from '@/components/icons';
import { WORK_ORDER, MESSAGES } from '@/lib/constants/work-order.constants';

const STATUS_OPTIONS = [
  { value: '', label: MESSAGES.FILTERS.ALL_STATUSES },
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

  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const urlParams = new URLSearchParams(searchParams?.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          urlParams.set(key, value);
        } else {
          urlParams.delete(key);
        }
      });
      const queryString = urlParams.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
    },
    [router, pathname, searchParams]
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      updateURL({ status: value });
    },
    [updateURL]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (value.length === 0) {
        updateURL({ search: '' });
        return;
      }

      // Only search if minimum characters met
      if (value.length >= WORK_ORDER.SEARCH.MIN_CHARS) {
        debounceTimerRef.current = setTimeout(() => {
          updateURL({ search: value });
        }, WORK_ORDER.SEARCH.DEBOUNCE_MS);
      }
    },
    [updateURL]
  );

  const handleClearFilters = useCallback(() => {
    setSearchValue('');
    router.push(pathname);
  }, [router, pathname]);

  const hasActiveFilters = Boolean(currentStatus || currentSearch);
  const showMinCharsHint =
    searchValue.length > 0 && searchValue.length < WORK_ORDER.SEARCH.MIN_CHARS;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-50">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder={MESSAGES.FILTERS.SEARCH_PLACEHOLDER}
            value={searchValue}
            onChange={handleSearchChange}
            aria-label="Search work orders"
          />
          {showMinCharsHint && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {MESSAGES.FILTERS.SEARCH_MIN_CHARS(WORK_ORDER.SEARCH.MIN_CHARS)}
            </p>
          )}
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
          {MESSAGES.FILTERS.CLEAR_FILTERS}
        </Button>
      )}
    </div>
  );
}
