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
  Briefcase,
  Smile,
  CheckCircle,
} from "lucide-react";
import FormInput from "@/components/ui/input/FormInput";

// You might need to install lucide-react: npm install lucide-react

export default function AuthPage() {
  const [userRole, setUserRole] = useState("specialist"); // 'specialist' or 'employer'
  const [activeTab, setActiveTab] = useState("login");

  // --- Specialist States ---
  const [currentStep, setCurrentStep] = useState(1);
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    phone: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
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
    phone: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
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

  const progressPercentage = { 1: 33, 2: 66, 3: 100 };
  const employerProgressPercentage = { 1: 33, 2: 66, 3: 100 };

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

  const handleKeyDown = (e, currentStepNum, nextStepHandler) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentStepNum < 3) {
        nextStepHandler();
      }
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
      if (!registerData.phone) newErrors.phone = "شماره تلفن الزامی است.";
      else if (!/^(09)\d{9}$/.test(registerData.phone))
        newErrors.phone = "فرمت شماره تلفن نامعتبر است.";
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
      if (!registerData.password || registerData.password.length < 8)
        newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
      if (registerData.password !== registerData.confirmPassword)
        newErrors.confirmPassword = "رمزهای عبور مطابقت ندارند.";
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
      if (!employerRegisterData.phone)
        newErrors.phone = "شماره تلفن الزامی است.";
      else if (!/^(09)\d{9}$/.test(employerRegisterData.phone))
        newErrors.phone = "فرمت شماره تلفن نامعتبر است.";
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
      className="min-h-screen  text-gray-200 grid grid-cols-1 lg:grid-cols-2"
      
    >
      {/* Right Side - Form */}
      <div className="relative flex items-center justify-center p-6 sm:p-12 lg:h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-900/30 animate-gradient-xy"></div>
        
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
                      placeholder="شماره تلفن"
                      icon={<Phone size={18} />}
                      value={loginData.phone}
                      onChange={(e) => handleInputChange(setLoginData, e)}
                      onKeyDown={(e) => handleKeyDown(e, 1, handleNextStep)}
                      error={errors.phone}
                    />
                    <FormInput
                      name="password"
                      type="password"
                      placeholder="رمز عبور"
                      icon={<Lock size={18} />}
                      value={loginData.password}
                      onChange={(e) => handleInputChange(setLoginData, e)}
                      onKeyDown={(e) => handleKeyDown(e, 1, handleNextStep)}
                      error={errors.password}
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300/50 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-300"
                    >
                      ورود به حساب کاربری
                    </button>
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
                            <span>شماره تلفن</span>
                            <span>کد تایید</span>
                            <span>اطلاعات فردی</span>
                          </div>
                        </div>
                        <form onSubmit={handleRegisterSubmit}>
                          <div
                            className={`form-step ${
                              currentStep === 1 ? "active" : ""
                            }`}
                          >
                            <h3 className="text-xl font-semibold mb-4 text-center">
                              ثبت‌نام متخصص
                            </h3>
                            <FormInput
                              name="phone"
                              type="tel"
                              placeholder="شماره تلفن"
                              icon={<Phone size={18} />}
                              value={registerData.phone}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, currentStep, handleNextStep)
                              }
                              error={errors.phone}
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
                              کد تایید
                            </h3>
                            <FormInput
                              name="verificationCode"
                              type="text"
                              placeholder="کد تایید"
                              icon={<Hash size={18} />}
                              value={registerData.verificationCode}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, currentStep, handleNextStep)
                              }
                              error={errors.verificationCode}
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
                                onKeyDown={(e) =>
                                  handleKeyDown(e, currentStep, handleNextStep)
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
                                onKeyDown={(e) =>
                                  handleKeyDown(e, currentStep, handleNextStep)
                                }
                                error={errors.lastName}
                              />
                            </div>
                            <FormInput
                              name="password"
                              type="password"
                              placeholder="رمز عبور"
                              icon={<Lock size={18} />}
                              value={registerData.password}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, currentStep, handleNextStep)
                              }
                              error={errors.password}
                            />
                            <FormInput
                              name="confirmPassword"
                              type="password"
                              placeholder="تکرار رمز عبور"
                              icon={<Lock size={18} />}
                              value={registerData.confirmPassword}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, currentStep, handleNextStep)
                              }
                              error={errors.confirmPassword}
                            />
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
                          ثبت‌نام متخصص با موفقیت انجام شد!
                        </h3>
                        <p className="text-gray-400 mt-2">
                          حساب کاربری شما با موفقیت ایجاد شد.
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
                      placeholder="شماره تلفن"
                      icon={<Phone size={18} />}
                      value={employerLoginData.phone}
                      onChange={(e) =>
                        handleInputChange(setEmployerLoginData, e)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, 1, handleEmployerNextStep)
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
                      onKeyDown={(e) =>
                        handleKeyDown(e, 1, handleEmployerNextStep)
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
                            <span>شماره تلفن</span>
                            <span>کد تایید</span>
                            <span>اطلاعات فردی</span>
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
                              name="phone"
                              type="tel"
                              placeholder="شماره تلفن"
                              icon={<Phone size={18} />}
                              value={employerRegisterData.phone}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(
                                  e,
                                  employerCurrentStep,
                                  handleEmployerNextStep
                                )
                              }
                              error={employerErrors.phone}
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
                              کد تایید
                            </h3>
                            <FormInput
                              name="verificationCode"
                              type="text"
                              placeholder="کد تایید"
                              icon={<Hash size={18} />}
                              value={employerRegisterData.verificationCode}
                              onChange={(e) =>
                                handleInputChange(setEmployerRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(
                                  e,
                                  employerCurrentStep,
                                  handleEmployerNextStep
                                )
                              }
                              error={employerErrors.verificationCode}
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
                              employerCurrentStep === 3 ? "active" : ""
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
                                value={employerRegisterData.firstName}
                                onChange={(e) =>
                                  handleInputChange(setEmployerRegisterData, e)
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    employerCurrentStep,
                                    handleEmployerNextStep
                                  )
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
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    employerCurrentStep,
                                    handleEmployerNextStep
                                  )
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
                              onKeyDown={(e) =>
                                handleKeyDown(
                                  e,
                                  employerCurrentStep,
                                  handleEmployerNextStep
                                )
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
                              onKeyDown={(e) =>
                                handleKeyDown(
                                  e,
                                  employerCurrentStep,
                                  handleEmployerNextStep
                                )
                              }
                              error={employerErrors.confirmPassword}
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
                          ثبت‌نام کارفرما با موفقیت انجام شد!
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
        <div className="absolute inset-0 bg-[#1e1e1e]/75"></div>
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
