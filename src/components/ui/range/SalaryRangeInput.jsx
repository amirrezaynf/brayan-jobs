"use client";

import { useState, useCallback } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SalaryRangeInput = ({
  value,
  onChange,
  showNegotiable,
  onNegotiableChange,
  showNoLimit,
  onNoLimitChange,
  showRangeFilter,
  onRangeFilterChange,
  min = 1000000,
  max = 50000000,
}) => {
  const [localRange, setLocalRange] = useState(value || [min, max]);

  const handleChange = useCallback(
    (newRange) => {
      setLocalRange(newRange);
      onChange && onChange(newRange);
    },
    [onChange]
  );

  const formatNumber = (num) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  return (
    <div className="salary-range-slider w-full">
      {/* Salary Range Slider - Always visible when range filter is active */}
      {(showRangeFilter || (!showNegotiable && !showNoLimit)) && (
        <>
          <div className="flex justify-between text-sm text-gray-300 mb-4">
            <span>{formatNumber(localRange[1])} تومان</span>
            <span>{formatNumber(localRange[0])} تومان</span>
          </div>
          <div className="px-1">
            <Slider
              range
              min={min}
              max={max}
              step={500000}
              value={localRange}
              onChange={handleChange}
              trackStyle={[{ backgroundColor: "#FBBF24", height: 4 }]}
              handleStyle={[
                {
                  borderColor: "#FBBF24",
                  backgroundColor: "#FBBF24",
                  width: 18,
                  height: 18,
                  marginTop: -7,
                },
                {
                  borderColor: "#FBBF24",
                  backgroundColor: "#FBBF24",
                  width: 18,
                  height: 18,
                  marginTop: -7,
                },
              ]}
              railStyle={{ backgroundColor: "#374151", height: 4 }}
            />
          </div>
        </>
      )}

      {/* Range Filter Option */}
      <div className="mt-3 flex items-center">
        <input
          id="range-filter"
          type="checkbox"
          checked={showRangeFilter}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              // When enabling range filter, disable other options
              if (showNegotiable) onNegotiableChange(false);
              if (showNoLimit) onNoLimitChange(false);
            }
            onRangeFilterChange && onRangeFilterChange(checked);
          }}
          className={`w-4 h-4 ${
            showRangeFilter
              ? "bg-yellow-500 border-yellow-500"
              : "bg-white border-yellow-500"
          } rounded-full appearance-none focus:ring-yellow-500 focus:ring-2`}
          style={{
            borderRadius: "50%",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        />
        <label
          htmlFor="range-filter"
          className="mr-2 text-sm text-gray-300 cursor-pointer select-none"
        >
          محدوده حقوق انتخابی
        </label>
      </div>

      {/* Negotiable Salary Checkbox */}
      <div className="mt-3 flex items-center">
        <input
          id="negotiable-salaries"
          type="checkbox"
          checked={showNegotiable}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              // If checking negotiable, disable other options
              if (showNoLimit) onNoLimitChange(false);
              if (showRangeFilter) onRangeFilterChange(false);
            }
            onNegotiableChange && onNegotiableChange(checked);
          }}
          className={`w-4 h-4 ${
            showNegotiable
              ? "bg-yellow-500 border-yellow-500"
              : "bg-white border-yellow-500"
          } rounded-full appearance-none focus:ring-yellow-500 focus:ring-2`}
          style={{
            borderRadius: "50%",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        />
        <label
          htmlFor="negotiable-salaries"
          className="mr-2 text-sm text-gray-300 cursor-pointer select-none"
        >
          نمایش آگهی‌های حقوق توافقی
        </label>
      </div>

      {/* No Price Limit Checkbox */}
      <div className="mt-2 flex items-center">
        <input
          id="no-price-limit"
          type="checkbox"
          checked={showNoLimit}
          onChange={(e) => {
            const checked = e.target.checked;
            if (checked) {
              // If checking no-limit, disable other options
              if (showNegotiable) onNegotiableChange(false);
              if (showRangeFilter) onRangeFilterChange(false);
            }
            onNoLimitChange && onNoLimitChange(checked);
          }}
          className={`w-4 h-4 ${
            showNoLimit
              ? "bg-yellow-500 border-yellow-500"
              : "bg-white border-yellow-500"
          } rounded-full appearance-none focus:ring-yellow-500 focus:ring-2`}
          style={{
            borderRadius: "50%",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        />
        <label
          htmlFor="no-price-limit"
          className="mr-2 text-sm text-gray-300 cursor-pointer select-none"
        >
          بدون محدودیت قیمت
        </label>
      </div>

      <div className="text-center text-xs text-gray-400 mt-1">
        محدوده حقوق مدنظر را انتخاب کنید
      </div>
    </div>
  );
};

export default SalaryRangeInput;
