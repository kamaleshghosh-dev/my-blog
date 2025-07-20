import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-8 sm:p-10 shadow-lg text-gray-100 
        transform transition duration-500   hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
        
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

      
        <h2 className="text-center text-2xl font-bold text-indigo-400 tracking-tight mb-2">
          Sign up to create account
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:text-indigo-400 hover:underline transition"
          >
            Sign In
          </Link>
        </p>

        
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

    
        <form onSubmit={handleSubmit(create)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;