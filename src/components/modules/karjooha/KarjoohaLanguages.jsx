import SkillLevel from "@/components/ui/levels/SkillLevel";
import { Languages } from "lucide-react";

function KarjoohaLanguages({ languages }) {
  return (
    <div className='bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center'>
          <Languages className='w-4 h-4 text-blue-400' />
        </div>
        <h2 className='text-xl font-bold text-white'>زبان‌های خارجی</h2>
      </div>

      <div className='space-y-4'>
        {languages.map((lang, index) => (
          <div key={index} className='flex items-center justify-between'>
            <span className='text-gray-300 font-medium'>{lang.language}</span>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-400'>{lang.proficiency}</span>
              <SkillLevel level={lang.proficiency} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KarjoohaLanguages;
