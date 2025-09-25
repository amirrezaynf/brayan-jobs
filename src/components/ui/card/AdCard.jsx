import Image from "next/image";
import Link from "next/link";
import { LocationIcon, ClockIcon, StarIcon } from "@/icons";

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
                <StarIcon className="w-3 h-3" />
                <span>VIP</span>
              </div>
            )}
          </div>
          <p className="text-gray-400 mt-1">{job.company}</p>
        </div>
        <Image
          width={50}
          height={50}
          src={`https://placehold.co/50x50/FBBF24/121212?text=${job.logo}`}
          alt={`${job.company} Logo`}
          className="rounded-full w-[50px] h-[50px]"
          unoptimized
        />
      </div>
      <div className="flex items-center text-gray-400 text-sm space-x-3 space-x-reverse my-4">
        <span className="flex items-center">
          <LocationIcon className="w-4 h-4 ml-1" />
          {job.location}
        </span>
        <span className="flex items-center">
          <ClockIcon className="w-4 h-4 ml-1" />
          {job.type}
        </span>
      </div>
      <p className="text-gray-400 text-sm flex-grow">{job.description}</p>
      <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
        <span className="text-lg font-semibold gold-text">{job.salary}</span>
        <Link
          href="/advertisements"
          className="text-sm px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-500 hover:text-black transition"
        >
          ارسال رزومه
        </Link>
      </div>
    </div>
  );
}
