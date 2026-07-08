import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { WORK_ORDER } from '@/lib/constants/work-order.constants';

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return format(dateObj, WORK_ORDER.DATE_FORMAT);
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Get current ISO timestamp
 */
export function getCurrentISOString(): string {
  return new Date().toISOString();
}

/**
 * Check if a string is a valid ISO date
 */
export function isValidISODate(date: string): boolean {
  try {
    const parsed = parseISO(date);
    return isValid(parsed);
  } catch {
    return false;
  }
}
