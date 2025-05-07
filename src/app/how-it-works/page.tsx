"use client";

import React, { useEffect, useState } from 'react';
import { Sparkles, Rocket, Target, BarChart, FileText, ArrowRight, Check, Star, Sparkle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const steps = [
    {
      icon: Sparkles,
      title: "Describe your startup",
      description: "Start by creating a project and defining your startup vision. Our AI-powered wizard guides you through the essential questions to build a compelling story.",
      imageSrc: "/how-it-works/step-wizard.png",
      imageAlt: "Startup description wizard interface showing questionnaire form"
    },
    {
      icon: FileText,
      title: "Build your pitch deck",
      description: "Use our professionally designed templates to craft a stunning pitch deck that will captivate investors. Add your content, customize slides, and perfect your message.",
      imageSrc: "/how-it-works/step-deck-editor.png",
      imageAlt: "Pitch deck editor interface showing slide templates and customization options"
    },
    {
      icon: Target,
      title: "Match with investors",
      description: "Our platform matches your startup with investors who are most likely to be interested in your industry and stage. Save time by focusing on qualified leads.",
      imageSrc: "/how-it-works/step-investor-list.png",
      imageAlt: "Investor matching interface showing recommended investors for your startup"
    },
    {
      icon: BarChart,
      title: "Analyze engagement data",
      description: "Monitor who views your pitch, how long they spend on each slide, and what aspects of your business generate the most interest.",
      imageSrc: "/how-it-works/step-analytics.png",
      imageAlt: "Analytics dashboard showing pitch deck engagement metrics and investor activity"
    },
    {
      icon: MessageCircle,
      title: "Chat with Personas",
      description: "Open a dedicated chat room with any persona, explore objections, refine positioning and capture insights that feed directly back into your deck.",
      imageSrc: "/assets/hiw/step-chat-placeholder.png",
      imageAlt: "Screenshot of interactive persona chat interface",
      id: "hiw-chat"
    },
    {
      icon: Rocket,
      title: "Secure your funding",
      description: "When investors show interest, communicate directly through our platform. Schedule meetings, answer questions, and move toward closing your funding round.",
      imageSrc: "/how-it-works/step-connect.png",
      imageAlt: "Communication interface for connecting with interested investors"
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
      quote: "Pitch-it helped us raise our seed round in just 3 weeks. The investor matching feature connected us to VCs who were genuinely interested in our space.",
      author: "Sarah Chen",
      position: "CEO, TechSprint",
      raised: "$1.2M Seed",
      avatar: "/testimonials/avatar-sarah.png"
    },
    {
      quote: "The analytics provided valuable insights into what investors cared about most in our business. We refined our pitch based on that data and closed our round.",
      author: "Marcus Johnson",
      position: "Co-founder, Virtu Health",
      raised: "$3.5M Series A",
      avatar: "/testimonials/avatar-marcus.png"
    },
    {
      quote: "As a solo founder, Pitch-it gave me the tools and guidance I needed to create a professional pitch deck that stood out to investors.",
      author: "Elena Rodriguez",
      position: "Founder, EcoPackage",
      raised: "$750K Pre-seed",
      avatar: "/testimonials/avatar-elena.png"
    }
  ];
  
  // Function to create placeholder image URL with specified dimensions and text
  const createPlaceholderImage = (width: number, height: number, text: string, bgColor: string = "0E3A8C") => {
    // Create a placeholder image URL using a placeholder service
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/FFFFFF?text=${encodeURIComponent(text)}`;
  };

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
              Fundraising, simplified.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium"
            >
              Pitch-it helps founders create compelling pitch decks, connect with the right investors,
              and close funding rounds faster with data-driven insights.
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
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-blue-700 font-medium px-8 py-6 text-lg"
                aria-label="View product demo"
              >
                <Link href="/projects" target="_blank" rel="noopener">View Demo</Link>
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
              How Pitch-it Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process helps founders go from idea to funded in record time
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
              // Create placeholder image URLs if no real images are available
              const imageUrl = step.imageSrc ? step.imageSrc : 
                createPlaceholderImage(900, 600, `UI for ${step.title}`, "0E3A8C");
              
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-[240px] overflow-hidden bg-gray-100 relative">
                    <Image 
                      src={imageUrl} 
                      alt={step.imageAlt} 
                      width={900}
                      height={600}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-5 group-hover:bg-blue-200 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-deep-blue" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-gradient-to-r from-deep-blue to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div 
              className="px-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">$100M+</p>
              <p className="text-blue-200 text-lg">Funding raised</p>
            </motion.div>
            <motion.div 
              className="px-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">3,200+</p>
              <p className="text-blue-200 text-lg">Startups</p>
            </motion.div>
            <motion.div 
              className="px-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">4,800+</p>
              <p className="text-blue-200 text-lg">Investors</p>
            </motion.div>
            <motion.div 
              className="px-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">82%</p>
              <p className="text-blue-200 text-lg">Funding success rate</p>
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
              Powerful Features for Founders
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to create pitches that win investment
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8">
                <div className="p-4 bg-blue-50 rounded-full inline-block mb-4">
                  <Sparkle className="h-8 w-8 text-deep-blue" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Pitch Creation</h3>
                <p className="text-gray-600 mb-6">
                  Our AI assistant helps you craft compelling narratives about your business, 
                  generates financial projections, and suggests the right content for each slide 
                  based on your startup&apos;s stage and industry.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Guided pitch creation process</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Industry-specific templates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Content suggestions for each slide</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8">
                <div className="p-4 bg-blue-50 rounded-full inline-block mb-4">
                  <Target className="h-8 w-8 text-deep-blue" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Investor Matching & Analytics</h3>
                <p className="text-gray-600 mb-6">
                  Connect with investors who are most likely to fund your startup. Track engagement 
                  with your pitch and understand what aspects of your business generate the most interest.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Smart investor matching algorithm</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Real-time viewing analytics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Secure investor communication portal</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Hear from founders who raised funding using Pitch-it
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              // Use placeholder image URL for avatar if the local image doesn't exist
              const avatarUrl = testimonial.avatar || 
                createPlaceholderImage(64, 64, testimonial.author.charAt(0), "0E3A8C");
                
              return (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
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
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <p className="text-deep-blue font-semibold">{testimonial.raised}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-deep-blue relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 bg-grid-white pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Accelerate Your Fundraising?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of founders who&apos;ve simplified their fundraising process with Pitch-it.
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
              <Link href="/signup" className="flex items-center font-medium">
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