import Link from "next/link";
import { User, Lock, Hash, CheckCircle } from "lucide-react";

import FormInput from "@/components/ui/input/FormInput";

// --- Reusable Register Steps Component ---
export default function RegisterSteps({ flow, role }) {
  const {
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
  } = flow;

  const progress = { 1: 33, 2: 66, 3: 100 };

  if (isSubmitted) {
    return (
      <div className='text-center animate-fadeIn'>
        <CheckCircle className='mx-auto text-green-400' size={64} />
        <h3 className='text-2xl font-bold mt-4'>
          ثبت‌نام {role} با موفقیت انجام شد!
        </h3>
        <p className='text-gray-400 mt-2'>
          حساب کاربری شما با موفقیت ایجاد شد.
        </p>
        <button
          onClick={() => {
            setStep(1);
            setIsSubmitted(false);
          }}
          className='w-full mt-6 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center'>
          رفتن به صفحه ورود
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Progress bar */}
      <div className='mb-8'>
        <div className='w-full bg-gray-700 rounded-full h-2.5'>
          <div
            className='bg-yellow-400 h-2.5 rounded-full transition-all duration-500'
            style={{ width: `${progress[step]}%` }}></div>
        </div>
        <div className='flex justify-between text-xs mt-2 text-gray-400 px-1'>
          <span>شماره تلفن</span>
          <span>کد تایید</span>
          <span>اطلاعات فردی</span>
        </div>
      </div>

      {/* Steps */}
      <form onSubmit={submit}>
        {step === 1 && (
          <>
            <FormInput
              name='contact'
              type='text'
              placeholder='شماره تلفن یا ایمیل'
              icon={<User size={18} />}
              value={data.contact}
              onChange={handleChange}
              error={errors.contact}
            />
            <button
              type='button'
              onClick={next}
              className='w-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center'>
              ادامه
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <FormInput
              name='verificationCode'
              type='text'
              placeholder='کد تایید'
              icon={<Hash size={18} />}
              value={data.verificationCode}
              onChange={handleChange}
              error={errors.verificationCode}
            />
            <div className='flex gap-4 mt-4'>
              <button
                type='button'
                onClick={back}
                className='w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3'>
                بازگشت
              </button>
              <button
                type='button'
                onClick={next}
                className='w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3'>
                ادامه
              </button>
            </div>
            <div className='flex justify-between mt-4 text-sm text-gray-400'>
              <button type='button' onClick={() => setStep(1)}>
                ویرایش شماره تلفن یا ایمیل
              </button>
              <button
                type='button'
                onClick={resend}
                disabled={!canResend}
                className={!canResend ? "opacity-50" : ""}>
                {canResend
                  ? "ارسال مجدد کد"
                  : `ارسال مجدد کد (${resendTimer} ثانیه)`}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className='grid grid-cols-2 gap-4'>
              <FormInput
                name='firstName'
                type='text'
                placeholder='نام'
                icon={<User size={18} />}
                value={data.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <FormInput
                name='lastName'
                type='text'
                placeholder='نام خانوادگی'
                icon={<User size={18} />}
                value={data.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
            <FormInput
              name='password'
              type='password'
              placeholder='رمز عبور'
              icon={<Lock size={18} />}
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <FormInput
              name='confirmPassword'
              type='password'
              placeholder='تکرار رمز عبور'
              icon={<Lock size={18} />}
              value={data.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <div className='flex gap-4 mt-4'>
              <button
                type='button'
                onClick={back}
                className='w-1/2 text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3'>
                بازگشت
              </button>
              <button
                type='submit'
                className='w-1/2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3'>
                تکمیل ثبت‌نام
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
