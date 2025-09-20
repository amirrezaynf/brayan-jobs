import React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  Star,
  Award,
  Languages,
  FileText,
  ExternalLink,
  Download,
  Share2,
  Heart,
  Eye,
} from "lucide-react";
import SkillLevel from "@/components/ui/levels/SkillLevel";
import Tag from "@/components/ui/tags/Tag";
import { resumeData } from "@/constants/karjoohaData";
import KarjoohaSkills from "@/components/modules/karjooha/KarjoohaSkills";
import KarjoohaLanguages from "@/components/modules/karjooha/KarjoohaLanguages";
import KarjoohaContactInfo from "@/components/modules/karjooha/KarjoohaContactInfo";
import KarjoohaActions from "@/components/ui/actions/KarjoohaActions";

export default function ResumeViewPage({ params }) {
  return (
    <>
      {/* Header با اکشن‌ها */}
      <div className="sticky top-0 z-50  backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">
                رزومه {resumeData.basicInfo.firstName}{" "}
                {resumeData.basicInfo.lastName}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>۱۲۳ بازدید</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg- text-white rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">علاقه‌مندی</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">اشتراک‌گذاری</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">دانلود PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ستون سمت راست - اطلاعات اصلی */}
          <div className="lg:col-span-2 space-y-8">
            {/* بخش اطلاعات پایه */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={resumeData.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400/20 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-right">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {resumeData.basicInfo.firstName}{" "}
                    {resumeData.basicInfo.lastName}
                  </h1>
                  <p className="text-xl text-yellow-400 mb-4 font-medium">
                    {resumeData.jobInfo.jobTitle}
                  </p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-gray-300">
                    <div className="flex items-center  gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>
                        {resumeData.residence.city}،{" "}
                        {resumeData.residence.province}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{resumeData.basicInfo.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{resumeData.basicInfo.email}</span>
                    </div>
                  </div>

                  {resumeData.jobInfo.showSalary &&
                    resumeData.jobInfo.salaryType === "amount" && (
                      <div className="mt-4">
                        <Tag color="green">
                          حقوق مورد انتظار:{" "}
                          {parseInt(
                            resumeData.jobInfo.salaryAmount
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </Tag>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* بخش سوابق کاری */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-black/50 to-black/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">سوابق کاری</h2>
              </div>

              <div className="space-y-6">
                {resumeData.workExperiences.map((exp, index) => (
                  <div key={index} className="relative">
                    {index !== resumeData.workExperiences.length - 1 && (
                      <div className="absolute right-5 top-12 w-0.5 h-full bg-gradient-to-b from-yellow-400 to-transparent"></div>
                    )}

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-yellow-400/30">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>

                      <div className="flex-1 bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-white">
                            {exp.position}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exp.startDate} -{" "}
                              {exp.currentJob ? "تاکنون" : exp.endDate}
                            </span>
                            {exp.currentJob && <Tag color="green">فعلی</Tag>}
                          </div>
                        </div>

                        <p className="text-yellow-400 font-medium mb-3">
                          {exp.companyName}
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          {exp.responsibilities}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* بخش مدارک و گواهینامه‌ها */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-black/50 to-black/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  مدارک و گواهینامه‌ها
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumeData.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30 hover:border-purple-400/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white flex-1">
                        {cert.title}
                      </h3>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-purple-400 font-medium mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                      <span>تاریخ صدور: {cert.issueDate}</span>
                      {!cert.noExpiry && cert.expiryDate && (
                        <span>• انقضا: {cert.expiryDate}</span>
                      )}
                      {cert.noExpiry && <Tag color="green">بدون انقضا</Tag>}
                    </div>

                    {cert.certificateNumber && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <span className="text-xs text-gray-500">
                          شماره گواهینامه: {cert.certificateNumber}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* بخش نمونه کارها */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">نمونه کارها</h2>
              </div>

              <div className="space-y-4">
                {resumeData.portfolioLink && (
                  <div className="bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          وب‌سایت نمونه کارها
                        </h3>
                        <p className="text-gray-400">
                          مشاهده کامل پروژه‌ها و نمونه کارها
                        </p>
                      </div>
                      <a
                        href={resumeData.portfolioLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>مشاهده</span>
                      </a>
                    </div>
                  </div>
                )}

                {resumeData.portfolioFiles.length > 0 && (
                  <div className="bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      فایل‌های نمونه کار
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {resumeData.portfolioFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg border border-gray-700/30"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{file}</span>
                          </div>
                          <button className="text-green-400 hover:text-green-300 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ستون سمت چپ - اطلاعات جانبی */}
          <div className="space-y-8">
            {/* بخش مهارت‌ها */}
            <KarjoohaSkills skills={resumeData.skills} />

            {/* بخش زبان‌های خارجی */}
            <KarjoohaLanguages languages={resumeData.languages} />

            {/* بخش اطلاعات تماس تکمیلی */}
            <KarjoohaContactInfo
              email={resumeData.basicInfo.email}
              mobile={resumeData.basicInfo.mobile}
              address={resumeData.residence.address}
            />

            {/* دکمه‌های اقدام */}
            <KarjoohaActions />
          </div>
        </div>
      </div>
    </>
  );
}
