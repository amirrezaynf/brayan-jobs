"use client";

import { cn } from "@/lib/utils";

function AuthTab({ onClick, className, title, variant }) {
  if (variant === "secondary") {
    return (
      <button
        onClick={onClick}
        className={cn(
          `w-1/2 p-4 font-semibold text-center transition-all duration-300 `,
          className
        )}>
        {title}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        `px-6 py-2 rounded-lg transition-all duration-300`,
        className
      )}>
      {title}
    </button>
  );
}

export default AuthTab;
