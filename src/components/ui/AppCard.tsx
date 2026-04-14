import { cn } from '@/lib/utils/cn.utils';
import { HTMLAttributes, ReactNode } from 'react';

interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  showShadow?: boolean;
}

// card yang dipakai diluaran
export function MainCard({ children, className, showShadow }: AppCardProps) {
  return (
    <div
      className={cn(
        cn(
          showShadow ? 'shadow-primary/5 shadow-lg' : 'shadow-none',
          'border-main-card-border bg-main-card relative flex w-fit max-w-7xl flex-row gap-10 rounded-xl border p-4'
        ),
        className
      )}
    >
      {children}
    </div>
  );
}

// card yang dipppakai biasanya dalam main card
export function SecondaryCard({ children, className, ...props }: AppCardProps) {
  return (
    <div
      className={cn(
        'border-secondary-card-border bg-secondary-card w-fit rounded-lg border p-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
