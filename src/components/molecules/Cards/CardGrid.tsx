"use client";

import React from "react";

interface CardGridProps {
  children: React.ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

const CardGrid: React.FC<CardGridProps> = ({ 
  children, 
  cols = { sm: 1, md: 2, lg: 2, xl: 3 },
  gap = 6,
  className = ""
}) => {
  const getGridCols = () => {
    const colClasses = [];
    
    if (cols.sm) colClasses.push(`grid-cols-${cols.sm}`);
    if (cols.md) colClasses.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) colClasses.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) colClasses.push(`xl:grid-cols-${cols.xl}`);
    
    return colClasses.join(' ');
  };

  const getGapClass = () => {
    switch (gap) {
      case 2: return 'gap-2';
      case 3: return 'gap-3';
      case 4: return 'gap-4';
      case 5: return 'gap-5';
      case 6: return 'gap-6';
      case 7: return 'gap-7';
      case 8: return 'gap-8';
      default: return 'gap-6';
    }
  };

  return (
    <div className={`grid ${getGridCols()} ${getGapClass()} ${className}`}>
      {children}
    </div>
  );
};

export default CardGrid;