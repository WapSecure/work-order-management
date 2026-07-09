import { cn } from '@/lib/utils/cn';
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div role="status" className="flex items-center justify-center">
      <SpinnerIcon className={cn(sizeClasses[size], className)} aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
