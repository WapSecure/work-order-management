import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  WorkOrder,
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
  WorkOrderFilters,
} from '@/types/work-order.types';
import { WORK_ORDER } from '@/lib/constants/work-order.constants';
import { getCurrentISOString } from '@/lib/utils/date';

const DATA_PATH = path.join(process.cwd(), 'data', 'work-orders.json');

export class WorkOrderRepository {
  private static instance: WorkOrderRepository;
  private cache: WorkOrder[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = WORK_ORDER.CACHE_TTL;

  private constructor() {}

  static getInstance(): WorkOrderRepository {
    if (!WorkOrderRepository.instance) {
      WorkOrderRepository.instance = new WorkOrderRepository();
    }
    return WorkOrderRepository.instance;
  }

  private async readData(): Promise<WorkOrder[]> {
    try {
      const data = await fs.readFile(DATA_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await this.initializeDataFile();
        return [];
      }
      console.error('Failed to read work orders data:', error);
      throw new Error('Failed to read work orders data');
    }
  }

  private async initializeDataFile(): Promise<void> {
    const dir = path.dirname(DATA_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify([], null, 2));
  }

  private async writeData(orders: WorkOrder[]): Promise<void> {
    await fs.writeFile(DATA_PATH, JSON.stringify(orders, null, 2));
    this.cache = null;
    this.cacheTimestamp = 0;
  }

  private async getCachedData(): Promise<WorkOrder[]> {
    const now = Date.now();
    if (this.cache && now - this.cacheTimestamp < this.CACHE_TTL) {
      return this.cache;
    }

    this.cache = await this.readData();
    this.cacheTimestamp = now;
    return this.cache;
  }

  async findAll(filters?: WorkOrderFilters): Promise<WorkOrder[]> {
    const orders = await this.getCachedData();

    if (!filters || (!filters.status && !filters.search)) {
      return this.sortByUpdatedAt(orders);
    }

    let filtered = [...orders];

    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        order =>
          order.title.toLowerCase().includes(searchLower) ||
          order.description.toLowerCase().includes(searchLower)
      );
    }

    return this.sortByUpdatedAt(filtered);
  }

  async findById(id: string): Promise<WorkOrder | null> {
    const orders = await this.getCachedData();
    return orders.find(order => order.id === id) || null;
  }

  async create(input: CreateWorkOrderInput): Promise<WorkOrder> {
    const orders = await this.getCachedData();

    const newOrder: WorkOrder = {
      id: uuidv4(),
      ...input,
      status: WORK_ORDER.DEFAULT_STATUS,
      updatedAt: getCurrentISOString(),
    };

    orders.push(newOrder);
    await this.writeData(orders);
    return newOrder;
  }

  async update(id: string, input: UpdateWorkOrderInput): Promise<WorkOrder | null> {
    const orders = await this.getCachedData();
    const index = orders.findIndex(order => order.id === id);

    if (index === -1) return null;

    const updatedOrder = {
      ...orders[index],
      ...input,
      updatedAt: getCurrentISOString(),
    };

    orders[index] = updatedOrder;
    await this.writeData(orders);
    return updatedOrder;
  }

  async delete(id: string): Promise<boolean> {
    const orders = await this.getCachedData();
    const filtered = orders.filter(order => order.id !== id);

    if (filtered.length === orders.length) return false;

    await this.writeData(filtered);
    return true;
  }

  private sortByUpdatedAt(orders: WorkOrder[]): WorkOrder[] {
    return orders.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  // Utility method to clear cache (useful for testing)
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }
}

export const workOrderRepository = WorkOrderRepository.getInstance();
