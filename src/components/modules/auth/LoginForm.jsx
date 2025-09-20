import Link from "next/link";
import { User, Lock, Hash, CheckCircle, Loader2 } from "lucide-react";

import FormInput from "@/components/ui/input/FormInput";

// --- Reusable Login Form ---
export default function LoginForm({
  data,
  setData,
  errors,
  isLoading,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="animate-fadeIn">
      {/* General Error Message */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm text-center">{errors.general}</p>
        </div>
      )}

      <FormInput
        name="contact"
        type="text"
        placeholder="شماره تلفن یا ایمیل"
        icon={<User size={18} />}
        value={data.contact}
        onChange={(e) => setData((p) => ({ ...p, contact: e.target.value }))}
        error={errors.contact}
        disabled={isLoading}
      />
      <FormInput
        name="password"
        type="password"
        placeholder="رمز عبور"
        icon={<Lock size={18} />}
        value={data.password}
        onChange={(e) => setData((p) => ({ ...p, password: e.target.value }))}
        error={errors.password}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            در حال ورود...
          </>
        ) : (
          "ورود به حساب کاربری"
        )}
      </button>
    </form>
  );
}
