"use client";

import React, { useEffect, useState } from 'react';
import {
  Sparkles, // Kept for AI-theme
  Rocket, // General "launch" theme
  FileText, // For decks/documents
  ArrowRight,
  Check,
  Star,
  MessageCircle, // For Persona Chat
  Lightbulb, // For Insights
  Presentation, // For Virtual VC
  FilePlus, // For New Project
  Files, // For Documents section
  BrainCircuit, // For AI Features
  LayoutTemplate, // For Pitch Development Features
  FolderKanban, // Alternative for Documents/Projects
  NotebookPen // Alternative for project definition
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button'; // Assuming this path is correct
import { motion, useReducedMotion } from 'framer-motion';

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to create placeholder image URL with specified dimensions and text
  const createPlaceholderImage = (width: number, height: number, text: string, bgColor: string = "0E3A8C") => {
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/FFFFFF?text=${encodeURIComponent(text)}`;
  };

  const steps = [
    {
      icon: FilePlus, // Changed from Sparkles
      title: "1. Define Your Startup Vision",
      description: "Kickstart your journey with our guided New Project Wizard. Systematically input core details, descriptions, and your startup stage, populating a comprehensive Project Overview that serves as your venture's foundation.",
      // Placeholder: Illustrate the New Project Wizard (e.g., 'Basic Info' step) transitioning or showing a snippet of the populated Project Overview page.
      imageDescription: "UI of the New Project Wizard, perhaps the 'Basic Info' or 'Description' step, alongside a glimpse of the Project Overview page with fields like 'Problem', 'Solution' populated.",
      imageAlt: "Pitch-it New Project Wizard interface and Project Overview screen",
      actualImageUrl: "/assets/hiw/step-wizard.png"
    },
    {
      icon: FileText,
      title: "2. Build Your Compelling Pitch Deck",
      description: "Access the Pitch Deck viewer to review your presentation slide by slide. Structure your narrative, from cover to financials, ensuring a logical flow. (Full editing capabilities are part of our vision!)",
      // Placeholder: Show the Pitch Deck Viewer interface with the slide navigation list on one side and a sample slide (e.g., 'Our Solution') displayed.
      imageDescription: "Screenshot of the Pitch Deck Viewer. Left panel shows slide titles (Cover, Problem, Solution, etc.). Main panel displays a sample slide, e.g., 'The Problem' or 'Our Solution'.",
      imageAlt: "Pitch-it Pitch Deck Viewer with slide navigation and content preview",
      actualImageUrl: "/assets/hiw/deck-viewer.png"
    },
    {
      icon: Files, // Changed from Target (Investor Matching)
      title: "3. Centralize All Project Files",
      description: "Keep everything organized in the Documents hub. Access user-uploaded files (like market research or financial models) and AI-generated reports (like Trend Analyses or Virtual VC summaries) all in one place.",
      // Placeholder: Illustrate the Documents section, showing a list of diverse file types: some user-uploaded (e.g., 'Market_Research.pdf', 'Financials.xlsx') and some AI-generated ('Key_Trend_Analysis.pdf').
      imageDescription: "The Documents section UI, displaying a list of files with names like 'Financial Projections 2024.xlsx', 'Netnographic Analysis - 2025-04-20.pdf', 'UserUploaded_BusinessPlan.docx'.",
      imageAlt: "Pitch-it Documents hub showing various project-related files",
      actualImageUrl: "/assets/hiw/documents.png"
    },
    {
      icon: Lightbulb, // Changed from BarChart (Analytics)
      title: "4. Uncover AI-Driven Insights",
      description: "Leverage the Memories panel where our AI analyzes your project data. Discover key metrics, trends, and actionable suggestions related to your customers, market, and financials to refine your strategy.",
      // Placeholder: Show the AI Insights panel with a few example insight cards (e.g., Customer insight: 'Users aged 25-34 show higher engagement...', Market insight: 'Growing trend in sustainable alternatives...').
      imageDescription: "The AI Memories panel, displaying example insight cards with categories (Customer, Market, Financial), dates, statements, and confidence percentages.",
      imageAlt: "Pitch-it AI Memories panel with actionable suggestions",
      actualImageUrl: "/assets/hiw/ai-insights.png"
    },
    {
      icon: MessageCircle,
      title: "5. Stress-Test with AI Personas",
      description: "Engage in dynamic Q&A sessions in the Persona Chat. Test your pitch against AI-driven characters representing different stakeholder viewpoints (creators, marketers) to anticipate questions and refine your messaging.",
      // Placeholder: Screenshot of the Persona Chat interface. Show the avatars of Alan, Brenda, Marcus, Danielle at the top, a sample user query in the chat, and a (mocked-up) response from one persona.
      imageDescription: "The Persona Chat interface. Four avatars (Alan, Brenda, Marcus, Danielle) at the top. Chat log showing a user message (e.g., 'What do you think of my solution for content creators?') and an AI persona response.",
      imageAlt: "Pitch-it Persona Chat with interactive AI personas",
      actualImageUrl: "/assets/hiw/groupchat.png"
    },
    {
      icon: Presentation, // Changed from Rocket (Securing Funding)
      title: "6. Practice Your Pitch with a Virtual VC",
      description: "Rehearse your delivery in a simulated investor meeting using Virtual VC. Choose an investor profile, set session parameters, and get feedback on your performance, helping you build confidence for the real deal.",
      // Placeholder: Illustrate the Virtual VC setup screen. Show the investor selection (Alex, Marcus, Samira cards), session settings (Duration, Difficulty, Focus Areas), and the 'Start Pitch Session' button.
      imageDescription: "The Virtual VC setup screen. Show selectable investor profiles (e.g., Alex Morgan - Analytical), session settings (Duration, Difficulty), focus areas, and a 'Start Pitch Session' button.",
      imageAlt: "Pitch-it Virtual VC pitch simulation setup screen",
      actualImageUrl: "/assets/hiw/VVC.png"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12
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

  const testimonials = [
    {
      quote: "Pitch-it's structured approach helped me organize my thoughts and create a coherent story for my MVP. The Project Overview is my go-to reference!",
      author: "Jane D.",
      position: "Founder, EpiDub",
      raised: "Pre-Seed (Internal)", // Adjusted to reflect MVP stage
      avatar: "/assets/avatars/sophie-laurent.jpg" // Generic placeholder
    },
    {
      quote: "Practicing with the Virtual VC and Persona Chat was a game-changer. I felt so much more confident and prepared for actual investor questions.",
      author: "Alex C.",
      position: "CEO, EcoTech Solutions",
      raised: "Seed Round Prep", // Adjusted
      avatar: "/assets/avatars/alex-chen.jpg" // Generic placeholder
    },
    {
      quote: "The AI Memories helped me spot a key market trend I hadn't fully considered. It's like having an extra analyst on the team.",
      author: "Samira K.",
      position: "Founder, HealthTrack Innovations",
      avatar: "/assets/avatars/priya-patel.jpg" // Generic placeholder
    }
  ];


  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-r from-deep-blue to-blue-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-3"
            >
              Craft, Refine, and Practice Your Pitch.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium"
            >
              Pitch-it empowers founders to build compelling narratives, get AI-driven feedback,
              and practice their delivery to perfection.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-deep-blue hover:bg-blue-50 font-medium px-8 py-6 text-lg contrast-[1.1]"
                aria-label="Sign up for a free account"
              >
                <Link href="/auth">Get Started Free</Link>
              </Button>

            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Pitch-it Empowers You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process guides you from initial idea to a polished, practice-ready pitch.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              //const imageUrl = createPlaceholderImage(900, 600, step.imageDescription, "0E3A8C");

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-[240px] overflow-hidden bg-gray-100 relative">
                    <Image
                      src={step.actualImageUrl}
                      alt={step.imageAlt}
                      width={900}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-5 self-start group-hover:bg-blue-200 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-deep-blue" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 flex-grow">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats section - Kept generic as these are aspirational */}
      <section className="py-12 bg-gradient-to-r from-deep-blue to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              className="px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">1000s</p>
              <p className="text-blue-200 text-lg">Pitches Perfected</p>
            </motion.div>
            <motion.div
              className="px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">Millions</p>
              <p className="text-blue-200 text-lg">Of AI Memories Generated</p>
            </motion.div>
            <motion.div
              className="px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2"> countless</p>
              <p className="text-blue-200 text-lg">Hours Saved</p>
            </motion.div>
            <motion.div
              className="px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">Elevated</p>
              <p className="text-blue-200 text-lg">Founder Confidence</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Powerful Tools for Ambitious Founders
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to develop, analyze, and practice pitches that make an impact.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8">
                <div className="p-4 bg-blue-50 rounded-full inline-block mb-4">
                  <LayoutTemplate className="h-8 w-8 text-deep-blue" /> {/* Changed Icon */}
                </div>
                <h3 className="text-2xl font-semibold mb-4">Comprehensive Pitch Development</h3>
                <p className="text-gray-600 mb-6">
                  From defining your core idea to structuring your deck and organizing files,
                  Pitch-it provides a complete toolkit to build your pitch from the ground up.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Guided New Project Wizard</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Structured Pitch Deck Viewer</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Centralized Document Hub</span>
                  </li>
                   <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">At-a-glance Project Overview</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            >
              <div className="p-8">
                <div className="p-4 bg-blue-50 rounded-full inline-block mb-4">
                  <BrainCircuit className="h-8 w-8 text-deep-blue" /> {/* Changed Icon */}
                </div>
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Refinement & Practice</h3>
                <p className="text-gray-600 mb-6">
                  Utilize AI to gain deeper insights, test your ideas against various personas,
                  practice your delivery with a virtual VC, and even validate concepts with real-world feedback.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">AI-Generated Project Insights</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Interactive Persona Chat Simulation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Realistic Virtual VC Pitch Practice</span>
                  </li>
                   <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Real-World Pulse for User Research</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Updated to be more aligned with MVP features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Success Stories
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hear from founders who are leveraging Pitch-it to refine their vision
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const avatarUrl = testimonial.avatar || createPlaceholderImage(64, 64, testimonial.author.charAt(0), "0E3A8C");

              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : (0.1 * index) }}
                >
                  <div className="flex-1">
                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-deep-blue opacity-30">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                      </div>
                      <p className="text-gray-800 italic text-lg pl-5">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Image
                          src={avatarUrl}
                          alt={`${testimonial.author}'s avatar`}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full bg-gray-200 object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                  {testimonial.raised && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-1" />
                        <p className="text-deep-blue font-semibold">{testimonial.raised}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-white pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Perfect Your Pitch?
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join founders who are using Pitch-it to build confidence and craft winning presentations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-deep-blue hover:bg-blue-50 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/auth" className="flex items-center font-medium">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
