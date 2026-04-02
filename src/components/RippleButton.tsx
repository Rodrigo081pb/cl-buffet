import { useRef } from "react";
import type { CSSProperties, ReactNode, MouseEvent } from "react";

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  className?: string;
  onMouseEnter?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function RippleButton({ 
  children, 
  onClick, 
  style, 
  className,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp
}: RippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const btn = btnRef.current;
    if (!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:40px; height:40px;
      left:${x - 20}px; top:${y - 20}px;
      background:rgba(201,169,110,0.35);
      transform:scale(0); pointer-events:none;
      animation:ripple 0.55s linear forwards;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    if (onClick) onClick(e);
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        position: "relative", overflow: "hidden",
        cursor: "pointer", border: "none", background: "none",
        ...style
      }}
    >
      {children}
    </button>
  );
}
