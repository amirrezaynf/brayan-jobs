"use client";

import { useState, useEffect } from "react";
import {
  Gem,
  User,
  Phone,
  Lock,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Building,
  Eye,
  EyeOff,
  ArrowRight,
  Hash,
  Briefcase ,
  Smile ,
  CheckCircle,
} from "lucide-react";

// You might need to install lucide-react: npm install lucide-react

const IconWrapper = ({ children }) => (
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
    {children}
  </div>
);

const FormInput = ({
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-gray-700/50 border ${
          error ? "border-red-500" : "border-gray-600"
        } text-gray-200 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 pr-10`}
      />
      <IconWrapper>{icon}</IconWrapper>
    </div>
    {error && <p className="text-red-500 text-xs mt-1 mr-1">{error}</p>}
  </div>
);

export default function AuthPage() {
  const [userRole, setUserRole] = useState("specialist"); // 'specialist' or 'employer'
  const [activeTab, setActiveTab] = useState("login");

  // --- Specialist States ---
  const [currentStep, setCurrentStep] = useState(1);
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    contact: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    nationalId: "",
    password: "",
    fieldOfWork: "فناوری اطلاعات",
    age: "",
    education: "کارشناسی",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Employer States ---
  const [employerCurrentStep, setEmployerCurrentStep] = useState(1);
  const [employerLoginData, setEmployerLoginData] = useState({
    phone: "",
    password: "",
  });
  const [employerRegisterData, setEmployerRegisterData] = useState({
    contact: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyField: "فناوری اطلاعات",
    companyExperience: "",
    companyAddress: "",
  });
  const [employerErrors, setEmployerErrors] = useState({});
  const [isEmployerSubmitted, setIsEmployerSubmitted] = useState(false);

  // Effect to reset forms when switching roles or tabs
  useEffect(() => {
    setCurrentStep(1);
    setErrors({});
    setIsSubmitted(false);
    setEmployerCurrentStep(1);
    setEmployerErrors({});
    setIsEmployerSubmitted(false);
  }, [userRole, activeTab]);

  const progressPercentage = { 1: 10, 2: 40, 3: 70, 4: 100 };
  const employerProgressPercentage = { 1: 10, 2: 33, 3: 66, 4: 100 };

  // --- Input Handlers ---
  const handleInputChange = (setData, e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear errors on change
    if (userRole === "specialist" && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (userRole === "employer" && employerErrors[name]) {
      setEmployerErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // --- Specialist Logic ---
  const handleNextStep = () => {
    if (validateStep()) setCurrentStep((p) => p + 1);
  };
  const handleBackStep = () => {
    setCurrentStep((p) => p - 1);
    setErrors({});
  };
  const validateStep = () => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!registerData.contact)
        newErrors.contact = "ایمیل یا شماره تلفن الزامی است.";
      else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.contact) &&
        !/^(09)\d{9}$/.test(registerData.contact)
      )
        newErrors.contact = "فرمت ایمیل یا شماره تلفن نامعتبر است.";
    }
    if (currentStep === 2) {
      if (
        !registerData.verificationCode ||
        registerData.verificationCode.length < 6
      )
        newErrors.verificationCode = "کد تایید باید ۶ رقم باشد.";
    }
    if (currentStep === 3) {
      if (!registerData.firstName) newErrors.firstName = "نام الزامی است.";
      if (!registerData.lastName)
        newErrors.lastName = "نام خانوادگی الزامی است.";
      if (!registerData.nationalId || !/^\d{10}$/.test(registerData.nationalId))
        newErrors.nationalId = "کد ملی باید ۱۰ رقم باشد.";
      if (!registerData.password || registerData.password.length < 8)
        newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    }
    if (currentStep === 4) {
      if (!registerData.age || registerData.age < 18)
        newErrors.age = "سن باید بالای ۱۸ سال باشد.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Registering specialist:", registerData);
      setIsSubmitted(true);
    }
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in specialist:", loginData);
    alert("ورود متخصص با موفقیت انجام شد!");
  };

  // --- Employer Logic ---
  const handleEmployerNextStep = () => {
    if (validateEmployerStep()) setEmployerCurrentStep((p) => p + 1);
  };
  const handleEmployerBackStep = () => {
    setEmployerCurrentStep((p) => p - 1);
    setEmployerErrors({});
  };
  const validateEmployerStep = () => {
    let newErrors = {};
    if (employerCurrentStep === 1) {
      if (!employerRegisterData.contact)
        newErrors.contact = "شماره تلفن الزامی است.";
      else if (!/^(09)\d{9}$/.test(employerRegisterData.contact))
        newErrors.contact = "فرمت شماره تلفن نامعتبر است.";
    }
    if (employerCurrentStep === 2) {
      if (
        !employerRegisterData.verificationCode ||
        employerRegisterData.verificationCode.length < 6
      )
        newErrors.verificationCode = "کد تایید باید ۶ رقم باشد.";
    }
    if (employerCurrentStep === 3) {
      if (!employerRegisterData.firstName)
        newErrors.firstName = "نام کارفرما الزامی است.";
      if (!employerRegisterData.lastName)
        newErrors.lastName = "نام خانوادگی کارفرما الزامی است.";
      if (
        !employerRegisterData.password ||
        employerRegisterData.password.length < 8
      )
        newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
      if (
        employerRegisterData.password !== employerRegisterData.confirmPassword
      )
        newErrors.confirmPassword = "رمزهای عبور مطابقت ندارند.";
    }
    if (employerCurrentStep === 4) {
      if (!employerRegisterData.companyName)
        newErrors.companyName = "نام شرکت الزامی است.";
      if (!employerRegisterData.companyExperience)
        newErrors.companyExperience = "سابقه شرکت الزامی است.";
      if (!employerRegisterData.companyAddress)
        newErrors.companyAddress = "آدرس شرکت الزامی است.";
    }
    setEmployerErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleEmployerRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateEmployerStep()) {
      console.log("Registering employer:", employerRegisterData);
      setIsEmployerSubmitted(true);
    }
  };
  const handleEmployerLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in employer:", employerLoginData);
    alert("ورود کارفرما با موفقیت انجام شد!");
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-200 grid grid-cols-1 lg:grid-cols-2"
      dir="rtl"
    >
      {/* Right Side - Form */}
      <div className="relative flex items-center justify-center p-6 sm:p-12 lg:h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-900/30 animate-gradient-xy"></div>
        <style jsx>{`
          @keyframes gradient-xy {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 15s ease infinite;
          }
          .form-step {
            display: none;
          }
          .form-step.active {
            display: block;
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <div className="w-full max-w-md z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <a
                href="/"
                className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-black rounded-lg  transition-colors text-sm"
              >
                <ArrowRight size={16} />
                بازگشت
              </a>
              <div className="flex-1"></div>
            </div>
            <h1 className="text-4xl font-bold text-yellow-400 tracking-wider">
              دکتر برایان اعتماد
            </h1>
            <p className="text-gray-400 mt-2">
              پلتفرم کاریابی متخصصین و کارفرمایان
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setUserRole("specialist")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                userRole === "specialist"
                  ? "bg-yellow-400 text-gray-900 font-bold shadow-lg"
                  : "bg-gray-700/50 text-gray-300"
              }`}
            >
              متخصص هستم
            </button>
            <button
              onClick={() => setUserRole("employer")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                userRole === "employer"
                  ? "bg-yellow-400 text-gray-900 font-bold shadow-lg"
                  : "bg-gray-700/50 text-gray-300"
              }`}
            >
              کارفرما هستم
            </button>
          </div>

          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
            <div className="flex">
              <button
                onClick={() => setActiveTab("login")}
                className={`w-1/2 p-4 font-semibold text-center transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-yellow-400/10 border-b-2 border-yellow-400 text-white"
                    : "text-gray-400"
                }`}
              >
                ورود
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`w-1/2 p-4 font-semibold text-center transition-all duration-300 ${
                  activeTab === "register"
                    ? "bg-yellow-400/10 border-b-2 border-yellow-400 text-white"
                    : "text-gray-400"
                }`}
              >
                ثبت‌نام
              </button>
            </div>
            <div className="p-8">
              {/* --- SPECIALIST FORM --- */}
              {userRole === "specialist" &&
                (activeTab === "login" ? (
                  <form onSubmit={handleLoginSubmit} className="animate-fadeIn">
                    <FormInput
                      name="phone"
                      type="tel"
                      placeholder="ایمیل یا شماره تلفن"
                      icon={<Phone size={18} />}
                      value={loginData.phone}
                      onChange={(e) => handleInputChange(setLoginData, e)}
                      error={errors.phone}
                    />
                    <FormInput
                      name="password"
                      type="password"
                      placeholder="رمز عبور"
                      icon={<Lock size={18} />}
                      value={loginData.password}
                      onChange={(e) => handleInputChange(setLoginData, e)}
                      error={errors.password}
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300/50 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-300"
                    >
                      ورود به حساب کاربری
                    </button>
                    <div className="mt-6 flex items-center justify-center text-xs text-gray-400 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                      {/* Lucide Gem Icon */}
                      <Gem
                        className="w-4 h-4 ml-2 flex-shrink-0 text-cyan-400"
                        aria-hidden="true"
                      />

                      {/* Text */}
                      <p>
                        کاربرانی که در آکادمی اعتماد دارای حساب کاری می‌باشند
                        میتوانند با نام کاربری و رمز عبور حساب کاربری خود در
                        آکادمی اعتماد وارد شوند و از امکانات ویژه بهره مند شوند
                      </p>
                    </div>
                  </form>
                ) : (
                  <div>
                    {!isSubmitted ? (
                      <>
                        <div className="mb-8">
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${progressPercentage[currentStep]}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-2 text-gray-400 px-1">
                            <span>هویت</span>
                            <span>اطلاعات فردی</span>
                            <span>شغلی</span>
                          </div>
                        </div>
                        <form onSubmit={handleRegisterSubmit}>
                          <div
                            className={`form-step ${
                              currentStep === 1 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              شروع ثبت‌نام متخصص
                            </h3>
                            <FormInput
                              name="contact"
                              type="text"
                              placeholder="ایمیل یا شماره تلفن"
                              icon={<Mail size={18} />}
                              value={registerData.contact}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              error={errors.contact}
                            />
                            <button
                              type="button"
                              onClick={handleNextStep}
                              className="w-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                            >
                              ادامه
                            </button>
                          </div>
                          <div
                            className={`form-step ${
                              currentStep === 2 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              اعتبارسنجی
                            </h3>
                            <p className="text-center text-sm text-gray-400 mb-4">
                              کد ۶ رقمی ارسال شده به{" "}
                              <span className="font-bold text-yellow-400">
                                {registerData.contact}
                              </span>{" "}
                              را وارد کنید.
                            </p>
                            <FormInput
                              name="verificationCode"
                              type="text"
                              placeholder="کد تایید"
                              icon={<Hash size={18} />}
                              value={registerData.verificationCode}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              error={errors.verificationCode}
                            />
                            <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={handleBackStep}
                                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                بازگشت
                              </button>
                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                تایید
                              </button>
                            </div>
                          </div>
                          <div
                            className={`form-step ${
                              currentStep === 3 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              اطلاعات فردی
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <FormInput
                                name="firstName"
                                type="text"
                                placeholder="نام"
                                icon={<User size={18} />}
                                value={registerData.firstName}
                                onChange={(e) =>
                                  handleInputChange(setRegisterData, e)
                                }
                                error={errors.firstName}
                              />
                              <FormInput
                                name="lastName"
                                type="text"
                                placeholder="نام خانوادگی"
                                icon={<User size={18} />}
                                value={registerData.lastName}
                                onChange={(e) =>
                                  handleInputChange(setRegisterData, e)
                                }
                                error={errors.lastName}
                              />
                            </div>
                            <FormInput
                              name="nationalId"
                              type="text"
                              placeholder="کد ملی"
                              icon={<Hash size={18} />}
                              value={registerData.nationalId}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              error={errors.nationalId}
                            />
                            <FormInput
                              name="password"
                              type="password"
                              placeholder="رمز عبور (حداقل ۸ کاراکتر)"
                              icon={<Lock size={18} />}
                              value={registerData.password}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              error={errors.password}
                            />
                            <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={handleBackStep}
                                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                بازگشت
                              </button>
                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                ادامه
                              </button>
                            </div>
                          </div>
                          <div
                            className={`form-step ${
                              currentStep === 4 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              اطلاعات تکمیلی
                            </h3>
                            <div className="relative mb-4">
                              <select
                                name="fieldOfWork"
                                value={registerData.fieldOfWork}
                                onChange={(e) =>
                                  handleInputChange(setRegisterData, e)
                                }
                                className="bg-gray-700/50 border border-gray-600 text-gray-200 text-sm rounded-lg block w-full p-2.5 pr-10 appearance-none"
                              >
                                <option className="bg-gray-800">فناوری اطلاعات</option>
                                <option className="bg-gray-800">مالی و حسابداری</option>
                                <option className="bg-gray-800">مهندسی</option>
                                <option className="bg-gray-800">پزشکی و سلامت</option>
                                <option className="bg-gray-800">هنر و طراحی</option>
                              </select>
                              <IconWrapper>
                                <Briefcase size={18} />
                              </IconWrapper>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <FormInput
                                name="age"
                                type="number"
                                placeholder="سن"
                                icon={<Smile size={18} />}
                                value={registerData.age}
                                onChange={(e) =>
                                  handleInputChange(setRegisterData, e)
                                }
                                error={errors.age}
                              />
                              <div className="relative">
                                <select
                                  name="education"
                                  value={registerData.education}
                                  onChange={(e) =>
                                    handleInputChange(setRegisterData, e)
                                  }
                                  className="bg-gray-700/50 border border-gray-600 text-gray-200 text-sm rounded-lg block w-full p-2.5 pr-10 appearance-none"
                                >
                                  <option className="bg-gray-800">دیپلم</option>
                                  <option className="bg-gray-800">کارشناسی</option>
                                  <option className="bg-gray-800">کارشناسی ارشد</option>
                                  <option className="bg-gray-800">دکتری</option>
                                </select>
                                <IconWrapper>
                                  <GraduationCap size={18} className="top-3 absolute " />
                                </IconWrapper>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                              <button
                                type="button"
                                onClick={handleBackStep}
                                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                بازگشت
                              </button>
                              <button
                                type="submit"
                                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                تکمیل ثبت‌نام
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div className="text-center animate-fadeIn">
                        <CheckCircle
                          className="mx-auto text-green-400"
                          size={64}
                        />
                        <h3 className="text-2xl font-bold mt-4">
                          ثبت‌نام موفقیت‌آمیز بود!
                        </h3>
                        <p className="text-gray-400 mt-2">
                          حساب کاربری شما با موفقیت ایجاد شد. اکنون می‌توانید
                          وارد شوید.
                        </p>
                        <button
                          onClick={() => {
                            setActiveTab("login");
                            setIsSubmitted(false);
                            setCurrentStep(1);
                          }}
                          className="w-full mt-6 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                        >
                          رفتن به صفحه ورود
                        </button>
                      </div>
                    )}
                  </div>
                ))}

              {/* --- EMPLOYER FORM --- */}
              {userRole === "employer" &&
                (activeTab === "login" ? (
                  <form
                    onSubmit={handleEmployerLoginSubmit}
                    className="animate-fadeIn"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      ورود کارفرما
                    </h3>
                    <FormInput
                      name="phone"
                      type="tel"
                      placeholder="  ایمیل یا شماره تلفن"
                      icon={<Phone size={18} />}
                      value={employerLoginData.phone}
                      onChange={(e) =>
                        handleInputChange(setEmployerLoginData, e)
                      }
                      error={employerErrors.phone}
                    />
                    <FormInput
                      name="password"
                      type="password"
                      placeholder="رمز عبور"
                      icon={<Lock size={18} />}
                      value={employerLoginData.password}
                      onChange={(e) =>
                        handleInputChange(setEmployerLoginData, e)
                      }
                      error={employerErrors.password}
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                    >
                      ورود به حساب کاربری
                    </button>
                  </form>
                ) : (
                  <div>
                    {!isEmployerSubmitted ? (
                      <>
                        <div className="mb-8">
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${employerProgressPercentage[employerCurrentStep]}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-2 text-gray-400 px-1">
                            <span>اعتبارسنجی</span>
                            <span>اطلاعات فردی</span>
                            <span>اطلاعات شرکت</span>
                          </div>
                        </div>
                        <form onSubmit={handleEmployerRegisterSubmit}>
                          <div
                            className={`form-step ${
                              employerCurrentStep === 1 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              ثبت‌نام کارفرما
                            </h3>
                            <FormInput
                              name="contact"
                              type="tel"
                              placeholder=" ایمیل یا شماره تلفن"
                              icon={<Phone size={18} />}
                              value={employerRegisterData.contact}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              error={employerErrors.contact}
                            />
                            <button
                              type="button"
                              onClick={handleEmployerNextStep}
                              className="w-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                            >
                              ادامه
                            </button>
                          </div>
                          <div
                            className={`form-step ${
                              employerCurrentStep === 2 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              اعتبارسنجی
                            </h3>
                            <p className="text-center text-sm text-gray-400 mb-4">
                              کد ۶ رقمی ارسال شده به{" "}
                              <span className="font-bold text-yellow-400">
                                {employerRegisterData.contact}
                              </span>{" "}
                              را وارد کنید.
                            </p>
                            <FormInput
                              name="verificationCode"
                              type="text"
                              placeholder="کد تایید"
                              icon={<Hash size={18} />}
                              value={employerRegisterData.verificationCode}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              error={employerErrors.verificationCode}
                            />
                            <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={handleEmployerBackStep}
                                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                بازگشت
                              </button>
                              <button
                                type="button"
                                onClick={handleEmployerNextStep}
                                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                تایید
                              </button>
                            </div>
                          </div>
                          <div
                            className={`form-step ${
                              employerCurrentStep === 3 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              اطلاعات کارفرما
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <FormInput
                                name="firstName"
                                type="text"
                                placeholder="نام"
                                icon={<User size={18} />}
                                value={employerRegisterData.firstName}
                                onChange={(e) =>
                                  handleInputChange(setEmployerRegisterData, e)
                                }
                                error={employerErrors.firstName}
                              />
                              <FormInput
                                name="lastName"
                                type="text"
                                placeholder="نام خانوادگی"
                                icon={<User size={18} />}
                                value={employerRegisterData.lastName}
                                onChange={(e) =>
                                  handleInputChange(setEmployerRegisterData, e)
                                }
                                error={employerErrors.lastName}
                              />
                            </div>
                            <FormInput
                              name="password"
                              type="password"
                              placeholder="رمز عبور"
                              icon={<Lock size={18} />}
                              value={employerRegisterData.password}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              error={employerErrors.password}
                            />
                            <FormInput
                              name="confirmPassword"
                              type="password"
                              placeholder="تکرار رمز عبور"
                              icon={<Lock size={18} />}
                              value={employerRegisterData.confirmPassword}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              error={employerErrors.confirmPassword}
                            />
                            <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={handleEmployerBackStep}
                                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                بازگشت
                              </button>
                              <button
                                type="button"
                                onClick={handleEmployerNextStep}
                                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                ادامه
                              </button>
                            </div>
                          </div>
                          <div
                            className={`form-step ${
                              employerCurrentStep === 4 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              اطلاعات شرکت
                            </h3>
                            <FormInput
                              name="companyName"
                              type="text"
                              placeholder="نام شرکت"
                              icon={<Building size={18} />}
                              value={employerRegisterData.companyName}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              error={employerErrors.companyName}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <div className="relative">
                                <select
                                  name="companyField"
                                  value={employerRegisterData.companyField}
                                  onChange={(e) =>
                                    handleInputChange(
                                      setEmployerRegisterData,
                                      e
                                    )
                                  }
                                  className="bg-gray-700/50 border border-gray-600 text-gray-200 text-sm rounded-lg block w-full p-2.5 pr-10 appearance-none"
                                >
                                  <option>فناوری اطلاعات</option>
                                  <option>مالی</option>
                                  <option>مهندسی</option>
                                  <option>پزشکی</option>
                                  <option>هنر</option>
                                  <option>تولیدی</option>
                                </select>
                                <IconWrapper>
                                  <Briefcase size={18} />
                                </IconWrapper>
                              </div>
                              <FormInput
                                name="companyExperience"
                                type="number"
                                placeholder="سابقه (سال)"
                                icon={<Calendar size={18} />}
                                value={employerRegisterData.companyExperience}
                                onChange={(e) =>
                                  handleInputChange(setEmployerRegisterData, e)
                                }
                                error={employerErrors.companyExperience}
                              />
                            </div>
                            <FormInput
                              name="companyAddress"
                              type="text"
                              placeholder="آدرس شرکت یا استارتاپ"
                              icon={<MapPin size={18} />}
                              value={employerRegisterData.companyAddress}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              error={employerErrors.companyAddress}
                            />
                            <div className="flex gap-4 mt-4">
                              <button
                                type="button"
                                onClick={handleEmployerBackStep}
                                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                بازگشت
                              </button>
                              <button
                                type="submit"
                                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                              >
                                تکمیل ثبت‌نام
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div className="text-center animate-fadeIn">
                        <CheckCircle
                          className="mx-auto text-green-400"
                          size={64}
                        />
                        <h3 className="text-2xl font-bold mt-4">
                          ثبت‌نام کارفرما موفق بود!
                        </h3>
                        <p className="text-gray-400 mt-2">
                          حساب کاربری شما با موفقیت ایجاد شد.
                        </p>
                        <button
                          onClick={() => {
                            setActiveTab("login");
                            setIsEmployerSubmitted(false);
                          }}
                          className="w-full mt-6 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
                        >
                          رفتن به صفحه ورود
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Left Side - Image */}
      <div className="relative hidden lg:block">
        <img
          alt="محیط کاری مدرن"
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/75"></div>
        <div className="relative flex flex-col items-center justify-center h-full p-12 text-center">
          <h2 className="text-3xl font-bold text-white tracking-wider">
            آینده شغلی خود را بسازید
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            به بزرگترین جامعه متخصصین و کارفرمایان بپیوندید و موقعیت‌های شغلی یا
            نیروی متخصص متناسب با نیاز خود را پیدا کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
