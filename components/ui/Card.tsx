import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'highlight' | 'alert';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  icon,
  onClick,
  variant = 'default'
}) => {
  const baseStyles = "bg-white dark:bg-slate-800 rounded-xl shadow-sm border transition-all duration-200";

  const variants = {
    default: "border-slate-100 dark:border-slate-700 hover:shadow-md",
    highlight: "border-teal-100 dark:border-teal-900/50 bg-teal-50/30 dark:bg-teal-900/10 hover:shadow-md",
    alert: "border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 hover:shadow-md"
  };

  const clickableStyles = onClick ? "cursor-pointer active:scale-[0.99]" : "";

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${clickableStyles} ${className} p-4`}
      onClick={onClick}
    >
      {(title || icon) && (
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {icon && <div className="text-teal-600 dark:text-teal-400">{icon}</div>}
            <div>
              {title && <h3 className="font-semibold text-slate-800 dark:text-white leading-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="text-sm text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
};
