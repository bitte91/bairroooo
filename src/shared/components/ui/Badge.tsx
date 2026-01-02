import React from 'react';
import { cn } from '../../../../src/lib/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'active';
    size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'secondary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-primary-foreground',
            secondary: 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20',
            active: 'bg-secondary text-secondary-foreground shadow-sm',
            outline: 'border border-border text-foreground',
            ghost: 'bg-muted text-muted-foreground',
        };

        const sizes = {
            sm: 'px-2.5 py-0.5 text-xs',
            md: 'px-3 py-1 text-sm',
        };

        const isInteractive = !!props.onClick;

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                props.onClick?.(e as any);
            }
            props.onKeyDown?.(e);
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    variants[variant],
                    sizes[size],
                    isInteractive && 'cursor-pointer hover:opacity-80',
                    className
                )}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onKeyDown={handleKeyDown}
                {...props}
            />
        );
    }
);
Badge.displayName = 'Badge';
