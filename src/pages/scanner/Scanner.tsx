import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const Scanner = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const scannerId = "qr-reader";
    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setResult(decodedText);
          scanner.stop().catch(() => {});
        },
        () => {},
      )
      .catch(() => {
        setError("Camera permission denied or camera cannot be opened.");
      });

    return () => {
      scannerRef.current
        ?.stop()
        .then(() => scannerRef.current?.clear())
        .catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
        <h1 className="text-2xl font-black text-gray-950 text-center mb-4">
          Scanner
        </h1>

        <div id="qr-reader" className="overflow-hidden rounded-2xl bg-black" />

        {error && (
          <p className="mt-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-semibold p-3">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3">
            <p className="text-xs font-bold text-emerald-700 mb-1">
              Scanned Result
            </p>
            <p className="text-sm text-emerald-950 break-all">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
