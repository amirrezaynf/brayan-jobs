import SkillLevel from "@/components/ui/levels/SkillLevel";
import { Star } from "lucide-react";

function KarjoohaSkills({ skills }) {
  return (
    <div className='bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center'>
          <Star className='w-4 h-4 text-yellow-400' />
        </div>
        <h2 className='text-xl font-bold text-white'>مهارت‌ها</h2>
      </div>

      <div className='space-y-4'>
        {skills.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            <span className='text-gray-300 font-medium'>{skill.skillName}</span>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-400'>{skill.proficiency}</span>
              <SkillLevel level={skill.proficiency} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KarjoohaSkills;
