"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  registerStep1,
  registerStep2,
  registerStep3,
  registerStep4,
  resendVerificationCode,
} from "@/app/_action/auth";
import {
  validateContact,
  validatePassword as serverValidatePassword,
  getRoleNumber,
  detectContactType,
} from "@/utils/auth";

const validatePassword = (password) => {
  return serverValidatePassword(password);
};

export default function useRegisterFlow(initialData, role = "specialist") {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) {
            setCanResend(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (step === 1) {
      const contactValidation = validateContact(data.contact);
      if (!data.contact) newErrors.contact = "شماره تلفن یا ایمیل الزامی است.";
      else if (!contactValidation.isValid)
        newErrors.contact = "فرمت شماره تلفن یا ایمیل نامعتبر است.";
    }
    if (step === 2) {
      if (!data.verificationCode || data.verificationCode.length < 6)
        newErrors.verificationCode = "کد تایید باید ۶ رقم باشد.";
    }
    if (step === 3) {
      if (!data.firstName) newErrors.firstName = "نام الزامی است.";
      if (!data.lastName) newErrors.lastName = "نام خانوادگی الزامی است.";
      const pwErrors = validatePassword(data.password);
      if (pwErrors.length > 0) newErrors.password = pwErrors.join(", ");
      if (data.password !== data.confirmPassword)
        newErrors.confirmPassword = "رمزهای عبور مطابقت ندارند.";
    }
    if (step === 4) {
      // Validation for specialist fields
      if (data.fieldOfActivity !== undefined) {
        if (!data.fieldOfActivity)
          newErrors.fieldOfActivity = "حوزه فعالیت الزامی است.";
        if (!data.age) newErrors.age = "سن الزامی است.";
        if (!data.education) newErrors.education = "مدرک تحصیلی الزامی است.";
      }
      // Validation for employer fields
      if (data.companyName !== undefined) {
        if (!data.companyName) newErrors.companyName = "نام شرکت الزامی است.";
        if (!data.companyField)
          newErrors.companyField = "حوزه فعالیت شرکت الزامی است.";
        if (!data.companyExperience)
          newErrors.companyExperience = "سابقه فعالیت شرکت الزامی است.";
        if (!data.companySize)
          newErrors.companySize = "تعداد پرسنل شرکت الزامی است.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (step === 1) {
        // Call API for step 1
        const result = await registerStep1(data.contact);

        if (result.success) {
          setResendTimer(60);
          setCanResend(false);
          setStep((s) => s + 1);
        } else {
          setErrors({ contact: result.error });
        }
      } else if (step === 2) {
        // Call API for step 2
        const result = await registerStep2(data.contact, data.verificationCode);

        if (result.success) {
          setStep((s) => s + 1);
        } else {
          setErrors({ verificationCode: result.error });
        }
      } else if (step === 3) {
        // Call API for step 3
        const formData = {
          contact: data.contact,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: getRoleNumber(role),
        };

        const result = await registerStep3(formData);

        if (result.success) {
          setAuthToken(result.token);
          setStep((s) => s + 1);
        } else {
          setErrors({ general: result.error });
        }
      } else {
        setStep((s) => s + 1);
      }
    } catch (error) {
      setErrors({ general: "خطا در ارتباط با سرور" });
    } finally {
      setIsLoading(false);
    }
  };

  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
    if (step === 2) {
      setResendTimer(0);
      setCanResend(false);
    }
  };

  const resend = async () => {
    if (!canResend) return;

    setIsLoading(true);

    try {
      const result = await resendVerificationCode(data.contact);

      if (result.success) {
        setResendTimer(60);
        setCanResend(false);
      } else {
        setErrors({ verificationCode: result.error });
      }
    } catch (error) {
      setErrors({ verificationCode: "خطا در ارسال مجدد کد" });
    } finally {
      setIsLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Prepare step 4 data based on role
      let step4Data = {};

      if (role === "specialist") {
        step4Data = {
          field_of_activity: data.fieldOfActivity,
          age: parseInt(data.age),
          education: data.education,
        };
      } else if (role === "employer") {
        step4Data = {
          company_name: data.companyName,
          company_field: data.companyField,
          company_experience: parseInt(data.companyExperience),
          company_size: data.companySize,
        };
      }

      const result = await registerStep4(step4Data, authToken);

      if (result.success) {
        setIsSubmitted(true);
        // Redirect to appropriate dashboard
        const redirectUrl = role === "employer" ? "/dashboard" : "/karjoo";
        setTimeout(() => {
          router.push(redirectUrl);
        }, 2000); // Give user time to see success message
      } else {
        // Convert technical error messages to user-friendly Persian
        let userFriendlyError = "خطا در تکمیل ثبت نام";

        if (result.error && typeof result.error === "string") {
          if (
            result.error.includes("fillable") ||
            result.error.includes("mass assignment")
          ) {
            userFriendlyError = "خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.";
          } else if (result.error.includes("validation")) {
            userFriendlyError = "اطلاعات وارد شده صحیح نیست. لطفاً بررسی کنید.";
          } else if (
            result.error.includes("unauthorized") ||
            result.error.includes("token")
          ) {
            userFriendlyError =
              "جلسه شما منقضی شده است. لطفاً مجدداً ثبت نام کنید.";
          } else if (
            result.error.includes("server") ||
            result.error.includes("500")
          ) {
            userFriendlyError = "خطا در سرور. لطفاً چند دقیقه دیگر تلاش کنید.";
          }
        }

        setErrors({ general: userFriendlyError });
      }
    } catch (error) {
      setErrors({
        general:
          "خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    data,
    errors,
    isSubmitted,
    isLoading,
    resendTimer,
    canResend,
    handleChange,
    next,
    back,
    resend,
    submit,
    setStep,
    setIsSubmitted,
  };
}
