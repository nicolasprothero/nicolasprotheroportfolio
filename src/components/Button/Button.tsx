import React from 'react';
import './Button.css';

interface ButtonProps {
  variant: 'primary-button' | 'icon-button' | 'secondary-button';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, className, children }) => {
  return (
    <button className={`${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;