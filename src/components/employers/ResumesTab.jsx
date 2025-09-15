// components/employers/ResumesTab.jsx
import { useState } from "react";
import {
  FileText,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Eye,
  Download,
  Filter,
  Search,
  Crown,
  Star,
} from "lucide-react";

// Sample resume data
const sampleResumes = [
  {
    id: 1,
    applicantName: "علی احمدی",
    jobTitle: "توسعه‌دهنده Senior React",
    appliedDate: "۱۴۰۳/۰۶/۱۵",
    status: "pending", // pending, approved, rejected
    email: "ali.ahmadi@email.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    location: "تهران",
    experience: "۵ سال",
    skills: ["React", "JavaScript", "TypeScript", "Node.js"],
    summary:
      "توسعه‌دهنده با تجربه در زمینه فرانت‌اند و بک‌اند با تسلط بر تکنولوژی‌های مدرن",
    resumeFile: "ali-ahmadi-resume.pdf",
    isPro: true,
  },
  {
    id: 2,
    applicantName: "فاطمه کریمی",
    jobTitle: "طراح UI/UX",
    appliedDate: "۱۴۰۳/۰۶/۱۲",
    status: "approved",
    email: "fateme.karimi@email.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۰",
    location: "اصفهان",
    experience: "۳ سال",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    summary:
      "طراح خلاق با تجربه در طراحی رابط کاربری و تجربه کاربری برای اپلیکیشن‌های موبایل و وب",
    resumeFile: "fateme-karimi-resume.pdf",
    isPro: true,
  },
  {
    id: 3,
    applicantName: "محمد رضایی",
    jobTitle: "کارشناس فروش",
    appliedDate: "۱۴۰۳/۰۶/۱۰",
    status: "rejected",
    email: "mohammad.rezaei@email.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۱",
    location: "شیراز",
    experience: "۲ سال",
    skills: ["فروش", "مذاکره", "CRM", "بازاریابی"],
    summary: "کارشناس فروش با تجربه در زمینه فروش محصولات فناوری و خدمات B2B",
    resumeFile: "mohammad-rezaei-resume.pdf",
    isPro: false,
  },
  {
    id: 4,
    applicantName: "زهرا موسوی",
    jobTitle: "توسعه‌دهنده Senior React",
    appliedDate: "۱۴۰۳/۰۶/۰۸",
    status: "pending",
    email: "zahra.mousavi@email.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۲",
    location: "مشهد",
    experience: "۴ سال",
    skills: ["React", "Vue.js", "Python", "Django"],
    summary: "توسعه‌دهنده فول‌استک با تجربه در پروژه‌های بزرگ و کار تیمی",
    resumeFile: "zahra-mousavi-resume.pdf",
    isPro: false,
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "approved":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "rejected":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "در انتظار بررسی";
    case "approved":
      return "تایید شده";
    case "rejected":
      return "رد شده";
    default:
      return "نامشخص";
  }
};

const ResumeCard = ({ resume, onApprove, onReject, onViewDetails }) => (
  <div className="border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 ">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <User className="text-yellow-400" size={20} />
          <h3 className="text-xl font-bold text-white">
            {resume.applicantName}
          </h3>
          {resume.isPro && (
            <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
              <Crown size={12} />
              Pro
            </span>
          )}
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
              resume.status
            )}`}
          >
            {getStatusText(resume.status)}
          </span>
        </div>
        <p className="text-gray-300 font-medium mb-1">{resume.jobTitle}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{resume.appliedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{resume.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>{resume.experience} تجربه</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-gray-300 text-sm mb-3">{resume.summary}</p>
      <div className="flex flex-wrap gap-2">
        {resume.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className=" text-white border-yellow-500 border    px-2 py-1 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
        {resume.skills.length > 4 && (
          <span className="text-gray-400 text-xs">
            +{resume.skills.length - 4} مهارت دیگر
          </span>
        )}
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-700">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Mail size={14} />
        <span>{resume.email}</span>
        <Phone size={14} className="ml-2" />
        <span>{resume.phone}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(resume)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors"
        >
          <Eye size={14} />
          جزئیات
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-500/90 text-black hover:bg-yellow-500 rounded transition-colors">
          <Download size={14} />
          دانلود رزومه
        </button>
        {resume.status === "pending" && (
          <>
            <button
              onClick={() => onApprove(resume.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-900/40 text-green-400 hover:bg-green-700 rounded transition-colors"
            >
              <Check size={14} />
              تایید
            </button>
            <button
              onClick={() => onReject(resume.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-900/40 text-red-500 hover:bg-red-700 rounded transition-colors"
            >
              <X size={14} />
              رد
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

const ResumeDetailsModal = ({ resume, isOpen, onClose }) => {
  if (!isOpen || !resume) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="z-999 bg-black  border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">جزئیات رزومه</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                اطلاعات شخصی
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">نام:</span>{" "}
                  <span className="text-white">{resume.applicantName}</span>
                </p>
                <p>
                  <span className="text-gray-400">ایمیل:</span>{" "}
                  <span className="text-white">{resume.email}</span>
                </p>
                <p>
                  <span className="text-gray-400">تلفن:</span>{" "}
                  <span className="text-white">{resume.phone}</span>
                </p>
                <p>
                  <span className="text-gray-400">موقعیت:</span>{" "}
                  <span className="text-white">{resume.location}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                اطلاعات شغلی
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">موقعیت درخواستی:</span>{" "}
                  <span className="text-white">{resume.jobTitle}</span>
                </p>
                <p>
                  <span className="text-gray-400">سابقه کار:</span>{" "}
                  <span className="text-white">{resume.experience}</span>
                </p>
                <p>
                  <span className="text-gray-400">تاریخ درخواست:</span>{" "}
                  <span className="text-white">{resume.appliedDate}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">خلاصه</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {resume.summary}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">مهارت‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ResumesTab() {
  const [resumes, setResumes] = useState(sampleResumes);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (resumeId) => {
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId ? { ...resume, status: "approved" } : resume
      )
    );
  };

  const handleReject = (resumeId) => {
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId ? { ...resume, status: "rejected" } : resume
      )
    );
  };

  const handleViewDetails = (resume) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  const filteredResumes = resumes.filter((resume) => {
    const matchesStatus =
      filterStatus === "all" || resume.status === filterStatus;
    const matchesSearch =
      resume.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = resumes.filter((r) => r.status === "pending").length;
  const approvedCount = resumes.filter((r) => r.status === "approved").length;
  const rejectedCount = resumes.filter((r) => r.status === "rejected").length;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">مدیریت رزومه‌های دریافتی</h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className=" border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {resumes.length}
            </div>
            <div className="text-sm text-gray-400">کل رزومه‌ها</div>
          </div>
          <div className=" border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {pendingCount}
            </div>
            <div className="text-sm text-gray-400">در انتظار بررسی</div>
          </div>
          <div className=" border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {approvedCount}
            </div>
            <div className="text-sm text-gray-400">تایید شده</div>
          </div>
          <div className=" border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">
              {rejectedCount}
            </div>
            <div className="text-sm text-gray-400">رد شده</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className=" border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option className="bg-black/90 p-2 " value="all">
                همه وضعیت‌ها
              </option>
              <option className="bg-black/90 p-2 " value="pending">
                در انتظار بررسی
              </option>
              <option className="bg-black/90 p-2 " value="approved">
                تایید شده
              </option>
              <option className="bg-black/90 p-2 " value="rejected">
                رد شده
              </option>
            </select>
          </div>

          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute right-3 top-3 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="جستجو در نام متقاضی یا عنوان شغل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full  border border-gray-600 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Resume List */}
      {filteredResumes.length > 0 ? (
        <div className="space-y-4">
          {filteredResumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-400 text-lg">
            {searchTerm || filterStatus !== "all"
              ? "هیچ رزومه‌ای با فیلترهای انتخابی یافت نشد."
              : "هنوز هیچ رزومه‌ای دریافت نکرده‌اید."}
          </p>
        </div>
      )}

      {/* Resume Details Modal */}
      <ResumeDetailsModal
        resume={selectedResume}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedResume(null);
        }}
      />
    </div>
  );
}
