import React from 'react';
import { cn } from '../../../lib/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  ...props
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variants[variant],
        className
      )}
      style={{
        width: width || '100%',
        height: height || (variant === 'text' ? '1em' : '100%'),
      }}
      {...props}
    />
  );
};

// Skeleton para Card de Notícia
export const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="overflow-hidden flex flex-col border border-border rounded-xl shadow-sm bg-card p-0">
      <Skeleton className="h-40 w-full rounded-t-xl rounded-b-none" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" height="12px" width="30%" />
        <Skeleton variant="text" height="20px" width="90%" />
        <Skeleton variant="text" height="20px" width="70%" />
        <Skeleton variant="text" height="14px" width="40%" />
      </div>
    </div>
  );
};

// Skeleton para Card de Evento
export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="p-3 flex gap-3 border border-border rounded-xl shadow-sm bg-card">
      <Skeleton className="h-16 w-16 shrink-0" variant="rectangular" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height="16px" width="80%" />
        <Skeleton variant="text" height="12px" width="50%" />
        <Skeleton variant="text" height="12px" width="60%" />
      </div>
      <div className="flex flex-col gap-2 justify-center shrink-0">
        <Skeleton className="h-8 w-8" variant="circular" />
        <Skeleton className="h-8 w-8" variant="circular" />
      </div>
    </div>
  );
};

// Skeleton para Card de Comércio (novo layout vertical)
export const BusinessCardSkeleton: React.FC = () => {
  return (
    <div className="overflow-hidden border border-border rounded-xl shadow-sm bg-card">
      <Skeleton className="h-48 w-full rounded-t-xl rounded-b-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton variant="text" height="20px" width="60%" />
          <Skeleton variant="text" height="16px" width="20%" />
        </div>
        <Skeleton variant="text" height="12px" width="30%" />
        <Skeleton variant="text" height="14px" width="80%" />
        <Skeleton variant="text" height="14px" width="50%" />
        <div className="flex gap-2 mt-4">
          <Skeleton height="32px" className="flex-1" />
          <Skeleton height="32px" className="flex-1" />
        </div>
      </div>
    </div>
  );
};
