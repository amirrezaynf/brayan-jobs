"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  registerStep1,
  registerStep2,
  registerStep3,
  registerStep4,
  resendVerificationCode,
} from "@/app/actions/auth";
import {
  validateContact,
  validatePassword as serverValidatePassword,
  getRoleNumber,
  detectContactType,
} from "@/utils/auth";

const validatePassword = (password) => {
  return serverValidatePassword(password);
};

export default function useRegisterFlow(initialData, role = "jobSeeker") {
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
    // If user edits contact at early steps, drop any temp token to avoid stale state
    if (name === "contact" && authToken) {
      setAuthToken(null);
    }
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
      // Validation for jobSeeker fields
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
          // Starting over a fresh flow; ensure any old temp token is cleared
          if (authToken) setAuthToken(null);
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
    const newStep = Math.max(1, step - 1);
    setStep(newStep);
    setErrors({});
    if (step === 2) {
      setResendTimer(0);
      setCanResend(false);
    }
    // If user navigates back before step 3, drop any temporary token
    if (newStep < 3 && authToken) {
      setAuthToken(null);
    }
  };

  // Safety: if step is externally reset to 1, clear any temp token
  useEffect(() => {
    if (step === 1 && authToken) {
      setAuthToken(null);
    }
  }, [step]);

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
      // Ensure we have an auth token from step 3 before proceeding
      if (!authToken) {
        setErrors({
          general:
            "جلسه شما منقضی شده است. لطفاً از ابتدا وارد فرآیند ثبت‌نام شوید.",
        });
        return;
      }

      // Prepare step 4 data based on role
      let step4Data = {};

      if (role === "jobSeeker") {
        console.log()

        step4Data = {
          fieldOfActivity: data.fieldOfActivity,
          age: (() => {
            const parsed = parseInt(data.age, 10);
            return Number.isNaN(parsed) ? null : parsed;
          })(),
          education: data.education,
        };

        // Guard against invalid age
        if (step4Data.age === null) {
          setErrors({ age: "سن نامعتبر است." });
          return;
        }
      } else if (role === "employer") {
        // Normalize numeric fields and validate
        const experience = parseInt(data.companyExperience, 10);
        if (Number.isNaN(experience)) {
          setErrors({ companyExperience: "سابقه فعالیت نامعتبر است." });
          return;
        }

        step4Data = {
          companyName: data.companyName,
          companyField: data.companyField,
          companyExperience: experience,
          companySize: data.companySize,
        };
      }

      const result = await registerStep4(step4Data, authToken);

      if (result.success) {
        setIsSubmitted(true);
        // Redirect to appropriate dashboard
        const redirectUrl = role === "employer" ? "/employer" : "/karjoo";
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
