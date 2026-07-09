import Link from 'next/link';
import { Button } from '@/components/ui/button/Button';
import { ROUTES } from '@/lib/constants/routes';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The work order you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="mt-6">
          <Link href={ROUTES.WORK_ORDERS}>
            <Button>Back to Work Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
