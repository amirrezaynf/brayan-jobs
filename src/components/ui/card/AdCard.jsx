const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
);
export default function AdCard({ job }) {
  return (
    <div
      key={job.id}
      className="job-card dark-card rounded-xl p-6 flex flex-col relative min-h-[240px]"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <h4 className="text-xl font-bold text-white">{job.title}</h4>
            {job.isVip && (
              <div className="w-fit flex !items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg">
                <StarIcon />
                <span>VIP</span>
              </div>
            )}
          </div>
          <p className="text-gray-400 mt-1">{job.company}</p>
        </div>
        <img
          src={`https://placehold.co/50x50/FBBF24/121212?text=${job.logo}`}
          alt={`${job.company} Logo`}
          className="rounded-full"
        />
      </div>
      <div className="flex items-center text-gray-400 text-sm space-x-3 space-x-reverse my-4">
        <span className="flex items-center">
          <LocationIcon />
          {job.location}
        </span>
        <span className="flex items-center">
          <ClockIcon />
          {job.type}
        </span>
      </div>
      <p className="text-gray-400 text-sm flex-grow">{job.description}</p>
      <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
        <span className="text-lg font-semibold gold-text">{job.salary}</span>
        <a
          href="/jobsingle"
          className="text-sm px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-500 hover:text-black transition"
        >
          ارسال رزومه
        </a>
      </div>
    </div>
  );
}
