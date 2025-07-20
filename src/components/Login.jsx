import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authslice';
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

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  useEffect(() => {
    console.log("Login component mounted");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 pt-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 shadow-lg text-gray-100 min-h-[500px] transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">

        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold text-indigo-400 mb-2">Sign in to your account</h2>
        <p className="text-center text-sm text-gray-400 mb-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-500 hover:underline hover:text-indigo-400 transition">
            Sign Up
          </Link>
        </p>

        <div className="min-h-[1.5rem] text-sm text-center text-red-500 mb-2">{error}</div>

        <form onSubmit={handleSubmit(login)} className="space-y-4 mb-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be valid',
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-slate-800 text-gray-100 border border-slate-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register('password', { required: true })}
          />
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition">
            Sign in
          </Button>
        </form>

        <div className="text-center text-gray-500 text-sm mb-4">— or —</div>

        <div className="flex flex-col items-center bg-slate-800/70 border border-indigo-500/20 rounded-xl p-4 space-y-3 shadow-md hover:shadow-indigo-500/20 transition">
          <p className="text-indigo-400 text-sm text-center">
           👋 Welcome back !
          </p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-md transition shadow-sm border hover:scale-[1.02] hover:shadow-md"
          >
            <img src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg" alt="Google logo" className="w-5 h-5 object-contain" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;