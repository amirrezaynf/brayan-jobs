"use client";

import { useState, useRef } from "react";
import { UploadCloud, Trash2, AlertCircle } from "lucide-react";

export default function FileUploadZone({
  label,
  files,
  setFiles,
  multiple = true,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  showTypeHint = true,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Helper function to validate file type
  const isValidFileType = (file) => {
    return acceptedTypes.includes(file.type);
  };

  // Helper function to validate file size
  const isValidFileSize = (file) => {
    return file.size <= maxFileSize;
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper function to get accepted types text
  const getAcceptedTypesText = () => {
    const types = acceptedTypes.map((type) => {
      switch (type) {
        case "image/jpeg":
        case "image/jpg":
          return "JPG";
        case "image/png":
          return "PNG";
        case "application/pdf":
          return "PDF";
        default:
          return type.split("/")[1]?.toUpperCase();
      }
    });
    return types.join("، ");
  };

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
    validateAndUpdateFiles(newFiles);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    validateAndUpdateFiles(newFiles);
    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const validateAndUpdateFiles = (newFiles) => {
    setError("");

    // Validate each file
    const validFiles = [];
    const errors = [];

    newFiles.forEach((file) => {
      if (!isValidFileType(file)) {
        errors.push(
          `فایل ${
            file.name
          } نوع مجاز نیست. فقط ${getAcceptedTypesText()} مجاز است.`
        );
        return;
      }

      if (!isValidFileSize(file)) {
        errors.push(
          `فایل ${file.name} بیش از حد مجاز (${formatFileSize(
            maxFileSize
          )}) حجیم است.`
        );
        return;
      }

      validFiles.push(file);
    });

    // Show errors if any
    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    // Update files if validation passed
    updateFiles(validFiles);
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

  // Generate accept attribute for input
  const acceptAttribute = acceptedTypes.join(",");

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>

      {/* Error message */}
      {error && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

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
          accept={acceptAttribute}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="text-center text-gray-500">
          <UploadCloud className="w-10 h-10 mx-auto" />
          <p className="mt-2 text-sm">فایل‌ها را اینجا بکشید یا کلیک کنید</p>
          {showTypeHint && (
            <p className="mt-1 text-xs text-gray-600">
              فقط فایل‌های {getAcceptedTypesText()} مجاز است (حداکثر{" "}
              {formatFileSize(maxFileSize)})
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border border-gray-800 rounded-md"
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm text-gray-300 truncate block">
                {file.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="p-1 text-red-500 hover:bg-red-500/20 rounded-full flex-shrink-0 mr-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
