import React, { useState, type ChangeEvent } from "react";

function UploadFile(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md max-w-md mx-auto mt-15">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50/50 hover:bg-gray-50 transition-all">
        <svg
          className="w-10 h-10 text-indigo-500 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 px-5 rounded-xl shadow-md shadow-indigo-100 transition-all">
          Upload Inventory File
          <input
            type="file"
            className="hidden"
            accept=".csv, .xlsx, image/*"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile ? (
          <p className="text-xs text-emerald-600 font-medium mt-3 bg-emerald-50 px-2.5 py-1 rounded-lg">
            ✅ {selectedFile.name}
          </p>
        ) : (
          <p className="text-xs text-gray-400 mt-2">
            Support CSV, Excel, or Images
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadFile;
