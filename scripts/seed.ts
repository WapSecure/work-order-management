import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentISOString } from '@/lib/utils/date';

// Define types locally to avoid import issues
type WorkOrder = {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Done';
  updatedAt: string;
};

const SAMPLE_DATA: Omit<WorkOrder, 'id'>[] = [
  {
    title: 'Fix login page authentication bug',
    description:
      'Users are unable to login with Google OAuth. Error: "Invalid token" appears in console. Need to update the OAuth configuration and token validation.',
    priority: 'High',
    status: 'In Progress',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Update API documentation',
    description:
      'Add new endpoints for work order management. Update existing examples to reflect the new API structure. Include authentication examples.',
    priority: 'Medium',
    status: 'Open',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Optimize database query performance',
    description:
      'Reduce query execution time for dashboard analytics from 5 seconds to under 500ms. Add indexes and optimize the query structure.',
    priority: 'High',
    status: 'Done',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Design new landing page',
    description:
      'Create a responsive landing page following the new brand guidelines. Include hero section, features, and call-to-action. Mobile-first design.',
    priority: 'Low',
    status: 'Open',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Fix mobile menu navigation',
    description:
      "Mobile hamburger menu not working on iOS devices. The menu doesn't open when clicked. Need to fix event handling and touch support.",
    priority: 'Medium',
    status: 'In Progress',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Implement email notification system',
    description:
      'Send email notifications when work orders are created or updated. Use the existing email service provider. Include templates for different events.',
    priority: 'Low',
    status: 'Open',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Add dark mode support',
    description:
      'Implement dark mode for the entire application. Use CSS variables and theme switching. Ensure all components adapt to both light and dark themes.',
    priority: 'Medium',
    status: 'Done',
    updatedAt: getCurrentISOString(),
  },
  {
    title: 'Security audit and fix',
    description:
      'Conduct a security audit of the application. Fix any vulnerabilities found. Update dependencies to latest secure versions.',
    priority: 'High',
    status: 'Open',
    updatedAt: getCurrentISOString(),
  },
];

async function seed() {
  const dataPath = path.join(process.cwd(), 'data', 'work-orders.json');

  try {
    console.log('🌱 Seeding work orders...');

    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(dataPath), { recursive: true });

    // Generate IDs for all sample data
    const orders: WorkOrder[] = SAMPLE_DATA.map(item => ({
      ...item,
      id: uuidv4(),
    }));

    // Write to file with pretty formatting
    await fs.writeFile(dataPath, JSON.stringify(orders, null, 2));

    console.log(`✅ Successfully seeded ${orders.length} work orders!`);
    console.log(`📁 Data written to: ${dataPath}`);

    // Log summary
    const statusCounts = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log('\n📊 Summary:');
    console.log('Status breakdown:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
  } catch (error) {
    console.error('❌ Failed to seed data:', error);
    process.exit(1);
  }
}

// Run seeding
seed();
