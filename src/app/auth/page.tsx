"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, Building } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({
    login: {
      email: '',
      password: '',
    },
    signup: {
      name: '',
      email: '',
      password: '',
      companyName: '',
    }
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Form handlers
  const handleLoginChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });

    // Clear error when user starts typing
    setErrors({
      ...errors,
      login: {
        ...errors.login,
        [name]: '',
      }
    });
  };

  const handleSignupChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });

    // Clear error when user starts typing
    setErrors({
      ...errors,
      signup: {
        ...errors.signup,
        [name]: '',
      }
    });
  };

  const validateLoginForm = () => {
    let valid = true;
    const newErrors = { ...errors.login };

    if (!loginForm.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (loginForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors({
      ...errors,
      login: newErrors
    });

    return valid;
  };

  const validateSignupForm = () => {
    let valid = true;
    const newErrors = { ...errors.signup };

    if (!signupForm.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!signupForm.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!signupForm.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (signupForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!signupForm.companyName) {
      newErrors.companyName = 'Company name is required';
      valid = false;
    }

    setErrors({
      ...errors,
      signup: newErrors
    });

    return valid;
  };

  const handleLoginSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (validateLoginForm()) {
      setIsSubmitting(true);

      // Mock authentication process
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/dashboard');
      }, 1500);
    }
  };

  const handleSignupSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (validateSignupForm()) {
      setIsSubmitting(true);

      // Mock signup process
      setTimeout(() => {
        setIsSubmitting(false);
        // Redirect to onboarding instead of dashboard for new users
        router.push('/onboarding');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* Back to home button */}
        <div className="mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Main content */}
        <div className="w-full bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 grid-cols-1">
            {/* Left side: Image and branding */}
            <motion.div
              className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="text-2xl font-bold text-white">Pitch-it</div>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
                Take your startup pitch to the next level
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-8 opacity-90">
                Get expert-level feedback on your pitch deck with our AI-powered platform. Perfect your message before meeting real investors.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-auto">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold">JD</div>
                  <div className="w-8 h-8 bg-white/20 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold">SM</div>
                  <div className="w-8 h-8 bg-white/20 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold">AR</div>
                  <span className="text-sm">Join 3,500+ founders</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side: Auth forms */}
            <motion.div
              className="p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.login.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.login.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.login.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.login.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.login.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.login.password}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                {/* Signup Form */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignupSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={signupForm.name}
                          onChange={handleSignupChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.signup.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.signup.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.signup.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="signup-email"
                          name="email"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.signup.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.signup.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.signup.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="signup-password"
                          name="password"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.signup.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.signup.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.signup.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={signupForm.companyName}
                          onChange={handleSignupChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.signup.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="Your Startup Inc."
                        />
                      </div>
                      {errors.signup.companyName && (
                        <p className="mt-1 text-sm text-red-600">{errors.signup.companyName}</p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                      </label>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isSubmitting ? 'Creating your account...' : 'Create Account'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
