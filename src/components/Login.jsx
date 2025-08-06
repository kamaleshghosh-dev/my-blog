import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          setError("Unable to load user data. Please try again.");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  useEffect(() => {
    console.log("Login component mounted");
  }, []);

  return (
    <div className="min-h-screen flex pt-16 bg-slate-950">
      <div className="hidden md:flex w-1/2 min-h-screen text-white p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold leading-tight">
          Welcome Back! <br /> A place where writers and readers connect through
          ideas.
        </h1>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-lg text-gray-100 transition hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          <h2 className="text-center text-xl font-bold text-indigo-400 mb-2">
            Sign in
          </h2>
          <p className="text-center text-xs text-gray-400 mb-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-500 hover:underline hover:text-indigo-400 transition"
            >
              Sign Up
            </Link>
          </p>

          {error && (
            <div className="text-xs text-red-500 text-center mb-2">{error}</div>
          )}

          <form onSubmit={handleSubmit(login)} className="space-y-3 mb-3">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition text-sm"
            >
              Sign in
            </Button>
          </form>

          <div className="text-center text-gray-500 text-xs mb-3">— or —</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-md transition shadow-sm border text-sm"
          >
            <img
              src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg"
              alt="Google logo"
              className="w-4 h-4 object-contain"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
