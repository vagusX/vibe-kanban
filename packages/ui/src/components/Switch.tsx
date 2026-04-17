import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '../lib/cn';

const switchRootClassName =
  'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full ' +
  'border-2 border-transparent shadow-sm transition-colors ' +
  'data-[state=checked]:bg-[hsl(var(--primary))] data-[state=unchecked]:bg-border ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const switchThumbClassName =
  'pointer-events-none block h-4 w-4 rounded-full bg-primary shadow-lg ring-0 ' +
  'transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(switchRootClassName, className)}
    {...props}
  >
    <SwitchPrimitives.Thumb className={switchThumbClassName} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
