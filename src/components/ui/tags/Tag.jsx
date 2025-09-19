"use client";

const Tag = ({ children, color = "yellow", size = "sm" }) => {
  const colorClasses = {
    yellow: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    blue: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    green: "bg-green-400/10 text-green-400 border-green-400/20",
    purple: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    red: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm", // اختیاری، سایز بزرگ‌تر
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${colorClasses[color]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
};

export default Tag;
