import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
  formatDate,
  formatRelativeTime,
  getCurrentISOString,
  isValidISODate,
} from '@/lib/utils/date';

describe('Date Utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T10:30:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should format date correctly', () => {
    const date = '2024-01-15T10:30:00Z';
    expect(formatDate(date)).toBe('Jan 15, 2024 10:30');
  });

  it('should format date from Date object', () => {
    const date = new Date('2024-01-15T10:30:00Z');
    expect(formatDate(date)).toBe('Jan 15, 2024 10:30');
  });

  it('should return "Invalid date" for invalid input', () => {
    expect(formatDate('invalid')).toBe('Invalid date');
    expect(formatDate('')).toBe('Invalid date');
  });

  it('should return relative time', () => {
    const past = new Date(Date.now() - 60000);
    expect(formatRelativeTime(past.toISOString())).toContain('minute');
  });

  it('should handle future dates for relative time', () => {
    const future = new Date(Date.now() + 60000);
    expect(formatRelativeTime(future.toISOString())).toContain('minute');
  });

  it('should return current ISO string', () => {
    const iso = getCurrentISOString();
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('should validate ISO date strings', () => {
    expect(isValidISODate('2024-01-15T10:30:00Z')).toBe(true);
    expect(isValidISODate('2024-01-15')).toBe(true);
    expect(isValidISODate('invalid')).toBe(false);
    expect(isValidISODate('')).toBe(false);
  });
});
