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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-indigo-500/30 rounded-xl p-8 sm:p-10 shadow-xl text-gray-100 
        transform transition duration-500 hover:scale-105 hover:-translate-y-1 hover:rotate-[-1deg] hover:shadow-indigo-500/30">

        
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

       
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

   
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

    
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

    
        <div className="my-6 text-center text-gray-500 text-sm">— or —</div>

      
        <div className="flex flex-col items-center bg-slate-800/70 border border-indigo-500/20 rounded-xl p-6 space-y-4 shadow-md hover:shadow-indigo-500/20 transition">

          <p className="text-indigo-400 text-sm font-medium text-center">
            👋 Welcome back ! Use your Google account for instant access.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded-md transition shadow-sm border hover:scale-[1.02] hover:shadow-md"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
    
      </div>
    </div>
  );
}

export default Login;