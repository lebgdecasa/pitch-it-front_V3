"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronRight, FileText, MessageCircle, Zap } from 'lucide-react';
import { Button } from '../../../ui/button';
import { useAppContext } from '../../../../providers/app-provider';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const LandingHero = () => {
  const { state } = useAppContext();
  const { user } = state;
  const [isVisible, setIsVisible] = useState(false);

  // Handle animations on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for staggered animations
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

  return (
    <section className="w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left column: Text content */}
          <motion.div
            className="flex flex-col space-y-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full w-fit">
              <Zap size={18} />
              <span className="text-sm font-medium">AI-Powered Pitch Feedback</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Transform</span> your startup pitch with <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">AI insights</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 max-w-xl">
              Get expert-level feedback on your pitch deck before meeting real investors. Our AI simulates VC thinking to help you refine your message and maximize your chances.
            </motion.p>

            {/* Feature bullets */}
            <motion.ul variants={itemVariants} className="space-y-4">
              {[
                'Simulate investor reactions to your pitch',
                'Get data-driven feedback in minutes',
                'Refine your message for maximum impact',
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="px-8 py-6 text-lg font-medium rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl" asChild>
                <a href="/auth">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button variant="outline" className="px-8 py-6 text-lg font-medium rounded-md border-2 border-indigo-200 hover:border-indigo-300 text-indigo-600 transition-all" asChild>
                <a href="/how-it-works" className="flex items-center">
                  See How It Works
                  <ChevronRight className="ml-1 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column: Dashboard Preview with Floating Elements */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          >
            {/* Main dashboard screenshot */}
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <Image
                src="/assets/landing/hero-dashboard.png"
                width={800}
                height={500}
                alt="Pitch-it Dashboard Preview"
                className="w-full h-auto"
              />
            </div>

            {/* Floating badge elements */}
            <motion.div
              className="absolute -top-6 -left-6 z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Image
                src="/assets/landing/badge-persona.png"
                width={100}
                height={100}
                alt="AI Analysis"
                className="drop-shadow-lg"
              />
            </motion.div>

            <motion.div
              className="absolute top-1/4 -right-4 z-10"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Image
                src="/assets/landing/badge-score.png"
                width={80}
                height={80}
                alt="Pitch Score"
                className="drop-shadow-lg"
              />
            </motion.div>

            {/* New Chat feature floating badge */}
            <motion.div
              className="absolute -top-10 right-10 z-10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            >
              <div className="bg-white rounded-xl border border-indigo-200 p-2 drop-shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 rounded-full p-1">
                    <MessageCircle size={18} className="text-deep-blue" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Chat with Personas</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 -left-10 z-10"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Image
                src="/assets/landing/badge-match.png"
                width={180}
                height={60}
                alt="Investor Match"
                className="drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Key Benefits Section */}
        <motion.div
          className="mt-16 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Benefit 1: Validate Faster */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-deep-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Validate Faster</h3>
              <p className="text-gray-600">
                Test your business model with AI-powered feedback before spending time pitching to real investors.
              </p>
            </div>

            {/* Benefit 2: Investor-Ready Decks */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-deep-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Investor-Ready Decks</h3>
              <p className="text-gray-600">
                Create professional pitch decks with templates designed to highlight what investors care about most.
              </p>
            </div>

            {/* Benefit 3: Interactive Persona Chat */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-deep-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Persona Chat</h3>
              <p className="text-gray-600">
                Have real-time conversations with AI personas to test messaging, objections, and value propositions before launch.
              </p>
            </div>
          </div>

          {/* Cross-linking CTA */}
          <div className="text-center mt-8">
            <a href="#hiw-chat" className="text-deep-blue font-medium inline-flex items-center hover:underline">
              See it in action <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-500 font-medium mb-8">Trusted by founders from top accelerators</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <Image src="/assets/landing/techstars.svg" width={200} height={50} alt="TechStars" className="transition-all hover:opacity-100 opacity-70" />
            <Image src="/assets/landing/ycombinator.png" width={200} height={50} alt="Y Combinator" className="transition-all hover:opacity-100 opacity-70" />
            <Image src="/assets/landing/500startups.png" width={200} height={50} alt="500 Startups" className="transition-all hover:opacity-100 opacity-70" />
            <Image src="/assets/landing/angelpad.png" width={200} height={50} alt="AngelPad" className="transition-all hover:opacity-100 opacity-70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
