// کامپوننت نمایش سطح مهارت
const SkillLevel = ({ level }) => {
  const levels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];
  const levelIndex = levels.indexOf(level);

  return (
    <div className='flex items-center gap-1'>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`w-1.5 h-1.5 rounded-full ${
            index <= levelIndex ? "bg-yellow-400" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default SkillLevel;
