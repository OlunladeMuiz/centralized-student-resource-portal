'use client';

import {
  motion,
  AnimatePresence
} from 'framer-motion';
import React, { useState } from 'react';
import { GripVertical, ChevronRight } from 'lucide-react';

export type SubMenuItem = {
  label: string;
  onClick: () => void;
};

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  subItems?: SubMenuItem[];
};

export type ExpandableDockProps = {
  items: DockItemData[];
  className?: string;
};

export default function ExpandableDock({
  items,
  className = ''
}: ExpandableDockProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleItemClick = (index: number, item: DockItemData) => {
    if (item.subItems && item.subItems.length > 0) {
      // Toggle expansion
      setExpandedIndex(expandedIndex === index ? null : index);
    } else if (item.onClick) {
      // Direct navigation
      item.onClick();
      setExpandedIndex(null);
    }
  };

  const handleSubItemClick = (subItem: SubMenuItem) => {
    subItem.onClick();
    setExpandedIndex(null);
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ x: 16, y: 300 }}
      className={`${className} fixed left-0 top-0 z-50 flex gap-3 cursor-move`}
      role="toolbar"
      aria-label="Application dock"
    >
      {/* Main Dock */}
      <motion.div
        className="flex flex-col gap-3 rounded-2xl border-[#0F172A] border-4 py-4 px-3 bg-[#FAFAF9]/95 backdrop-blur-sm shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        {/* Drag Handle */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#F59E0B] border-3 border-[#0F172A] rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <GripVertical className="w-4 h-4 text-[#0F172A]" />
        </div>

        {items.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => !isDragging && handleItemClick(index, item)}
            className={`relative w-12 h-12 flex items-center justify-center rounded-full bg-[#0F172A] border-[#F59E0B] border-3 shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] transition-all cursor-pointer group ${item.className || ''} ${expandedIndex === index ? 'ring-2 ring-[#F59E0B]' : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            role="button"
            aria-haspopup={item.subItems ? 'true' : 'false'}
            aria-expanded={expandedIndex === index}
            aria-label={item.label}
          >
            <div className="flex items-center justify-center text-white">
              {item.icon}
            </div>
            
            {/* Chevron indicator for expandable items */}
            {item.subItems && item.subItems.length > 0 && (
              <motion.div
                animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -right-1 -bottom-1 bg-[#F59E0B] border-2 border-[#0F172A] rounded-full p-0.5"
              >
                <ChevronRight className="w-3 h-3 text-[#0F172A]" />
              </motion.div>
            )}

            {/* Tooltip - Shows on hover */}
            <div
              className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-fit whitespace-nowrap rounded-lg border-3 border-[#0F172A] bg-[#F59E0B] px-4 py-2 text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {item.label}
              {/* Arrow pointing to icon */}
              <div 
                className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-[#0F172A] border-b-[6px] border-b-transparent"
              />
              <div 
                className="absolute right-full top-1/2 -translate-y-1/2 mr-[2px] w-0 h-0 border-t-[5px] border-t-transparent border-r-[7px] border-r-[#F59E0B] border-b-[5px] border-b-transparent"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded Submenu Panel */}
      <AnimatePresence>
        {expandedIndex !== null && items[expandedIndex]?.subItems && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 rounded-2xl border-[#0F172A] border-4 p-4 bg-[#FAFAF9] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] min-w-[220px]"
          >
            {/* Submenu Header */}
            <div className="mb-2 pb-2 border-b-2 border-[#0F172A]">
              <div className="flex items-center gap-2 text-[#0F172A]">
                {items[expandedIndex].icon}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {items[expandedIndex].label}
                </span>
              </div>
            </div>

            {/* Submenu Items */}
            {items[expandedIndex].subItems?.map((subItem, subIndex) => (
              <motion.button
                key={subIndex}
                onClick={() => handleSubItemClick(subItem)}
                className="text-left px-3 py-2 rounded-lg border-2 border-[#0F172A] bg-white hover:bg-[#F59E0B] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600 }}
              >
                {subItem.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}