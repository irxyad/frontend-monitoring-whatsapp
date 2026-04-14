import { cn } from '@/lib/utils/cn.utils';
import * as React from 'react';

function Textarea({
  className,
  prefixIcon,
  suffixIcon,
  ...props
}: React.ComponentProps<'textarea'> & {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'border-input flex w-full items-start rounded-lg border bg-transparent px-2 py-2 transition-colors',
        'focus-within:border-ring focus-within:ring-primary text-muted-foreground focus-within:text-primary-400 focus-within:ring-1'
      )}
    >
      {prefixIcon && <span className="mt-0.5 mr-2 flex shrink-0 items-center">{prefixIcon}</span>}

      <textarea
        data-slot="textarea"
        className={cn(
          'placeholder:text-muted-foreground text-foreground field-sizing-content min-h-16 min-w-0 flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...props}
      />

      {suffixIcon && <span className="mt-0.5 ml-2 flex shrink-0 items-center">{suffixIcon}</span>}
    </div>
  );
}

export { Textarea };
