import React from 'react';
import { cn } from '../../../../src/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
        const variants = {
            default: 'bg-card text-card-foreground shadow-sm border border-border hover:shadow-md transition-shadow duration-300',
            elevated: 'bg-card text-card-foreground shadow-md border-none hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
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
