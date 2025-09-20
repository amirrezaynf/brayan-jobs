"use client";

import { useState, useRef } from "react";
import { UploadCloud, Trash2 } from "lucide-react";

export default function FileUploadZone({
  label,
  files,
  setFiles,
  multiple = true,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    updateFiles(newFiles);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    updateFiles(newFiles);
    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateFiles = (newFiles) => {
    if (multiple) {
      const allFiles = [...files, ...newFiles];
      const uniqueFiles = allFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex((f) => f.name === file.name && f.size === file.size)
      );
      setFiles(uniqueFiles);
    } else {
      setFiles(newFiles.slice(0, 1));
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex flex-col justify-center items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? "border-yellow-500 bg-yellow-500/10"
            : "border-gray-700 hover:border-yellow-500 hover:bg-yellow-500/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="text-center text-gray-500">
          <UploadCloud className="w-10 h-10 mx-auto" />
          <p className="mt-2 text-sm">فایل‌ها را اینجا بکشید یا کلیک کنید</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border border-gray-800 rounded-md"
          >
            <span className="text-sm text-gray-300 truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="p-1 text-red-500 hover:bg-red-500/20 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
