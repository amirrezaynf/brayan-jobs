import Link from "next/link";
import { User, Lock, Hash, CheckCircle } from "lucide-react";

import FormInput from "@/components/ui/input/FormInput";

// --- Reusable Login Form ---
export default function LoginForm({ data, setData, errors, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className='animate-fadeIn'>
      <FormInput
        name='contact'
        type='text'
        placeholder='شماره تلفن یا ایمیل'
        icon={<User size={18} />}
        value={data.contact}
        onChange={(e) => setData((p) => ({ ...p, contact: e.target.value }))}
        error={errors.contact}
      />
      <FormInput
        name='password'
        type='password'
        placeholder='رمز عبور'
        icon={<Lock size={18} />}
        value={data.password}
        onChange={(e) => setData((p) => ({ ...p, password: e.target.value }))}
        error={errors.password}
      />
      <button
        type='submit'
        className='w-full mt-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-3 text-center'>
        ورود به حساب کاربری
      </button>
    </form>
  );
}
