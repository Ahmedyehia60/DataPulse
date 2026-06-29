import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type AuthMode = "login" | "signup";
interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  terms?: boolean;
}

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    mode: "onTouched",
  });

  const handleModeSwitch = (newMode: AuthMode) => {
    setMode(newMode);
    setServerMessage(null);
    reset();
  };
  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setServerMessage(null);

    try {
      if (mode === "login") {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: data.email, password: data.password }),
        });

        const resData = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(resData.user));

          setServerMessage({
            type: "success",
            text: "Login successful! Redirecting...",
          });
          navigate("/");
        } else {
          setServerMessage({
            type: "error",
            text: "Invalid credentials",
          });
        }
      } else {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        });

        if (response.ok) {
          setServerMessage({
            type: "success",
            text: "Account created successfully! Please Sign In.",
          });
          setTimeout(() => handleModeSwitch("login"), 2500);
        } else {
          setServerMessage({
            type: "error",
            text: "Signup failed",
          });
        }
      }
    } catch (error) {
      setServerMessage({
        type: "error",
        text: "Something went wrong. Please check if the backend server is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 antialiased relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-lg h-128 rounded-full bg-indigo-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-160 h-160 rounded-full bg-emerald-100/50 blur-[130px]"></div>
      </div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl border border-white/50 shadow-xl p-8 md:p-10 transition-all duration-300 z-10 hover:shadow-2xl hover:border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200">
              D
            </div>
            <span className="text-2xl font-bold text-[#1e1b4b] tracking-tight">
              Data<span className="text-indigo-600 italic">Pulse</span>
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
        </div>

        {serverMessage && (
          <div
            className={`mb-5 p-3.5 rounded-xl text-xs font-medium border ${serverMessage.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`}
          >
            {serverMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                disabled={isLoading}
                placeholder="John Doe"
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-4 transition-all ${
                  errors.name
                    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">
                  ⚠️ {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="text"
              disabled={isLoading}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-4 transition-all ${
                errors.email
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/10"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                htmlFor="password"
              >
                Password
              </label>
              {mode === "login" && (
                <a
                  href="#forgot"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <input
              id="password"
              type="password"
              disabled={isLoading}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full px-4 py-3 bg-gray-50/80 border rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-4 transition-all ${
                errors.password
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/10"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {mode === "login" ? (
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                disabled={isLoading}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs font-medium text-gray-600 cursor-pointer select-none"
              >
                Remember me for 30 days
              </label>
            </div>
          ) : (
            <div>
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  disabled={isLoading}
                  {...register("terms", {
                    required: "You must agree to the Terms & Conditions",
                  })}
                  className={`h-4 w-4 mt-0.5 text-indigo-600 focus:ring-indigo-500 rounded-md cursor-pointer ${
                    errors.terms ? "border-rose-400" : "border-gray-300"
                  }`}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-xs text-gray-600 leading-normal cursor-pointer select-none"
                >
                  I agree to the{" "}
                  <a
                    href="#terms"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-rose-500 font-medium mt-1.5 ml-1">
                  ⚠️ {errors.terms.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer py-3.5 px-4 text-white font-semibold rounded-xl text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 flex justify-center items-center gap-2 ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : mode === "login" ? (
              "Sign In to Dashboard"
            ) : (
              "Get Started Now"
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            {mode === "login" ? "New to Data Pulse?" : "Already managing data?"}{" "}
            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                handleModeSwitch(mode === "login" ? "signup" : "login")
              }
              className="font-semibold  text-indigo-600 focus:outline-none hover:underline cursor-pointer hover:text-indigo-700"
            >
              {mode === "login" ? "Create an account" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
