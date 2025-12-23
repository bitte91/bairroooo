import React, { useId } from 'react';
import { cn } from '../../../../src/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-1 cursor-pointer"
          >
            {label}
          </label>
        )}
        <div className="relative">
            {leftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {leftIcon}
                </div>
            )}
            <input
              ref={ref}
              id={inputId}
              aria-describedby={cn(error && errorId, (!error && helperText) && helperId) || undefined}
              aria-invalid={!!error}
              className={cn(
                'flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                leftIcon && 'pl-10',
                rightIcon && 'pr-10',
                error && 'border-destructive focus-visible:ring-destructive',
                className
              )}
              {...props}
            />
            {rightIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {rightIcon}
                </div>
            )}
        </div>
        {helperText && !error && (
            <p id={helperId} className="mt-1 text-xs text-muted-foreground">
                {helperText}
            </p>
        )}
        {error && <p id={errorId} className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
