"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronRight, FileText, MessageCircle, Zap, BrainCircuit, Presentation, Users, SearchCheck, Lightbulb } from 'lucide-react'; // Added more icons
import { Button } from '../../../ui/button'; // Assuming this path is correct
import { useAppContext } from '../../../../providers/app-provider'; // Assuming this path is correct
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export const LandingHero = () => {
  const { state } = useAppContext();
  // const { user } = state; // `user` is declared but not used. Consider removing if not needed.
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const heroImageSrc = "/assets/landing/hero-project-overview.png";
  const heroImageAlt = "Pitch-it Project Overview Screen showing key startup metrics and details";
  const heroImageDescription = "A mock-up of the Pitch-it 'Project Overview' screen for 'EpiDub'. Shows project title, stage, Key Metric cards (CAC, CLTV, TAM), 'Problem', 'Solution' sections, and 'Ideal Customer Personas' list. This screen is valuable for both founders constructing their narrative and investors quickly grasping a venture's core.";

  const virtualVcBadgeSrc = "/assets/landing/badge-virtual-vc.png";
  const virtualVcBadgeAlt = "Virtual VC Pitch Practice Badge";
  const virtualVcBadgeDescription = "Small badge with a presentation icon or VC silhouette, and text 'Virtual VC Practice' or 'Pitch Simulation'.";

  return (
    <section className="w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            className="flex flex-col space-y-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full w-fit">
              <BrainCircuit size={18} />
              <span className="text-sm font-medium">AI for Startup Success: Pitching & Validation</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Elevate Pitches, Validate Ventures.</span> <br className="hidden md:block" /> AI-Powered Clarity for <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">Founders & Investors.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 max-w-xl">
              For Founders: Build, refine, and practice compelling pitches.
              For Investors: Quickly assess startup potential and gain deeper insights into your pipeline with our intelligent platform.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-4">
              {[
                { text: 'Founders: Craft compelling, investor-ready pitches with guided AI.', icon: <Presentation className="h-4 w-4 text-green-600" /> },
                { text: 'Investors: Streamline lead validation with AI-driven project analysis.', icon: <SearchCheck className="h-4 w-4 text-green-600" /> },
                { text: 'Both: Gain deeper understanding through simulated Q&A & structured insights.', icon: <Users className="h-4 w-4 text-green-600" /> },
                { text: 'Both: Make data-driven decisions to accelerate growth and funding.', icon: <Lightbulb className="h-4 w-4 text-green-600" /> },
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    {feature.icon}
                  </div>
                  <span className="text-gray-600">{feature.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="px-8 py-6 text-lg font-medium rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl" asChild>
                <a href="/auth">
                  Get Started Free
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

          <motion.div
            className="relative hidden lg:block mt-12 lg:mt-0"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          >
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <Image
                src={"/assets/landing/project-hero.png"}
                width={800}
                height={500}
                alt={heroImageAlt}
                className="w-full h-auto"
                priority
              />
              {/* Ideal Image Source: {heroImageDescription} */}
            </div>
            <motion.div
              className="absolute -top-8 -left-8 z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Image
                src="/assets/landing/badge-persona.png"
                width={120}
                height={120}
                alt="AI Analysis & Insights"
                className="drop-shadow-lg"
              />
            </motion.div>
            <motion.div
              className="absolute top-1/3 -right-6 z-10"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Image
                src="/assets/landing/badge-score.png"
                width={90}
                height={90}
                alt="Pitch Assessment Score"
                className="drop-shadow-lg"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-8 right-1/4 z-10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl border border-indigo-200 p-3 drop-shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 rounded-full p-1.5">
                    <MessageCircle size={20} className="text-deep-blue" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">AI Persona Chat</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 -left-10 z-10"
              animate={{ y: [0, 6, 0], x: [0, 4, 0] }}
              transition={{ duration: 3.5, delay: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Image
                src={"/assets/landing/VVC_personas.png"}
                width={160}
                height={55}
                alt={virtualVcBadgeAlt}
                className="drop-shadow-lg"
              />
              {/* Ideal Image Source: {virtualVcBadgeDescription} */}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 md:mt-32 mb-20"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">A Smarter Approach for Founders & Investors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Presentation className="h-7 w-7 text-deep-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Founders: Build & Perfect Your Pitch</h3>
              <p className="text-gray-600">
                From idea to investor-ready: utilize our guided wizard, deck tools, AI personas, and Virtual VC to create and refine a standout pitch.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <SearchCheck className="h-7 w-7 text-deep-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Investors: Accelerate Due Diligence</h3>
              <p className="text-gray-600">
                Quickly evaluate startup potential. Leverage AI-generated insights, structured project overviews, and (soon!) Pulse market data to make informed investment decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-deep-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Everyone: Unlock Data-Driven Clarity</h3>
              <p className="text-gray-600">
                Access AI-powered analytics, key metric tracking, and centralized documentation to gain a clear, comprehensive understanding of any venture.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-500 font-medium mb-8">Trusted by innovative founders and forward-thinking investors</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <Image src="/assets/landing/500startups.png" width={150} height={40} alt="Startup Ecosystem Partner" className="transition-all hover:opacity-100 opacity-70" />
            <Image src="/assets/landing/techstars.svg" width={150} height={40} alt="Venture Capital Partner" className="transition-all hover:opacity-100 opacity-70" />
            <Image src="/assets/landing/ycombinator.png" width={150} height={40} alt="Accelerator Program" className="transition-all hover:opacity-100 opacity-70" />
            <Image src="/assets/landing/angelpad.png" width={150} height={40} alt="Angel Network" className="transition-all hover:opacity-100 opacity-70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
