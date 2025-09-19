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
  Edit2,
  RefreshCw,
} from "lucide-react";
import FormInput from "@/components/ui/input/FormInput";

// You might need to install lucide-react: npm install lucide-react

export default function AuthPage() {
  const [userRole, setUserRole] = useState("specialist"); // 'specialist' or 'employer'
  const [activeTab, setActiveTab] = useState("login");

  // Resend code timer states
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // --- Specialist States ---
  const [currentStep, setCurrentStep] = useState(1);
  const [loginData, setLoginData] = useState({ contact: "", password: "" });
  const [registerData, setRegisterData] = useState({
    contact: "", // Combined field for phone or email
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
    contact: "",
    password: "",
  });
  const [employerRegisterData, setEmployerRegisterData] = useState({
    contact: "", // Combined field for phone or email
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [employerErrors, setEmployerErrors] = useState({});
  const [isEmployerSubmitted, setIsEmployerSubmitted] = useState(false);

  // Helper function to detect if input is phone or email
  const detectContactType = (value) => {
    const phonePattern = /^(09)\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (phonePattern.test(value)) return "phone";
    if (emailPattern.test(value)) return "email";
    return null;
  };

  // Enhanced password validation function
  const validatePassword = (password) => {
    const errors = [];

    if (!password || password.length < 8) {
      errors.push("رمز عبور باید حداقل ۸ کاراکتر باشد");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push(
        "رمز عبور باید حداقل یک کاراکتر ویژه (@، #، !، و...) داشته باشد"
      );
    }

    return errors;
  };

  // Timer effect for resend code
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((timer) => {
          if (timer <= 1) {
            setCanResend(true);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Effect to reset forms when switching roles or tabs
  useEffect(() => {
    setCurrentStep(1);
    setErrors({});
    setIsSubmitted(false);
    setEmployerCurrentStep(1);
    setEmployerErrors({});
    setIsEmployerSubmitted(false);
    setResendTimer(0);
    setCanResend(false);
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
    if (validateStep()) {
      setCurrentStep((p) => p + 1);
      // Start timer when moving to verification step
      if (currentStep === 1) {
        setResendTimer(60);
        setCanResend(false);
      }
    }
  };

  const handleBackStep = () => {
    setCurrentStep((p) => p - 1);
    setErrors({});
    // Reset timer when going back
    if (currentStep === 2) {
      setResendTimer(0);
      setCanResend(false);
    }
  };

  const handleEditContact = () => {
    setCurrentStep(1);
    setErrors({});
    setResendTimer(0);
    setCanResend(false);
  };

  const handleResendCode = () => {
    if (canResend) {
      // Simulate sending code
      console.log("Resending verification code to:", registerData.contact);
      setResendTimer(60);
      setCanResend(false);
      // You can add actual API call here
    }
  };

  const validateStep = () => {
    let newErrors = {};
    if (currentStep === 1) {
      const contactType = detectContactType(registerData.contact);
      if (!registerData.contact)
        newErrors.contact = "شماره تلفن یا ایمیل الزامی است.";
      else if (!contactType)
        newErrors.contact = "فرمت شماره تلفن یا ایمیل نامعتبر است.";
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
      const passwordErrors = validatePassword(registerData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors.join(", ");
      }
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
    if (validateEmployerStep()) {
      setEmployerCurrentStep((p) => p + 1);
      // Start timer when moving to verification step
      if (employerCurrentStep === 1) {
        setResendTimer(60);
        setCanResend(false);
      }
    }
  };

  const handleEmployerBackStep = () => {
    setEmployerCurrentStep((p) => p - 1);
    setEmployerErrors({});
    // Reset timer when going back
    if (employerCurrentStep === 2) {
      setResendTimer(0);
      setCanResend(false);
    }
  };

  const handleEmployerEditContact = () => {
    setEmployerCurrentStep(1);
    setEmployerErrors({});
    setResendTimer(0);
    setCanResend(false);
  };

  const handleEmployerResendCode = () => {
    if (canResend) {
      // Simulate sending code
      console.log(
        "Resending verification code to:",
        employerRegisterData.contact
      );
      setResendTimer(60);
      setCanResend(false);
      // You can add actual API call here
    }
  };

  const validateEmployerStep = () => {
    let newErrors = {};
    if (employerCurrentStep === 1) {
      const contactType = detectContactType(employerRegisterData.contact);
      if (!employerRegisterData.contact)
        newErrors.contact = "شماره تلفن یا ایمیل الزامی است.";
      else if (!contactType)
        newErrors.contact = "فرمت شماره تلفن یا ایمیل نامعتبر است.";
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
      const passwordErrors = validatePassword(employerRegisterData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors.join(", ");
      }
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
    <div className="min-h-screen  text-gray-200 grid grid-cols-1 lg:grid-cols-2">
      {/* Right Side - Form */}
      <div className="bg-gray-900 relative flex items-center justify-center p-6 sm:p-12 lg:h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-900/30 animate-gradient-xy"></div>

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-8">
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
                      name="contact"
                      type="text"
                      placeholder="شماره تلفن یا ایمیل"
                      icon={<User size={18} />}
                      value={loginData.contact}
                      onChange={(e) => handleInputChange(setLoginData, e)}
                      onKeyDown={(e) => handleKeyDown(e, 1, handleNextStep)}
                      error={errors.contact}
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
                            
                            <FormInput
                              name="contact"
                              type="text"
                              placeholder="شماره تلفن یا ایمیل"
                              icon={<User size={18} />}
                              value={registerData.contact}
                              onChange={(e) =>
                                handleInputChange(setRegisterData, e)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, currentStep, handleNextStep)
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
                            <div className="flex gap-4 mt-4">
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
                            <div className="flex justify-between mt-4">
                              <button
                                type="button"
                                onClick={handleEditContact}
                                className="text-gray-400 text-sm"
                              >
                                ویرایش شماره تلفن یا ایمیل
                              </button>
                              <button
                                type="button"
                                onClick={handleResendCode}
                                className={`text-gray-400 text-sm ${
                                  canResend ? "" : "opacity-50"
                                }`}
                              >
                                {canResend ? (
                                  <span>ارسال مجدد کد</span>
                                ) : (
                                  <span>
                                    ارسال مجدد کد ({resendTimer}
                                    ثانیه)
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                          <div
                            className={`form-step ${
                              currentStep === 3 ? "active" : ""
                            }`}
                          >
                           
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
                    <FormInput
                      name="contact"
                      type="text"
                      placeholder="شماره تلفن یا ایمیل"
                      icon={<User size={18} />}
                      value={employerLoginData.contact}
                      onChange={(e) =>
                        handleInputChange(setEmployerLoginData, e)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, 1, handleEmployerNextStep)
                      }
                      error={employerErrors.contact}
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
                            
                            <FormInput
                              name="contact"
                              type="text"
                              placeholder="شماره تلفن یا ایمیل"
                              icon={<User size={18} />}
                              value={employerRegisterData.contact}
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
                            <div className="flex gap-4 mt-4">
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
                            <div className="flex justify-between mt-4">
                              <button
                                type="button"
                                onClick={handleEmployerEditContact}
                                className="text-gray-400 text-sm"
                              >
                                ویرایش شماره تلفن یا ایمیل
                              </button>
                              <button
                                type="button"
                                onClick={handleEmployerResendCode}
                                className={`text-gray-400 text-sm ${
                                  canResend ? "" : "opacity-50"
                                }`}
                              >
                                {canResend ? (
                                  <span>ارسال مجدد کد</span>
                                ) : (
                                  <span>
                                    ارسال مجدد کد ({resendTimer}
                                    ثانیه)
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                          <div
                            className={`form-step ${
                              employerCurrentStep === 3 ? "active" : ""
                            }`}
                          >
                            
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
