import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] placeholder:text-gray-300 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm native:h-10',
        md: 'h-10 px-3 text-base native:h-12',
        default: 'h-10 px-3 text-base native:h-12',
        lg: 'h-12 px-4 text-lg native:h-14',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface CustomInputProps extends TextInputProps, VariantProps<typeof inputVariants> {
  placeholderClassName?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, CustomInputProps>(
  ({ className, size = 'default', placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          inputVariants({ size }),
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
