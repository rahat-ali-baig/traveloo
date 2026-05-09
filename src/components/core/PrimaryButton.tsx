"use client";

import { MouseEvent, ReactNode, ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const handleButtonMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--x", `${x}%`);
  event.currentTarget.style.setProperty("--y", `${y}%`);
};

const PrimaryButton = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...restProps
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative overflow-hidden border border-white/20 cursor-pointer rounded-full px-8 py-3.5 text-xs lg:text-sm font-light tracking-wide transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:p-px before:content-[''] hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${className}`}
      onMouseMove={handleButtonMouseMove}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
      {...restProps}
    >
      {/* Shimmer effect */}
      <span className="shimmer absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Animated border gradient */}
      <span className="absolute inset-0 rounded-full bg-linear-to-r from-white/10 via-white/20 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white font-montserrat font-light!">
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
