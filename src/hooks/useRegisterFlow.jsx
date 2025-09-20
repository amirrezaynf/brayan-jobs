"use client";
import { useState, useEffect } from "react";

// Helper functions (you can also move these to a utils file)
const detectContactType = (value) => {
  const phonePattern = /^(09)\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phonePattern.test(value)) return "phone";
  if (emailPattern.test(value)) return "email";
  return null;
};

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

export default function useRegisterFlow(initialData) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const type = detectContactType(data.contact);
      if (!data.contact) newErrors.contact = "شماره تلفن یا ایمیل الزامی است.";
      else if (!type)
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

  const next = () => {
    if (validate()) {
      if (step === 1) {
        setResendTimer(60);
        setCanResend(false);
      }
      setStep((s) => s + 1);
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

  const resend = () => {
    if (canResend) {
      console.log("Resending code to:", data.contact);
      setResendTimer(60);
      setCanResend(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Register data:", data);
      setIsSubmitted(true);
    }
  };

  return {
    step,
    data,
    errors,
    isSubmitted,
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
