"use client";

import { ReactNode } from "react";

interface NavBarItemProps {
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export default function NavBarItem({ disabled, onClick, children }: NavBarItemProps) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div onClick={handleClick} className={`
      flex h-full items-center justify-center
      text-xl font-semibold text-text-2 dark:text-secondary-gray
      ${!disabled ? "cursor-pointer hover:underline" : "text-text-4 dark:text-text-3 cursor-not-allowed"}
    `}>
      {children}
    </div>
  );
}
