import React from "react";
import { Award, Plus, Trash2 } from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function ResumeSkills({
  skills,
  addItem,
  removeItem,
  updateItem,
  setSkills,
}) {
  const proficiencyLevels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];

  const skillOptions = [
    // مهارت‌های برنامه‌نویسی
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "PHP",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Laravel",
    "Django",
    "Spring Boot",
    "ASP.NET",

    // مهارت‌های طراحی
    "Photoshop",
    "Illustrator",
    "Figma",
    "Adobe XD",
    "Sketch",
    "InDesign",
    "After Effects",
    "Premiere Pro",

    // مهارت‌های بازاریابی
    "SEO",
    "Google Ads",
    "Facebook Ads",
    "Content Marketing",
    "Social Media Marketing",
    "Email Marketing",
    "Google Analytics",

    // مهارت‌های مدیریتی
    "Project Management",
    "Scrum",
    "Agile",
    "Leadership",
    "Team Management",

    // مهارت‌های فنی دیگر
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "Linux",
    "Windows Server",

    // مهارت‌های نرم‌افزاری
    "Microsoft Office",
    "Excel",
    "PowerPoint",
    "Word",
    "AutoCAD",
    "SolidWorks",

    // مهارت‌های زبان
    "ترجمه",
    "تدریس",
    "مکالمه",

    // مهارت‌های حسابداری و مالی
    "حسابداری",
    "مالیات",
    "حسابرسی",
    "بودجه‌بندی",

    // سایر مهارت‌ها
    "فروش",
    "مذاکره",
    "ارتباط با مشتری",
    "تحلیل داده",
    "آموزش",
  ];

  return (
    <section className="border-b border-gray-800 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <Award className="w-6 h-6 ml-2 text-yellow-500" />
          مهارت‌ها
        </h2>
        <button
          type="button"
          onClick={() =>
            addItem(setSkills, {
              skillName: "",
              proficiency: "",
            })
          }
          className="flex items-center px-3 py-2 bg-yellow-500/80 text-gray-900 rounded-lg hover:bg-yellow-500 transition text-sm font-bold"
        >
          <Plus className="w-4 h-4 ml-1" />
          افزودن مهارت
        </button>
      </div>
      {skills.map((skill, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-700 rounded-lg relative"
        >
          {skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(setSkills, index)}
              className="absolute top-2 left-2 text-red-500 hover:bg-red-500/20 p-1 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                نام مهارت
              </label>
              <CustomSelect
                options={skillOptions}
                value={skill.skillName}
                onChange={(value) =>
                  updateItem(setSkills, index, "skillName", value)
                }
                placeholder="انتخاب مهارت"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                سطح مهارت
              </label>
              <CustomSelect
                options={proficiencyLevels}
                value={skill.proficiency}
                onChange={(value) =>
                  updateItem(setSkills, index, "proficiency", value)
                }
                placeholder="انتخاب سطح مهارت"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
