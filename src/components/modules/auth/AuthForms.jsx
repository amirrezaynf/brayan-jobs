"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import AuthTab from "@/components/ui/tabs/AuthTab";
import RegisterSteps from "./RegisterSteps";
import LoginForm from "./LoginForm";
import useRegisterFlow from "@/hooks/useRegisterFlow";

export default function AuthForms() {
  const router = useRouter();
  const { data: session } = useSession();

  const [userRole, setUserRole] = useState("specialist");
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [employerErrors, setEmployerErrors] = useState({});

  const [loginData, setLoginData] = useState({ contact: "", password: "" });
  const [employerLoginData, setEmployerLoginData] = useState({ contact: "", password: "" });

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

  // Redirect if session exists
  useEffect(() => {
    if (session?.user) {
      console.log("✅ Session user:", session.user);
      console.log("✅ AccessToken:", session.accessToken);

      const role = session.user.role;
      if (role === 2) router.push("/employer");
      else router.push("/karjoo");
    }
  }, [session, router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn("credentials", {
        redirect: false,
        mode: "login",
        contact: loginData.contact,
        password: loginData.password,
      });

      console.log("💡 Login result:", result);
      if (result?.error) setErrors({ general: result.error });
    } catch (err) {
      console.error(err);
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
      const result = await signIn("credentials", {
        redirect: false,
        mode: "login",
        contact: employerLoginData.contact,
        password: employerLoginData.password,
      });

      console.log("💡 Employer Login result:", result);
      if (result?.error) setEmployerErrors({ general: result.error });
    } catch (err) {
      console.error(err);
      setEmployerErrors({ general: "خطا در ورود به سیستم" });
    } finally {
      setIsLoading(false);
    }
  };  

  const handleRegisterStep3 = async (flowData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        mode: "register",
        contact: flowData.contact,
        firstName: flowData.firstName,
        lastName: flowData.lastName,
        password: flowData.password,
        confirmPassword: flowData.confirmPassword,
        role: userRole,
      });

      console.log("💡 Register Step3 result:", result);
      if (result?.error) setErrors({ general: result.error });
    } catch (err) {
      console.error(err);
      setErrors({ general: "خطا در ثبت‌نام" });
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

        {/* Auth Tabs */}
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
                  onComplete={handleRegisterStep3}
                />
              ))}

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
                <RegisterSteps
                  flow={employerRegisterFlow}
                  role="employer"
                  onComplete={handleRegisterStep3}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
