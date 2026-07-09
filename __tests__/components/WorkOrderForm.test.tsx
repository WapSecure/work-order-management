import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkOrderForm } from '@/app/work-orders/components/WorkOrderForm';

// Mock the useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
  }),
}));

describe('WorkOrderForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields correctly', () => {
    render(<WorkOrderForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create work order/i })).toBeInTheDocument();
  });

  it('should render edit mode with status field', () => {
    const initialData = {
      id: '1',
      title: 'Test',
      description: 'Test description',
      priority: 'Medium' as const,
      status: 'Open' as const,
      updatedAt: new Date().toISOString(),
    };

    render(<WorkOrderForm initialData={initialData} onSubmit={mockOnSubmit} isEdit={true} />);

    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update work order/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<WorkOrderForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /create work order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('should submit form with valid data', async () => {
    render(<WorkOrderForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Work Order' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test description' },
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: 'High' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create work order/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Work Order',
        description: 'This is a test description',
        priority: 'High',
      });
    });
  });

  it('should display validation errors', async () => {
    const error = {
      fieldErrors: {
        title: ['Title must be at least 2 characters'],
      },
    };
    const onSubmit = vi.fn().mockRejectedValue(error);

    render(<WorkOrderForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'A' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test description' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create work order/i }));

    await waitFor(() => {
      expect(screen.getByText(/title must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    const mockOnCancel = vi.fn();
    render(<WorkOrderForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
