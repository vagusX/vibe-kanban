import * as React from 'react';

import { cn } from '../lib/cn';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-border bg-primary px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-low focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
