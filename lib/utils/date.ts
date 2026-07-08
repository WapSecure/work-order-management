import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export const DATE_FORMAT = 'MMM d, yyyy HH:mm';

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return format(dateObj, DATE_FORMAT);
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
