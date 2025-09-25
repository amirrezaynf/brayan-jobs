import {
  User,
  Lock,
  Hash,
  CheckCircle,
  Briefcase,
  Building,
  GraduationCap,
  MapPin,
  Calendar,
  Users,
  Loader2,
} from "lucide-react";

import FormInput from "@/components/ui/input/FormInput";

// --- Reusable Register Steps Component ---
export default function RegisterSteps({ flow, role }) {
  const {
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
  } = flow;

  const progress = { 1: 25, 2: 50, 3: 75, 4: 100 };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 4) {
      submit(e);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step < 4) {
        next();
      } else {
        submit(e);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center animate-fadeIn">
        <CheckCircle className="mx-auto text-green-400" size={64} />
        <h3 className="text-2xl font-bold mt-4">
          ثبت‌نام {role === "jobSeeker" ? "متخصص" : "کارفرما"} با موفقیت انجام
          شد!
        </h3>
        <p className="text-gray-400 mt-2">
          حساب کاربری شما با موفقیت ایجاد شد.
        </p>
        <button
          onClick={() => {
            setStep(1);
            setIsSubmitted(false);
          }}
          className="w-full mt-6 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          رفتن به صفحه ورود
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress[step]}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-2 text-gray-400 px-1">
          <span>شماره تلفن</span>
          <span>کد تایید</span>
          <span>اطلاعات فردی</span>
          <span>اطلاعات تکمیلی</span>
        </div>
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm text-center">{errors.general}</p>
        </div>
      )}

      {/* Steps */}
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {step === 1 && (
          <>
            <FormInput
              name="contact"
              type="text"
              placeholder="شماره تلفن یا ایمیل"
              icon={<User size={18} />}
              value={data.contact}
              onChange={handleChange}
              error={errors.contact}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={next}
              disabled={isLoading}
              className="w-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  در حال ارسال...
                </>
              ) : (
                "ادامه"
              )}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <FormInput
              name="verificationCode"
              type="text"
              placeholder="کد تایید"
              icon={<Hash size={18} />}
              value={data.verificationCode}
              onChange={handleChange}
              error={errors.verificationCode}
              disabled={isLoading}
            />
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={back}
                disabled={isLoading}
                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={next}
                disabled={isLoading}
                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    تایید...
                  </>
                ) : (
                  "ادامه"
                )}
              </button>
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="cursor-pointer font-bold"
              >
                ویرایش شماره تلفن یا ایمیل
              </button>
              <button
                type="button"
                onClick={resend}
                disabled={!canResend || isLoading}
                className={!canResend || isLoading ? "opacity-50" : ""}
              >
                {isLoading
                  ? "در حال ارسال..."
                  : canResend
                  ? "ارسال مجدد کد"
                  : `ارسال مجدد کد (${resendTimer} ثانیه)`}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="firstName"
                type="text"
                placeholder="نام"
                icon={<User size={18} />}
                value={data.firstName}
                onChange={handleChange}
                error={errors.firstName}
                disabled={isLoading}
              />
              <FormInput
                name="lastName"
                type="text"
                placeholder="نام خانوادگی"
                icon={<User size={18} />}
                value={data.lastName}
                onChange={handleChange}
                error={errors.lastName}
                disabled={isLoading}
              />
            </div>
            <FormInput
              name="password"
              type="password"
              placeholder="رمز عبور"
              icon={<Lock size={18} />}
              value={data.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
            />
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="تکرار رمز عبور"
              icon={<Lock size={18} />}
              value={data.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={isLoading}
            />
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={back}
                disabled={true}
                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3"
                title="پس از وارد کردن اطلاعات فردی، بازگشت غیرفعال است"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={next}
                disabled={isLoading}
                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    ثبت نام...
                  </>
                ) : (
                  "ادامه"
                )}
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            {role === "jobSeeker" && (
              <>
                {/* حوزه فعالیت - ردیف اول */}
                <FormInput
                  name="fieldOfActivity"
                  type="select"
                  placeholder=" حوزه فعالیت  "
                  icon={<Briefcase size={18} />}
                  value={data.fieldOfActivity}
                  onChange={handleChange}
                  error={errors.fieldOfActivity}
                  options={[
                    "فناوری اطلاعات",
                    "مهندسی",
                    "انرژی",
                    "محیط زیست",
                    "سایر",
                  ]}
                  disabled={isLoading}
                />

                {/* سن و مدرک تحصیلی - ردیف دوم */}
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="age"
                    type="select"
                    placeholder="سن    "
                    icon={<Calendar size={18} />}
                    value={data.age}
                    onChange={handleChange}
                    error={errors.age}
                    options={Array.from(
                      { length: 50 },
                      (_, i) => `${18 + i} سال`
                    )}
                    disabled={isLoading}
                  />
                  <FormInput
                    name="education"
                    type="select"
                    placeholder="مدرک تحصیلی "
                    icon={<GraduationCap size={18} />}
                    value={data.education}
                    onChange={handleChange}
                    error={errors.education}
                    options={[
                      "دیپلم",
                      "کاردانی",
                      "کارشناسی",
                      "کارشناسی ارشد",
                      "دکتری",
                      "فوق دکتری",
                    ]}
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            {role === "employer" && (
              <>
                {/* نام شرکت - ردیف اول */}
                <FormInput
                  name="companyName"
                  type="text"
                  placeholder="نام شرکت"
                  icon={<Building size={18} />}
                  value={data.companyName}
                  onChange={handleChange}
                  error={errors.companyName}
                  disabled={isLoading}
                />

                {/* حوزه فعالیت و سابقه - ردیف دوم */}
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="companyField"
                    type="select"
                    placeholder="حوزه فعالیت شرکت "
                    icon={<Briefcase size={18} />}
                    value={data.companyField}
                    onChange={handleChange}
                    error={errors.companyField}
                    options={[
                      "فناوری اطلاعات",
                      "مهندسی",
                      "پزشکی",
                      "حقوقی",
                      "مالی و حسابداری",
                      "محیط زیست",
                      "سایر",
                    ]}
                    disabled={isLoading}
                  />
                  <FormInput
                    name="companyExperience"
                    type="number"
                    placeholder="سابقه فعالیت شرکت  "
                    icon={<Calendar size={18} />}
                    value={data.companyExperience}
                    onChange={handleChange}
                    error={errors.companyExperience}
                    disabled={isLoading}
                  />
                </div>

                {/* تعداد پرسنل شرکت - ردیف سوم */}
                <FormInput
                  name="companySize"
                  type="select"
                  placeholder="تعداد پرسنل شرکت"
                  icon={<Users size={18} />}
                  value={data.companySize}
                  onChange={handleChange}
                  error={errors.companySize}
                  options={[
                    "1 تا 10 نفر",
                    "11 تا 50 نفر",
                    "51 تا 100 نفر",
                    "101 تا 500 نفر",
                    "بیش از 500 نفر",
                  ]}
                  disabled={isLoading}
                />
              </>
            )}

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={back}
                disabled={isLoading}
                className="w-1/2 text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3"
              >
                بازگشت
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    ثبت نام...
                  </>
                ) : (
                  "تکمیل ثبت‌نام"
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
