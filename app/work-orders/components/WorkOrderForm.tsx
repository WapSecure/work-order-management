'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WorkOrder, CreateWorkOrderInput, UpdateWorkOrderInput } from '@/types/work-order.types';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Select } from '@/components/ui/select/Select';
import { WORK_ORDER, MESSAGES } from '@/lib/constants/work-order.constants';

interface WorkOrderFormProps {
  initialData?: WorkOrder;
  onSubmit: (data: CreateWorkOrderInput | UpdateWorkOrderInput) => Promise<void>;
  isLoading?: boolean;
  isEdit?: boolean;
  onCancel?: () => void;
}

interface FormData {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Done';
}

const PRIORITY_OPTIONS = WORK_ORDER.PRIORITIES.map(priority => ({
  value: priority,
  label: priority,
}));

const STATUS_OPTIONS = WORK_ORDER.STATUSES.map(status => ({
  value: status,
  label: status,
}));

export function WorkOrderForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEdit = false,
  onCancel,
}: WorkOrderFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'Medium',
    status: initialData?.status || WORK_ORDER.DEFAULT_STATUS,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    try {
      const submitData = isEdit
        ? {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
          }
        : {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
          };
      await onSubmit(submitData);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'fieldErrors' in error) {
        const errors: Record<string, string> = {};
        const fieldErrors = error.fieldErrors as Record<string, string[]>;
        Object.entries(fieldErrors).forEach(([key, value]) => {
          errors[key] = Array.isArray(value) ? value[0] : value;
        });
        setFieldErrors(errors);
        setSubmitError(MESSAGES.FORM.VALIDATION_ERROR);
      } else {
        const errorMessage = error instanceof Error ? error.message : MESSAGES.FORM.SUBMIT_ERROR;
        setSubmitError(errorMessage);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitError && (
        <div
          className="rounded-md bg-red-50 dark:bg-red-950/50 p-4 text-sm text-red-700 dark:text-red-400"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <Input
        id="title"
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        error={fieldErrors.title}
        required
        maxLength={WORK_ORDER.TITLE.MAX_LENGTH}
        disabled={isLoading}
        placeholder={WORK_ORDER.TITLE.PLACEHOLDER}
        autoFocus
      />

      <Textarea
        id="description"
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        error={fieldErrors.description}
        required
        maxLength={WORK_ORDER.DESCRIPTION.MAX_LENGTH}
        disabled={isLoading}
        placeholder={WORK_ORDER.DESCRIPTION.PLACEHOLDER}
        rows={4}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="priority"
          name="priority"
          label="Priority"
          value={formData.priority}
          onChange={handleChange}
          options={PRIORITY_OPTIONS}
          error={fieldErrors.priority}
          disabled={isLoading}
          required
        />

        {isEdit && (
          <Select
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
            disabled={isLoading}
            required
          />
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {MESSAGES.FORM.CANCEL}
        </Button>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading
            ? MESSAGES.FORM.SAVING
            : isEdit
              ? MESSAGES.FORM.UPDATE_BUTTON
              : MESSAGES.FORM.CREATE_BUTTON}
        </Button>
      </div>
    </form>
  );
}
