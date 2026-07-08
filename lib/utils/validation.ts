import { ZodSchema, ZodError } from 'zod';

/**
 * Validate data against a Zod schema and return typed result
 */
export function validateData<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string[]> = {};

      for (const issue of error.issues) {
        const path = issue.path.join('.') || 'root';
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      }

      return { success: false, errors };
    }
    throw error;
  }
}

/**
 * Format Zod validation errors for display
 */
export function formatValidationErrors(errors: Record<string, string[]>): string {
  const entries = Object.entries(errors);
  if (entries.length === 0) return 'Validation failed';

  return entries.map(([field, messages]) => `${field}: ${messages.join(', ')}`).join('; ');
}
