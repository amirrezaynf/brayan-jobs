import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import IconWrapper from "../icon/IconWrapper";

const FormInput = ({
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  onKeyDown,
  error,
  options, // برای select fields
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const isSelectField = type === "select";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <div className="relative">
        {isSelectField ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`bg-gray-700/50 border ${
              error ? "border-red-500" : "border-gray-600"
            } text-gray-200 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 pr-10 appearance-none`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`bg-gray-700/50 border ${
              error ? "border-red-500" : "border-gray-600"
            } text-gray-200 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 ${
              isPasswordField ? "pr-10 pl-12" : "pr-10"
            }`}
          />
        )}

        {/* Password Toggle Button - Left Side */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Regular Icon - Always Right Side */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>

        {/* Dropdown Arrow for Select */}
        {isSelectField && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 mr-1">{error}</p>}
    </div>
  );
};

export default FormInput;
