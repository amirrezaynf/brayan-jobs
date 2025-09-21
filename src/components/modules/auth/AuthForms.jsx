"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthTab from "@/components/ui/tabs/AuthTab";
import RegisterSteps from "./RegisterSteps";
import LoginForm from "./LoginForm";
import useRegisterFlow from "@/hooks/useRegisterFlow";
import { login } from "@/app/_action/auth";

// --- Main AuthForms Component ---
export default function AuthForms() {
  const router = useRouter();
  const [userRole, setUserRole] = useState("specialist");
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [employerErrors, setEmployerErrors] = useState({});

  // Login data states
  const [loginData, setLoginData] = useState({
    contact: "",
    password: "",
  });

  const [employerLoginData, setEmployerLoginData] = useState({
    contact: "",
    password: "",
  });

  // Register flows for both user types
  const specialistRegisterFlow = useRegisterFlow(
    {
      contact: "",
      verificationCode: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      fieldOfActivity: "",
      age: "",
      education: "",
    },
    "specialist"
  );

  const employerRegisterFlow = useRegisterFlow(
    {
      contact: "",
      verificationCode: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companyField: "",
      companyExperience: "",
      companySize: "",
    },
    "employer"
  );

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(loginData.contact, loginData.password);

      if (result.success) {
        // Redirect based on user role
        const redirectUrl = result.user.role === 2 ? "/employer" : "/karjoo";
        router.push(redirectUrl);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: "خطا در ورود به سیستم" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployerLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmployerErrors({});

    try {
      const result = await login(
        employerLoginData.contact,
        employerLoginData.password
      );

      if (result.success) {
        // Redirect based on user role
        const redirectUrl = result.user.role === 2 ? "/dashboard" : "/karjoo";
        router.push(redirectUrl);
      } else {
        setEmployerErrors({ general: result.error });
      }
    } catch (error) {
      setEmployerErrors({ general: "خطا در ورود به سیستم" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

        {/* Role Tabs */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <AuthTab
            onClick={() => setUserRole("specialist")}
            className={
              userRole === "specialist"
                ? "bg-yellow-400 text-gray-900 font-bold shadow-lg"
                : "bg-gray-700/50 text-gray-300"
            }
            title="متخصص هستم"
          />
          <AuthTab
            onClick={() => setUserRole("employer")}
            className={
              userRole === "employer"
                ? "bg-yellow-400 text-gray-900 font-bold shadow-lg"
                : "bg-gray-700/50 text-gray-300"
            }
            title="کارفرما هستم"
          />
        </div>

        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
          <div className="flex">
            <AuthTab
              variant="secondary"
              onClick={() => setActiveTab("login")}
              className={
                activeTab === "login"
                  ? "bg-yellow-400/10 border-b-2 border-yellow-400 text-white"
                  : "text-gray-400"
              }
              title="ورود"
            />
            <AuthTab
              variant="secondary"
              onClick={() => setActiveTab("register")}
              className={
                activeTab === "register"
                  ? "bg-yellow-400/10 border-b-2 border-yellow-400 text-white"
                  : "text-gray-400"
              }
              title="ثبت نام"
            />
          </div>

          <div className="p-8">
            {/* Specialist */}
            {userRole === "specialist" &&
              (activeTab === "login" ? (
                <LoginForm
                  data={loginData}
                  setData={setLoginData}
                  errors={errors}
                  isLoading={isLoading}
                  onSubmit={handleLoginSubmit}
                />
              ) : (
                <RegisterSteps
                  flow={specialistRegisterFlow}
                  role="specialist"
                />
              ))}

            {/* Employer */}
            {userRole === "employer" &&
              (activeTab === "login" ? (
                <LoginForm
                  data={employerLoginData}
                  setData={setEmployerLoginData}
                  errors={employerErrors}
                  isLoading={isLoading}
                  onSubmit={handleEmployerLoginSubmit}
                />
              ) : (
                <RegisterSteps flow={employerRegisterFlow} role="employer" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
