"use client";
import { useState } from "react";

import AuthTab from "@/components/ui/tabs/AuthTab";
import RegisterSteps from "./RegisterSteps";
import LoginForm from "./LoginForm";
import useRegisterFlow from "@/hooks/useRegisterFlow";

// --- Main AuthForms Component ---
export default function AuthForms() {
  const [userRole, setUserRole] = useState("specialist");
  const [activeTab, setActiveTab] = useState("login");

  // login states
  const [loginData, setLoginData] = useState({ contact: "", password: "" });
  const [employerLoginData, setEmployerLoginData] = useState({
    contact: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [employerErrors, setEmployerErrors] = useState({});

  // register flows
  const specialistFlow = useRegisterFlow({
    contact: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const employerFlow = useRegisterFlow({
    contact: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login specialist:", loginData);
    alert("ورود متخصص با موفقیت انجام شد!");
  };

  const handleEmployerLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login employer:", employerLoginData);
    alert("ورود کارفرما با موفقیت انجام شد!");
  };

  return (
    <div className='bg-gray-900 relative flex items-center justify-center p-6 sm:p-12 lg:h-screen'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-900/30 animate-gradient-xy'></div>

      <div className='w-full max-w-md z-10'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-yellow-400 tracking-wider'>
            دکتر برایان اعتماد
          </h1>
          <p className='text-gray-400 mt-2'>
            پلتفرم کاریابی متخصصین و کارفرمایان
          </p>
        </div>

        {/* Role Tabs */}
        <div className='flex items-center justify-center gap-4 mb-6'>
          <AuthTab
            onClick={() => setUserRole("specialist")}
            className={
              userRole === "specialist"
                ? "bg-yellow-400 text-gray-900 font-bold shadow-lg"
                : "bg-gray-700/50 text-gray-300"
            }
            title='متخصص هستم'
          />
          <AuthTab
            onClick={() => setUserRole("employer")}
            className={
              userRole === "employer"
                ? "bg-yellow-400 text-gray-900 font-bold shadow-lg"
                : "bg-gray-700/50 text-gray-300"
            }
            title='کارفرما هستم'
          />
        </div>

        <div className='bg-gray-800/60 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden'>
          <div className='flex'>
            <AuthTab
              variant='secondary'
              onClick={() => setActiveTab("login")}
              className={
                activeTab === "login"
                  ? "bg-yellow-400/10 border-b-2 border-yellow-400 text-white"
                  : "text-gray-400"
              }
              title='ورود'
            />
            <AuthTab
              variant='secondary'
              onClick={() => setActiveTab("register")}
              className={
                activeTab === "register"
                  ? "bg-yellow-400/10 border-b-2 border-yellow-400 text-white"
                  : "text-gray-400"
              }
              title='ثبت نام'
            />
          </div>

          <div className='p-8'>
            {/* Specialist */}
            {userRole === "specialist" &&
              (activeTab === "login" ? (
                <LoginForm
                  data={loginData}
                  setData={setLoginData}
                  errors={errors}
                  onSubmit={handleLoginSubmit}
                />
              ) : (
                <RegisterSteps flow={specialistFlow} role='متخصص' />
              ))}

            {/* Employer */}
            {userRole === "employer" &&
              (activeTab === "login" ? (
                <LoginForm
                  data={employerLoginData}
                  setData={setEmployerLoginData}
                  errors={employerErrors}
                  onSubmit={handleEmployerLoginSubmit}
                />
              ) : (
                <RegisterSteps flow={employerFlow} role='کارفرما' />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
