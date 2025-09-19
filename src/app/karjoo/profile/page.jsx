"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Eye,
  EyeOff,
  Edit3,
  Upload,
  Check,
  X,
  Lock,
  FileText,
  Home,
} from "lucide-react";
import KarjooHeader from "@/components/layout/header/KarjooHeader";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1472099645785-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  );

  const [formData, setFormData] = useState({
    firstName: "علی",
    lastName: "احمدی",
    email: "ali.ahmadi@example.com",
    phone: "09123456789",
    location: "تهران، ایران",
    bio: "توسعه‌دهنده فول‌استک با ۵ سال تجربه در React و Node.js. علاقه‌مند به یادگیری تکنولوژی‌های جدید و کار در پروژه‌های چالش‌برانگیز.",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // اینجا می‌توانید API call برای ذخیره اطلاعات اضافه کنید
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // بازگردانی داده‌ها به حالت قبلی
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black/90 text-white">
      <KarjooHeader />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-2xl p-6 mb-8 border border-yellow-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-3 border-yellow-400/50"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2  flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-yellow-400 font-medium">
                  توسعه‌دهنده فول‌استک
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span>{formData.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                isEditing
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
              }`}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  لغو
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  ویرایش پروفایل
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-400" />
                اطلاعات شخصی
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نام
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors ${
                      isEditing
                        ? "border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                        : "border-gray-700/50 cursor-not-allowed"
                    }`}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors ${
                      isEditing
                        ? "border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                        : "border-gray-700/50 cursor-not-allowed"
                    }`}
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ایمیل
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pr-12 pl-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors ${
                        isEditing
                          ? "border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                          : "border-gray-700/50 cursor-not-allowed"
                      }`}
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    شماره تلفن
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pr-12 pl-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors ${
                        isEditing
                          ? "border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                          : "border-gray-700/50 cursor-not-allowed"
                      }`}
                      placeholder="شماره تلفن خود را وارد کنید"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    محل سکونت
                  </label>
                  <div className="relative">
                    <Home className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pr-12 pl-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors ${
                        isEditing
                          ? "border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                          : "border-gray-700/50 cursor-not-allowed"
                      }`}
                      placeholder="شهر و کشور خود را وارد کنید"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    بیوگرافی
                  </label>
                  <div className="relative">
                    <FileText className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className={`w-full pr-12 pl-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors resize-none ${
                        isEditing
                          ? "border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                          : "border-gray-700/50 cursor-not-allowed"
                      }`}
                      placeholder="درباره خود بنویسید..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            {isEditing && (
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  تغییر رمز عبور
                </h2>

                <div className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      رمز عبور فعلی
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full pr-12 pl-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                        placeholder="رمز عبور فعلی خود را وارد کنید"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      رمز عبور جدید
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full pr-12 pl-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                        placeholder="رمز عبور جدید خود را وارد کنید"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      تکرار رمز عبور جدید
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pr-12 pl-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                        placeholder="رمز عبور جدید را مجدداً وارد کنید"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Image Card */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-yellow-400" />
                عکس پروفایل
              </h3>

              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400/30 mx-auto"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-2 cursor-pointer transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-4">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      آپلود عکس جدید
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
            >
              <X className="w-4 h-4" />
              لغو
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              ذخیره تغییرات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
