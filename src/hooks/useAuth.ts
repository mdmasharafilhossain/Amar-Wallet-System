/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useDispatch } from 'react-redux';

// import { setCredentials, logout } from '../redux/store/store.authSlice';
// import type { LoginRequest, RegisterRequest } from '../../src/types/index';
// import toast from 'react-hot-toast';
// import { useGetProfileQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } from '../redux/features/auth/auth.api';

// export const useAuth = () => {
//   const dispatch = useDispatch();
//   const [loginApi, loginResult] = useLoginMutation();
//   const [registerApi, registerResult] = useRegisterMutation();
//   const [logoutApi, logoutResult] = useLogoutMutation();
//   const profileQuery = useGetProfileQuery();

//   const login = async (credentials: LoginRequest) => {
//     try {
//       const response = await loginApi(credentials).unwrap();
//       dispatch(setCredentials(response));
//       toast.success('Login successful!');
//       return response;
//     } catch (error: any) {
//       toast.error(error.data?.message || 'Login failed');
//       throw error;
//     }
//   };

//   const register = async (userData: RegisterRequest) => {
//     try {
//       const response = await registerApi(userData).unwrap();
//       toast.success('Registration successful! Please login.');
//       return response;
//     } catch (error: any) {
//       toast.error(error.data?.message || 'Registration failed');
//       throw error;
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       await logoutApi().unwrap();
//       dispatch(logout());
//       toast.success('Logged out successfully');
//     } catch (error: any) {
//       toast.error(error.data?.message || 'Logout failed');
//       throw error;
//     }
//   };

//   return {
//     login,
//     register,
//     logout: logoutUser,
//     isLoading: loginResult.isLoading || registerResult.isLoading || logoutResult.isLoading,
//     error: loginResult.error || registerResult.error || logoutResult.error,
//     profile: profileQuery,
//   };
// };




import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../redux/store/store.authSlice";
import { 
  useGetProfileQuery, 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation 
} from "../redux/features/auth/auth.api";
import toast from "react-hot-toast";
import type { LoginRequest, RegisterRequest } from "../types";
import { walletApi } from "../redux/features/auth/wallet.api";
import { adminApi } from "../redux/features/auth/admin.api";
import { transactionApi } from "../redux/features/auth/transaction.Api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loginApi, loginResult] = useLoginMutation();
  const [registerApi, registerResult] = useRegisterMutation();
  const [logoutApi, logoutResult] = useLogoutMutation();
  // useAuth.ts
// useAuth.ts
const { data: profile, isSuccess} = useGetProfileQuery(); // call always



useEffect(() => {
  
  if (isSuccess && profile) {
    
    dispatch(setCredentials({ user: profile})); // token can be null
  }
}, [isSuccess, profile, dispatch]);


  // const login = async (credentials: LoginRequest) => {
  //   try {
  //     const response = await loginApi(credentials).unwrap(); // { user, token }
  //     dispatch(setCredentials(response));
  //     toast.success("Login successful!");
  //     return response;
  //   } catch (error: any) {
  //     toast.error(error.data?.message || "Login failed");
  //     throw error;
  //   }
  // };
 const login = async (credentials: LoginRequest) => {
  try {
    const response = await loginApi(credentials).unwrap(); 
    dispatch(setCredentials(response));  
    toast.success("Login successful!");
    return response;
  } catch (error: any) {
    toast.error(error.data?.message || "Login failed");
    throw error;
  }
};



  const register = async (userData: RegisterRequest) => {
    try {
      const response = await registerApi(userData).unwrap();
      toast.success("Registration successful! Please login.");
      return response;
    } catch (error: any) {
      toast.error(error.data?.message || "Registration failed");
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logoutApi().unwrap();
      //  CLEAR ALL RTK QUERY CACHE
    dispatch(walletApi.util.resetApiState());
    dispatch(adminApi.util.resetApiState());
    dispatch(transactionApi.util.resetApiState());
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Logout failed");
      throw error;
    }
  };

  return {
    login,
    register,
    logout: logoutUser,
    isLoading: loginResult.isLoading || registerResult.isLoading || logoutResult.isLoading,
    error: loginResult.error || registerResult.error || logoutResult.error,
    profile,
  };
};
