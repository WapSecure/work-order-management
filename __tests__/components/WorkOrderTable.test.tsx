import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkOrderTable } from '@/app/work-orders/components/WorkOrderTable';

const mockOrders = [
  {
    id: '1',
    title: 'Test Order 1',
    description: 'Description 1',
    priority: 'High' as const,
    status: 'Open' as const,
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Test Order 2',
    description: 'Description 2',
    priority: 'Medium' as const,
    status: 'In Progress' as const,
    updatedAt: new Date().toISOString(),
  },
];

describe('WorkOrderTable', () => {
  it('should render work orders correctly', () => {
    const onDelete = vi.fn();
    render(<WorkOrderTable orders={mockOrders} onDelete={onDelete} />);

    expect(screen.getByText('Test Order 1')).toBeInTheDocument();
    expect(screen.getByText('Test Order 2')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('should show empty state when no orders', () => {
    const onDelete = vi.fn();
    render(<WorkOrderTable orders={[]} onDelete={onDelete} />);

    expect(screen.getByText(/no work orders found/i)).toBeInTheDocument();
    expect(screen.getByText(/create your first work order/i)).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<WorkOrderTable orders={mockOrders} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith('1', 'Test Order 1');
  });

  it('should disable delete button when deleting', () => {
    const onDelete = vi.fn();
    render(<WorkOrderTable orders={mockOrders} onDelete={onDelete} isDeleting="1" />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons[0]).toBeDisabled();
    expect(deleteButtons[1]).not.toBeDisabled();
  });

  it('should render links correctly', () => {
    const onDelete = vi.fn();
    render(<WorkOrderTable orders={mockOrders} onDelete={onDelete} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/work-orders/1');
    expect(links[1]).toHaveAttribute('href', '/work-orders/2');
  });
});
