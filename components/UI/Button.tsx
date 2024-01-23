'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'rounded-[20px] p-2 text-[13px] font-bold leading-[176.923%] outline-none duration-200 disabled:opacity-50 capitalize',
  {
    variants: {
      variant: {
        primary:
          'bg-primaryPurple text-primaryWhite hover:bg-primaryPurpleHover',
        secondary:
          'bg-primaryLightPurple text-primaryPurple hover:bg-primaryLightPurpleHover dark:bg-primaryWhite',
        destructive: 'bg-primaryRed text-primaryWhite hover:bg-primaryRedHover',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  large?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, large, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className }),
          large && 'button-large-text rounded-3xl px-6 py-[14px]',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
