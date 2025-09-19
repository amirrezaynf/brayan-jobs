import { useEffect, useRef, useState } from "react";

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
// Custom Select Component
const CustomSelect = ({ options, value, onChange, placeholder }) => {
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Helper function to get the display text for the selected value
  const getSelectedLabel = () => {
    if (!value) return placeholder;
    const selectedOption = options.find((opt) =>
      typeof opt === "object" ? opt.value === value : opt === value
    );
    if (selectedOption) {
      return typeof selectedOption === "object"
        ? selectedOption.label
        : selectedOption;
    }
    return placeholder;
  };

  return (
    <div className="custom-select-container relative" ref={ref}>
      <div
        className="custom-select-value p-3 bg-gray-900/50 border border-gray-700 rounded-lg flex justify-between items-center cursor-pointer hover:border-yellow-400/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-200" : "text-gray-500"}>
          {getSelectedLabel()}
        </span>
        <ChevronDownIcon />
      </div>
      {isOpen && (
        <ul className="custom-select-options mt-2 rounded-lg">
          {options.map((opt, index) => {
            // Handle both object and string options for backward compatibility
            const isObject = typeof opt === "object";
            const key = isObject ? opt.key || opt.value || index : opt;
            const optionValue = isObject ? opt.value : opt;
            const optionLabel = isObject ? opt.label : opt;

            return (
              <li
                key={key}
                className="custom-select-option p-3 cursor-pointer"
                onClick={() => handleSelect(optionValue)}
              >
                {optionLabel}
              </li>
            );
          })}
        <ul className="custom-select-options absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          <li
            className="custom-select-option p-3 cursor-pointer hover:bg-gray-800 text-gray-300 border-b border-gray-700 last:border-b-0"
            onClick={() => handleSelect("")}
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              className="custom-select-option p-3 cursor-pointer hover:bg-gray-800 text-gray-300 border-b border-gray-700 last:border-b-0"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
