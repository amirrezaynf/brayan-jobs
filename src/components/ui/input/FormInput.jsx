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
}) => (
  <div className="mb-4">
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`bg-gray-700/50 border ${
          error ? "border-red-500" : "border-gray-600"
        } text-gray-200 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 pr-10`}
      />
      <IconWrapper>{icon}</IconWrapper>
    </div>
    {error && <p className="text-red-500 text-xs mt-1 mr-1">{error}</p>}
  </div>
);

export default FormInput;
