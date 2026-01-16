'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all cursor-pointer disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:bg-blue-400 disabled:shadow-none',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white shadow-lg shadow-slate-600/30 hover:shadow-xl hover:shadow-slate-600/40 disabled:bg-slate-400 disabled:shadow-none',
    outline: 'border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:text-slate-400 disabled:hover:bg-transparent'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}