import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-8 sm:p-10 shadow-lg text-gray-100">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-indigo-400 tracking-tight mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="text-indigo-500 hover:underline hover:text-indigo-400 transition"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register('password', {
              required: true,
            })}
          />

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;