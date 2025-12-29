"use client";

import React from 'react';
// Importing a placeholder icon just in case you need it, as requested
import { Globe } from 'lucide-react'; 

const Button = ({ text, onClick, icon: Icon, variant = 'default', isSelected = false }) => {
  const baseClasses = `
  group inline-flex items-center justify-center gap-2
  font-serif font-medium tracking-tight
  transition-all duration-300 ease-out
  hover:-translate-y-0.5 active:scale-95
  disabled:opacity-50
`;

const variantClasses = {
  default: `
    px-5 py-2 text-sm rounded-full
    border border-[#C26D48] bg-white text-[#C26D48]
    hover:bg-[#C26D48] hover:text-white
    shadow-sm hover:shadow-md hover:shadow-[#C26D48]/20
  `
};

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default}`}
    >
      {/* If an icon is passed, render it. Using Lucide-react. */}
      {Icon && <Icon size={20} />}
      
      <span>{text}</span>
    </button>
  );
};

export default Button;