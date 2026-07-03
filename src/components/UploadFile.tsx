import React, { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type UploadStep = "inventory" | "orders";

export const UploadFile: React.FC = () => {
  const [step, setStep] = useState<UploadStep>("inventory");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) return 99;

          let nextProgress = prev;
          if (prev < 25) {
            nextProgress = prev + Math.floor(Math.random() * 5) + 2;
          } else if (prev >= 25 && prev < 60) {
            nextProgress = prev + Math.floor(Math.random() * 15) + 8;
          } else if (prev >= 60 && prev < 85) {
            nextProgress = prev + Math.floor(Math.random() * 3) + 1;
          } else if (prev >= 85 && prev < 95) {
            nextProgress = prev + 1;
          } else {
            const slowDownFactor = Math.random() > 0.93;
            nextProgress = slowDownFactor ? prev + 1 : prev;
          }

          return nextProgress > 99 ? 99 : nextProgress;
        });
      }, 250);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const getProgressStatus = (currentProgress: number): string => {
    if (currentProgress < 25) return "Reading spreadsheet rows... 📄";
    if (currentProgress >= 25 && currentProgress < 60)
      return "Analyzing data structures... 📊";
    if (currentProgress >= 60 && currentProgress < 85)
      return "Validating data fields... ⚙️";
    if (currentProgress >= 85 && currentProgress < 95)
      return "Syncing records with server... 🚀";
    if (currentProgress >= 95 && currentProgress < 98)
      return "Processing heavy rows, please hold on, we are still working... ⏳";
    if (currentProgress >= 98 && currentProgress < 100)
      return "Finalizing database entries, almost done, do not refresh... ✨";
    return "Complete! 🎉";
  };

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
        `http://192.168.1.2:5000/api/upload?type=${step}`,
        {
          method: "POST",
          credentials: "include",
          body: selectedFile,
        },
      );

      const resData = await response.json();

      if (response.ok) {
        setProgress(100);
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

  return (
    <div className="relative min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-6 overflow-hidden">
      {/* Background Analytics Layer */}
      <div className="absolute top-[8%] left-[6%] text-indigo-600/10 animate-[bounce_7s_ease-in-out_infinite] pointer-events-none select-none">
        <svg
          className="w-28 h-28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      </div>

      <div className="absolute bottom-[10%] left-[5%] text-indigo-500/10 rotate-12 animate-[pulse_6s_ease-in-out_infinite] pointer-events-none select-none">
        <svg
          className="w-32 h-32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
      </div>

      <div className="absolute top-[12%] right-[5%] text-indigo-600/10 -rotate-6 animate-[bounce_9s_ease-in-out_infinite] pointer-events-none select-none">
        <svg
          className="w-28 h-28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18V9A2.25 2.25 0 014.5 6.75h15A2.25 2.25 0 0121 9v9m-18.75 0a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25m-18.75 0V7.5A2.25 2.25 0 014.5 5.25h15A2.25 2.25 0 0121 7.5V18M9 9h.008v.008H9V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM9 18h.008v.008H9V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>

      <div className="absolute bottom-[12%] right-[8%] text-indigo-500/10 animate-[pulse_7s_ease-in-out_infinite] pointer-events-none select-none">
        <svg
          className="w-28 h-28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
          />
        </svg>
      </div>

      <div className="absolute top-[35%] left-[2%] text-indigo-600/20 font-mono text-6xl font-black select-none pointer-events-none animate-[pulse_4s_infinite]">
        94.2%
      </div>
      <div className="absolute top-[20%] right-[22%] text-indigo-600/15 font-mono text-5xl font-extrabold select-none pointer-events-none animate-[bounce_11s_infinite]">
        +18.5%
      </div>
      <div className="absolute bottom-[25%] left-[18%] text-indigo-600/15 font-mono text-5xl font-extrabold select-none pointer-events-none animate-[bounce_10s_infinite]">
        r = 0.98
      </div>
      <div className="absolute bottom-[30%] right-[2%] text-indigo-600/20 font-mono text-6xl font-black select-none pointer-events-none animate-[pulse_5s_infinite]">
        &sigma;² = 1.4
      </div>

      <div className="absolute top-[18%] left-[25%] w-2.5 h-2.5 bg-indigo-500/40 rounded-full animate-ping [animation-duration:3s]"></div>
      <div className="absolute bottom-[22%] left-[4%] w-3 h-3 bg-indigo-500/30 rounded-full animate-ping [animation-duration:5s]"></div>
      <div className="absolute top-[45%] right-[18%] w-3 h-3 bg-indigo-500/40 rounded-full animate-ping [animation-duration:4s]"></div>

      {/* Expanded & Redesigned Glass Form */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-4xl border border-gray-200/60 shadow-[0_30px_70px_rgba(99,102,241,0.09)] p-10 md:p-14 text-center z-10 transition-all duration-300">
        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide ${step === "inventory" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "bg-gray-100 text-gray-400"}`}
          >
            1. Inventory
          </span>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide ${step === "orders" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "bg-gray-100 text-gray-400"}`}
          >
            2. Orders
          </span>
        </div>

        {/* Headings */}
        <h2 className="text-3xl font-black text-gray-950 mb-3 tracking-tight md:text-4xl">
          {step === "inventory"
            ? "Upload Inventory File"
            : "Upload Orders File"}
        </h2>
        <p className="text-base text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          {step === "inventory"
            ? "Please upload your stock spreadsheet to start analyzing your data."
            : "Great! Now upload your sales orders spreadsheet to sync transactions."}
        </p>

        {/* Alert Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-2xl text-sm font-semibold border text-left flex items-center gap-2.5 ${message.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`}
          >
            <span>{message.type === "success" ? "✨" : "⚠️"}</span>
            {message.text}
          </div>
        )}

        {/* Dropzone Area */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-10 bg-gray-50/40 mb-8 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all duration-300 group cursor-pointer relative">
          <div className="p-4 bg-indigo-50/60 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg
              className={`w-14 h-14 text-indigo-600 ${isLoading ? "animate-bounce" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <label className="cursor-pointer bg-white border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 text-indigo-600 font-bold text-xs py-2.5 px-5 rounded-xl transition-all shadow-sm mb-3">
            Browse Computer
            <input
              type="file"
              className="hidden"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>

          {selectedFile ? (
            <div className="bg-indigo-50/60 border border-indigo-100/70 px-4 py-2 rounded-xl flex items-center gap-2 max-w-md truncate">
              <span className="text-sm">📄</span>
              <p className="text-xs text-indigo-950 font-semibold truncate">
                {selectedFile.name}
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Drag and drop or support CSV / Excel spreadsheets
            </p>
          )}
        </div>

        {/* Loader & Progress Tracker */}
        {isLoading && (
          <div className="mb-8 w-full text-left bg-gray-50/50 p-5 rounded-2xl border border-gray-100 transition-all duration-300">
            <div className="flex justify-between items-center mb-2.5 gap-4">
              <span className="text-xs font-bold text-indigo-600 animate-pulse tracking-wide flex-1">
                {getProgressStatus(progress)}
              </span>
              <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100 shrink-0">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200/70 rounded-full h-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-[11px] text-gray-400 font-medium font-mono text-right">
              {100 - progress}% estimated processing remaining
            </div>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="w-full">
          <button
            onClick={handleUpload}
            disabled={isLoading || !selectedFile}
            className={`w-full py-4 px-6 text-white font-bold rounded-2xl text-sm transition-all duration-300 shadow-lg ${
              isLoading || !selectedFile
                ? "bg-indigo-400/70 cursor-not-allowed shadow-none"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading
              ? "Processing file layers..."
              : step === "inventory"
                ? "Continue to Orders Sync"
                : "Complete System Setup"}
          </button>
        </div>
      </div>
    </div>
  );
};
