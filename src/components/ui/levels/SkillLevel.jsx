import { cn } from "@/lib/utils";

// کامپوننت نمایش سطح مهارت
const SkillLevel = ({ level, className }) => {
  const levels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];
  const levelIndex = levels.indexOf(level);

  return (
    <div className='flex items-center gap-1'>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={cn(
            `w-2 h-2 rounded-full`,
            index <= levelIndex ? "bg-yellow-400" : "bg-gray-600",
            className
          )}
        />
      ))}
    </div>
  );
};

export default SkillLevel;
