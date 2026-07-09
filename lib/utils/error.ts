import { ERROR_MESSAGES } from '@/lib/constants/api';
import { ApiError } from '@/types';

/**
 * Parse error response and return a user-friendly message
 */
export function parseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    if (err.message && typeof err.message === 'string') {
      return err.message;
    }
    if (err.error && typeof err.error === 'string') {
      return err.error;
    }
  }

  return ERROR_MESSAGES.DEFAULT;
}

/**
 * Create an ApiError from a response
 */
export function createApiError(response: Response, data?: unknown): ApiError {
  const error: ApiError = {
    message: ERROR_MESSAGES.DEFAULT,
    status: response.status,
  };

  if (data && typeof data === 'object') {
    const errData = data as Record<string, unknown>;
    if (errData.error && typeof errData.error === 'string') {
      error.message = errData.error;
    }
    if (errData.message && typeof errData.message === 'string') {
      error.message = errData.message;
    }
    if (errData.fieldErrors && typeof errData.fieldErrors === 'object') {
      error.fieldErrors = errData.fieldErrors as Record<string, string[]>;
    }
  }

  return error;
}

/**
 * Check if an error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    return !!err.fieldErrors;
  }
  return false;
}
