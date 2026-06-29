import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type UploadStep = "inventory" | "orders";

export const UploadFile: React.FC = () => {
  const [step, setStep] = useState<UploadStep>("inventory");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select a file first!" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/upload?type=${step}`,
        {
          method: "POST",
          credentials: "include",
          body: selectedFile,
        },
      );

      const resData = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `${step === "inventory" ? "Inventory" : "Orders"} uploaded successfully!`,
        });
        setSelectedFile(null);
        if (step === "inventory") {
          setTimeout(() => {
            setStep("orders");
            setMessage(null);
          }, 1500);
        } else {
          localStorage.removeItem("isNewBusiness");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } else {
        setMessage({ type: "error", text: resData.message || "Upload failed" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Server error, please check connection.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSkipOrders = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/upload?type=new-store",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        localStorage.setItem("isNewBusiness", "true");
        setMessage({
          type: "success",
          text: "Welcome! Setting up your new store dashboard...",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: "Failed to initialize new store setup.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Server error, please check connection.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${step === "inventory" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            1. Inventory
          </span>
          <div className="w-8 h-0.5 bg-gray-200"></div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${step === "orders" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            2. Orders
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          {step === "inventory"
            ? "Upload Inventory File"
            : "Upload Orders File"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {step === "inventory"
            ? "Please upload your stock spreadsheet to start."
            : "Great! Now upload your sales orders spreadsheet."}
        </p>

        {message && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs font-medium border ${message.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50/50 mb-6">
          <svg
            className="w-12 h-12 text-indigo-500 mb-3"
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

          <label className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold text-xs py-2 px-4 rounded-xl transition-all mb-2">
            Browse File
            <input
              type="file"
              className="hidden"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>

          {selectedFile ? (
            <p className="text-xs text-gray-700 font-medium truncate max-w-xs">
              📄 {selectedFile.name}
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              Supports CSV or Excel spreadsheets
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={handleUpload}
            disabled={isLoading || !selectedFile}
            className={`w-full py-3.5 px-4 text-white font-semibold rounded-xl text-sm shadow-md transition-all ${
              isLoading || !selectedFile
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading
              ? "Processing file..."
              : step === "inventory"
                ? "Continue to Orders"
                : "Finish Onboarding"}
          </button>
      
        </div>
      </div>
    </div>
  );
};
