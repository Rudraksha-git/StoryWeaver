"use client";

import React from 'react';
// Importing a placeholder icon just in case you need it, as requested
import { Globe } from 'lucide-react'; 

const Button = ({ text, onClick, icon: Icon, variant = 'default', isSelected = false }) => {
  const baseClasses = `
    group
    flex items-center justify-center gap-2
    font-serif text-xl font-medium tracking-wide
    transition-all duration-300 ease-in-out
    active:scale-95
  `;

  const variantClasses = {
    default: `
      px-8 py-3
      rounded-full
      border border-[#C26D48]
      bg-[#FFFFFF]
      text-[#C26D48]
      hover:bg-[#C26D48] hover:text-white
    `,
    region: `
      px-6 py-2
      rounded-full
      border-0
      ${isSelected 
        ? 'bg-[#8B6F47] text-white' 
        : 'bg-[#E8DCC6] text-[#8B6F47] hover:bg-[#D4C4A8]'
      }
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