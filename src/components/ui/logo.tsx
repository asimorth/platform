import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className, 
  showText = true,
  textClassName 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg 
          className="w-full h-full" 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Light theme gradient */}
            <linearGradient id="asimorth-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
            </linearGradient>
            
            {/* Dark theme gradient */}
            <linearGradient id="asimorth-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#818cf8', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#22d3ee', stopOpacity: 1}} />
            </linearGradient>
            
            {/* Shadow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main triangular logo shape */}
          <g transform="translate(200,200)">
            {/* Left triangle */}
            <path 
              d="M-80,-60 L-20,-60 L-50,20 Z" 
              fill="url(#asimorth-light)" 
              className="light-logo dark:opacity-0 transition-opacity duration-300"
              filter="url(#glow)"
            />
            
            {/* Right triangle */}
            <path 
              d="M20,-60 L80,-60 L50,20 Z" 
              fill="url(#asimorth-light)" 
              className="light-logo dark:opacity-0 transition-opacity duration-300"
              filter="url(#glow)"
            />
            
            {/* Center connecting triangle */}
            <path 
              d="M-50,20 L50,20 L0,80 Z" 
              fill="url(#asimorth-light)" 
              className="light-logo dark:opacity-0 transition-opacity duration-300"
              filter="url(#glow)"
            />
            
            {/* Interlocking center piece */}
            <path 
              d="M-20,-60 L20,-60 L0,-20 Z" 
              fill="url(#asimorth-light)" 
              className="light-logo dark:opacity-0 transition-opacity duration-300"
              filter="url(#glow)"
            />
          </g>
          
          {/* Dark theme version */}
          <g transform="translate(200,200)" className="opacity-0 dark:opacity-100 transition-opacity duration-300">
            {/* Left triangle */}
            <path 
              d="M-80,-60 L-20,-60 L-50,20 Z" 
              fill="url(#asimorth-dark)" 
              filter="url(#glow)"
            />
            
            {/* Right triangle */}
            <path 
              d="M20,-60 L80,-60 L50,20 Z" 
              fill="url(#asimorth-dark)" 
              filter="url(#glow)"
            />
            
            {/* Center connecting triangle */}
            <path 
              d="M-50,20 L50,20 L0,80 Z" 
              fill="url(#asimorth-dark)" 
              filter="url(#glow)"
            />
            
            {/* Interlocking center piece */}
            <path 
              d="M-20,-60 L20,-60 L0,-20 Z" 
              fill="url(#asimorth-dark)" 
              filter="url(#glow)"
            />
          </g>
        </svg>
      </div>
      
      {showText && (
        <span 
          className={cn(
            "font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 transition-all duration-300",
            textSizeClasses[size],
            textClassName
          )}
        >
          Asimorth
        </span>
      )}
    </div>
  );
};

export default Logo; 