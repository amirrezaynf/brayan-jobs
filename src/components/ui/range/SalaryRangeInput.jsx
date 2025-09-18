"use client";

import { useState, useCallback } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SalaryRangeInput = ({
  value,
  onChange,
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
      <div className="flex justify-between text-sm text-gray-300 mb-4">
        <span>{formatNumber(localRange[0])} تومان</span>
        <span>{formatNumber(localRange[1])} تومان</span>
      </div>
      <div className="px-2">
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
      <div className="text-center text-xs text-gray-400 mt-2">
        محدوده حقوق مدنظر را انتخاب کنید
      </div>
    </div>
  );
};

export default SalaryRangeInput;
