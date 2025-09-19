import { Mail, Phone } from "lucide-react";

function KarjoohaActions() {
  return (
    <div className='bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20'>
      <h3 className='text-lg font-bold text-white mb-4'>علاقه‌مند هستید؟</h3>
      <div className='space-y-3'>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium'>
          <Mail className='w-4 h-4' />
          ارسال پیام
        </button>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'>
          <Phone className='w-4 h-4' />
          تماس تلفنی
        </button>
      </div>
    </div>
  );
}

export default KarjoohaActions;
