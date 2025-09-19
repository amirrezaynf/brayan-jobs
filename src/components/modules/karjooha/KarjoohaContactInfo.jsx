import { Mail, MapPin, Phone } from "lucide-react";

function KarjoohaContactInfo({ address, mobile, email }) {
  return (
    <div className='bg-gradient-to-br from-black/50 to-black/10backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
      <h2 className='text-xl font-bold text-white mb-6'>اطلاعات تماس</h2>

      <div className='space-y-4'>
        <div className='flex items-center gap-3 p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg'>
          <MapPin className='w-5 h-5 text-gray-400' />
          <div>
            <p className='text-white font-medium'>آدرس</p>
            <p className='text-gray-400 text-sm'>{address}</p>
          </div>
        </div>

        <div className='flex items-center gap-3 p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg'>
          <Phone className='w-5 h-5 text-gray-400' />
          <div>
            <p className='text-white font-medium'>تلفن همراه</p>
            <p className='text-gray-400 text-sm'>{mobile}</p>
          </div>
        </div>

        <div className='flex items-center gap-3 p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg'>
          <Mail className='w-5 h-5 text-gray-400' />
          <div>
            <p className='text-white font-medium'>ایمیل</p>
            <p className='text-gray-400 text-sm'>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KarjoohaContactInfo;
