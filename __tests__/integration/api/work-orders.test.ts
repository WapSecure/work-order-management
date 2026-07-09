import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { workOrderRepository } from '@/lib/data/work-order.repository';

describe('Work Order API Integration', () => {
  beforeAll(async () => {
    // Clear cache before tests
    workOrderRepository.clearCache();
  });

  afterAll(() => {
    workOrderRepository.clearCache();
  });

  it('should create and retrieve a work order', async () => {
    const createData = {
      title: 'Integration Test Order',
      description: 'Testing the API integration',
      priority: 'High' as const,
    };

    const created = await workOrderRepository.create(createData);
    expect(created.id).toBeDefined();
    expect(created.title).toBe(createData.title);
    expect(created.status).toBe('Open');

    const retrieved = await workOrderRepository.findById(created.id);
    expect(retrieved).toEqual(created);
  });

  it('should update a work order', async () => {
    const createData = {
      title: 'Update Test',
      description: 'Testing updates',
      priority: 'Medium' as const,
    };

    const created = await workOrderRepository.create(createData);

    const updated = await workOrderRepository.update(created.id, {
      title: 'Updated Title',
      status: 'In Progress',
    });

    expect(updated?.title).toBe('Updated Title');
    expect(updated?.status).toBe('In Progress');
    expect(updated?.id).toBe(created.id);
  });

  it('should delete a work order', async () => {
    const createData = {
      title: 'Delete Test',
      description: 'Testing deletion',
      priority: 'Low' as const,
    };

    const created = await workOrderRepository.create(createData);

    const deleted = await workOrderRepository.delete(created.id);
    expect(deleted).toBe(true);

    const retrieved = await workOrderRepository.findById(created.id);
    expect(retrieved).toBeNull();
  });

  it('should filter work orders by status', async () => {
    const orders = await workOrderRepository.findAll({ status: 'Open' });
    expect(orders.every(order => order.status === 'Open')).toBe(true);
  });

  it('should search work orders by title', async () => {
    const orders = await workOrderRepository.findAll({ search: 'Integration' });
    expect(orders.some(order => order.title.includes('Integration'))).toBe(true);
  });

  it('should handle non-existent work order', async () => {
    const result = await workOrderRepository.findById('non-existent-id');
    expect(result).toBeNull();
  });
});
