import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'custom';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  size = 'md'
}) => {
  const baseClasses = "bg-primary text-white rounded-lg transition-colors font-medium";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-6 py-2 text-base h-9",
    custom: "px-2 py-2 text-base h-9"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      style={{ color: 'white' }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
