export default function CustomInput({
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  id,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400 text-white ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
