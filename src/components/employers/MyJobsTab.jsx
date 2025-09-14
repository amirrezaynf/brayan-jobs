// components/employers/MyJobsTab.js
import { MapPin, Users, Edit, Trash2 } from 'lucide-react';

const jobs = [
  { title: 'توسعه‌دهنده Senior React', location: 'تهران، پارک فناوری پردیس', status: 'فعال', applicants: 25 },
  { title: 'طراح UI/UX', location: 'اصفهان (دورکاری)', status: 'درحال بررسی', applicants: 42 },
  { title: 'کارشناس فروش', location: 'شیراز', status: 'منقضی شده', applicants: 18 },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'فعال':
      return 'bg-green-500/20 text-green-400';
    case 'درحال بررسی':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'منقضی شده':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const JobCard = ({ job }) => (
  <div className=" rounded-lg p-5 transition-all duration-300 border border-gray-700 hover:border-gray-600">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-xl font-bold text-white">{job.title}</h3>
        <div className="flex items-center gap-2 text-gray-400 mt-2">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
      </div>
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(job.status)}`}>
        {job.status}
      </span>
    </div>
    <div className="border-t border-gray-700 my-4"></div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-yellow-400">
        <Users size={18} />
        <span className="font-semibold">{job.applicants}</span>
        <span className="text-gray-400">نفر متقاضی</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-white transition-colors"><Edit size={18} /></button>
        <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
      </div>
    </div>
  </div>
);

export default function MyJobsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">لیست آگهی‌های شما</h2>
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-gray-400">شما هنوز هیچ آگهی ثبت نکرده‌اید.</p>
        </div>
      )}
    </div>
  );
}