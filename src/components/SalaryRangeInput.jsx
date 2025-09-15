"use client";
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SalaryRangeSlider = () => {
  const [salaryRange, setSalaryRange] = useState([10000000, 50000000]);

  const min = 0;
  const max = 100000000;
  const step = 1000000;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label
        htmlFor="salary-range"
        className="block mb-4 text-md font-medium text-gray-300"
      >
        محدوده حقوق (تومان)
      </label>

      <Slider
        range
        // این پراپرتی کلید حل مشکل شماست
        reverse={true}
        // بقیه پراپرتی‌ها
        min={min}
        max={max}
        step={step}
        value={salaryRange}
        onChange={(newValue) => setSalaryRange(newValue)}
        pushable={step}
        allowCross={false}
        trackStyle={[{ backgroundColor: "#D4AF37" }]}
        handleStyle={[
          { borderColor: "#D4AF37", backgroundColor: "white" },
          { borderColor: "#D4AF37", backgroundColor: "white" },
        ]}
        railStyle={{ backgroundColor: "#4B5563" }}
      />

      <div className="flex justify-between text-sm text-gray-400 mt-4">
       <div className="flex gap-2">
       از
        <span className="font-bold gold-text">
          {salaryRange[0].toLocaleString("fa-IR")}
        </span>
       </div>
       <div className="flex gap-2">
       تا
        <span className="font-bold gold-text">
          {salaryRange[1].toLocaleString("fa-IR")}
        </span>
       </div>
      </div>
    
    </div>
  );
};

export default SalaryRangeSlider;
