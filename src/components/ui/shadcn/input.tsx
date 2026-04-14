import * as React from 'react';

import { cn } from '@/lib/utils/cn.utils';

function Input({
  className,
  type,
  prefixIcon,
  suffixIcon,
  ...props
}: React.ComponentProps<'input'> & { prefixIcon?: React.ReactNode; suffixIcon?: React.ReactNode }) {
  return (
    <div
      className={cn(
        'border-input flex h-9 w-full items-center rounded-lg border bg-transparent px-2 py-5 transition-colors',
        'focus-within:border-ring focus-within:ring-primary text-muted-foreground focus-within:text-primary-400 focus-within:ring-1'
      )}
    >
      {prefixIcon && <span className="mr-2 flex shrink-0 items-center">{prefixIcon}</span>}

      <input
        type={type}
        data-slot="input"
        className={cn(
          'placeholder:text-muted-foreground text-foreground min-w-0 flex-1 bg-transparent text-sm outline-none',
          className
        )}
        {...props}
      />
      {suffixIcon && <span className="ml-2 flex shrink-0 items-center">{suffixIcon}</span>}
    </div>
  );
}

export { Input };
