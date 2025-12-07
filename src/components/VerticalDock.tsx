'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type VerticalDockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelWidth?: number;
  baseItemSize?: number;
  dockWidth?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseY: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#0F172A] border-[#F59E0B] border-3 shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] transition-shadow cursor-pointer ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 10 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute left-full ml-4 top-1/2 -translate-y-1/2 w-fit whitespace-pre rounded-lg border-3 border-[#0F172A] bg-[#FAFAF9] px-3 py-1.5 text-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] z-50`}
          role="tooltip"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center text-white ${className}`}>{children}</div>;
}

export default function VerticalDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelWidth = 80,
  dockWidth = 256,
  baseItemSize = 50
}: VerticalDockProps) {
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const constraintsRef = useRef(null);

  const maxWidth = useMemo(() => Math.max(dockWidth, magnification + magnification / 2 + 4), [magnification]);
  const widthRow = useTransform(isHovered, [0, 1], [panelWidth, maxWidth]);
  const width = useSpring(widthRow, spring);

  return (
    <motion.div 
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-40"
    >
      <motion.div 
        style={{ width, scrollbarWidth: 'none' }} 
        className="flex items-center pointer-events-auto"
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          onMouseMove={({ clientY }) => {
            isHovered.set(1);
            mouseY.set(clientY);
          }}
          onMouseLeave={() => {
            isHovered.set(0);
            mouseY.set(Infinity);
          }}
          className={`${className} fixed left-4 top-1/2 -translate-y-1/2 flex flex-col items-center w-fit gap-4 rounded-2xl border-[#0F172A] border-4 py-4 px-3 bg-[#FAFAF9]/95 backdrop-blur-sm shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-shadow cursor-move`}
          style={{ width: panelWidth }}
          role="toolbar"
          aria-label="Application dock"
          whileHover={{ scale: 1.02 }}
        >
          {/* Drag Handle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#F59E0B] border-3 border-[#0F172A] rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <GripVertical className="w-4 h-4 text-[#0F172A]" />
          </div>

          {items.map((item, index) => (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseY={mouseY}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
