import React from 'react';
import './SidebarItem.css';

interface SidebarItemProps {
  title: string;
  tag?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, tag, icon, onClick, selected }) => {
  const itemTag = tag === 'WIP' ? 'sidebar-item-tag wip' : 'sidebar-item-tag';

  return (
    <div
      className={`sidebar-item ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {icon && <div className="sidebar-item-icon">{icon}</div>}
      <div className="sidebar-item-title">{title}</div>
      <div className={itemTag}>{tag}</div>
    </div>
  );
}

export default SidebarItem;
