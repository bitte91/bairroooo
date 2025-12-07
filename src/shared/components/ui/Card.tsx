import React from 'react';
import { cn } from '../../../../src/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'ghost';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
        const variants = {
            default: 'bg-card text-card-foreground shadow-sm border border-border',
            outline: 'border border-border bg-transparent',
            ghost: 'bg-transparent border-none shadow-none',
        };

        const paddings = {
            none: 'p-0',
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-6',
        };

        return (
            <div
                ref={ref}
                className={cn('rounded-xl', variants[variant], paddings[padding], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';
