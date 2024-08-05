import React from 'react';
import './Badge.css';

interface BadgeProps {
  type : string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({type, children}) => {
  return (
    <div className={`badge ${type}`}>
      {children}
    </div>
  );
};

export default Badge;