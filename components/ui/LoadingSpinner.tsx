import React from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  message = 'Cargando...',
  children,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`transition-all duration-300 ${
          isLoading ? 'blur-sm' : ''
        }`}
      >
        {children}
      </div>
      
      {/* Spinner de loading con blur */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-xl border border-gray-200">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#3D5B6A] rounded-full animate-spin"></div>
              <div 
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#3D5B6A] rounded-full animate-spin" 
                style={{ animationDelay: '-0.5s' }}
              ></div>
            </div>
            <div className="text-base font-medium text-gray-800">
              {message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
