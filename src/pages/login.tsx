/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'
import { useAuth } from '../hooks/useAuth';
import { loginSchema, type LoginFormData } from '../schemas/auth';

const LoginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-amber-400">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: "You will be redirected shortly.",
        timer: 1500,
        showConfirmButton: false,
        background: "#355676",
        color: "#E6D5B8",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      let errorMessage = 'Something went wrong!';
      if (error?.data?.message) {
        errorMessage = error?.data?.message;
      } else if (error?.data?.message?.toLowerCase().includes('password')) {
        errorMessage = 'Password did not match!';
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        confirmButtonColor: "#C8A978",
        background: "#355676",
        color: "#E6D5B8",
      });
      console.error(error);
    }
  };

  const handleRoleLogin = (role: 'user' | 'admin' | 'agent') => {
    const credentials = {
      user: { phone: '1234567890', password: 'userpassword' },
      admin: { phone: '0987654321', password: 'adminpassword' },
      agent: { phone: '1122334455', password: 'agentpassword' },
    };
    setValue('phone', credentials[role].phone);
    setValue('password', credentials[role].password);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8 space-y-8">

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <LoginIcon />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue to your account
            </p>
          </div>

          {/* Role Selection Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleRoleLogin('user')}
              className="px-4 py-2 bg-amber-500 text-slate-900 rounded-md hover:bg-amber-400 transition duration-200"
            >
              User Login
            </button>
            <button
              onClick={() => handleRoleLogin('admin')}
              className="px-4 py-2 bg-amber-500 text-slate-900 rounded-md hover:bg-amber-400 transition duration-200"
            >
              Admin Login
            </button>
            <button
              onClick={() => handleRoleLogin('agent')}
              className="px-4 py-2 bg-amber-500 text-slate-900 rounded-md hover:bg-amber-400 transition duration-200"
            >
              Agent Login
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* Phone Number Input */}
            <div className="w-full">
              <div className="relative">
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="h-5 w-5 text-slate-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67 A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <input
                  {...register('phone')}
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-slate-700 text-white ring-1 ring-inset ${errors.phone ? 'ring-red-500' : 'ring-slate-600'} placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all duration-200`}
                  placeholder="Phone Number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-5 w-5 text-slate-400">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`block w-full rounded-md border-0 py-2.5 pl-10 pr-10 bg-slate-700 text-white ring-1 ring-inset ${errors.password ? 'ring-red-500' : 'ring-slate-600'} placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all duration-200`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-400"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-7s4.477-7 10-7c1.276 0 2.493.222 3.625.625M19.07 4.93l-14.14 14.14M9.88 9.88a3 3 0 104.24 4.24" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-2.5 text-sm font-semibold leading-6 text-slate-900 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-400">
            Not a member?{' '}
            <Link
              to="/register"
              className="font-semibold leading-6 text-amber-400 hover:text-amber-300 transition-colors duration-200"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
