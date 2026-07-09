import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validateData, formatValidationErrors } from '@/lib/utils/validation';

const testSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(18),
});

describe('Validation Utilities', () => {
  describe('validateData', () => {
    it('should validate data successfully', () => {
      const result = validateData(testSchema, { name: 'John', age: 25 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ name: 'John', age: 25 });
      }
    });

    it('should return errors for invalid data', () => {
      const result = validateData(testSchema, { name: 'J', age: 16 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveProperty('name');
        expect(result.errors).toHaveProperty('age');
      }
    });

    it('should handle missing fields', () => {
      const result = validateData(testSchema, { name: 'John' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveProperty('age');
      }
    });
  });

  describe('formatValidationErrors', () => {
    it('should format validation errors', () => {
      const errors = {
        name: ['Name is required'],
        age: ['Age must be at least 18'],
      };
      const formatted = formatValidationErrors(errors);
      expect(formatted).toContain('name: Name is required');
      expect(formatted).toContain('age: Age must be at least 18');
    });

    it('should handle empty errors', () => {
      expect(formatValidationErrors({})).toBe('Validation failed');
    });
  });
});
