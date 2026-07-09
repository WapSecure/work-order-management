import { describe, it, expect } from 'vitest';
import { truncate, capitalize, slugify, isEmptyString } from '@/lib/utils/string';

describe('String Utilities', () => {
  describe('truncate', () => {
    it('should truncate string correctly', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hello World', 11)).toBe('Hello World');
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(truncate('', 5)).toBe('');
      expect(truncate('', 0)).toBe('');
    });
  });

  describe('capitalize', () => {
    it('should capitalize string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('slugify', () => {
    it('should create slug from string', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('  Hello  World  ')).toBe('hello-world');
      expect(slugify('Hello-World')).toBe('hello-world');
      expect(slugify('Hello_World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello!@#$%^&*()World')).toBe('hello-world');
      expect(slugify('Café')).toBe('cafe');
    });
  });

  describe('isEmptyString', () => {
    it('should check if string is empty', () => {
      expect(isEmptyString('')).toBe(true);
      expect(isEmptyString('  ')).toBe(true);
      expect(isEmptyString('hello')).toBe(false);
      expect(isEmptyString(' hello ')).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(isEmptyString(null)).toBe(true);
      expect(isEmptyString(undefined)).toBe(true);
    });
  });
});
