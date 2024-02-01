'use client';

import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { FaCheck } from 'react-icons/fa';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'ring-offset-background data-[state=checked]:text-primary-foreground border-primary dark:bg-midnightBlue peer relative h-4 w-4 shrink-0 rounded-sm border border-primaryBorder bg-white focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primaryPurple data-[state=checked]:bg-primaryPurple dark:bg-primaryDarkGrey data-[state=checked]:dark:border-primaryPurple data-[state=checked]:dark:bg-primaryPurple',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <FaCheck className="text-[8px] font-bold text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
