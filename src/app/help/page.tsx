"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion';
import {
  Search,
  BookOpen,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  FileText,
  Video,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/ui/badge';
import { DashboardHeader } from '../../components/client-components/layout/dashboard-header';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock popular articles
  const popularArticles = [
    {
      id: 1,
      title: "Getting Started with Pitch-it",
      description: "Learn how to set up your account and create your first project.",
      category: "Getting Started",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Understanding Investor Matching",
      description: "How our algorithm matches your projects with potential investors.",
      category: "Investors",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Creating an Engaging Pitch",
      description: "Tips for making your pitch stand out to investors.",
      category: "Pitching",
      readTime: "10 min"
    },
    {
      id: 4,
      title: "Analyzing Feedback from Investors",
      description: "How to interpret and act on feedback from potential investors.",
      category: "Feedback",
      readTime: "7 min"
    }
  ];

  // Mock help categories
  const helpCategories = [
    {
      title: "Account & Settings",
      icon: BookOpen,
      articles: 15
    },
    {
      title: "Creating Projects",
      icon: FileText,
      articles: 12
    },
    {
      title: "Investor Tools",
      icon: HelpCircle,
      articles: 9
    },
    {
      title: "Feedback & Analytics",
      icon: MessageCircle,
      articles: 11
    }
  ];

  // Frequently asked questions
  const faqSections = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is Pitch-it?",
          answer: "Pitch-it is a platform that connects startup founders with potential investors. It helps founders create compelling pitches and allows investors to discover promising projects based on their interests and investment criteria."
        },
        {
          question: "Is Pitch-it free to use?",
          answer: "Pitch-it offers both free and premium plans. The basic features are available for free, while advanced features like investor matching, detailed analytics, and pitch optimization tools are available in our premium plans. Visit our pricing page for more details."
        },
        {
          question: "How do I switch between founder and investor views?",
          answer: "You can switch between founder and investor views by using the role switcher in the top navigation bar. Click on your profile icon, then select 'Switch to Investor' or 'Switch to Founder' as needed."
        }
      ]
    },
    {
      title: "For Founders",
      questions: [
        {
          question: "How do I create a new project?",
          answer: "To create a new project, log in to your account, navigate to your dashboard, and click on the 'New Project' button. Follow the guided process to enter your project details, including name, description, industry, funding goals, and other relevant information."
        },
        {
          question: "How can I publish my project to the marketplace?",
          answer: "Once your project is ready, go to the project page and click on the 'Publish' tab. Review your project details, add tags to improve discoverability, and toggle the 'Publish to Marketplace' switch. Your project will then be visible to potential investors."
        },
        {
          question: "What is the Pulse feature?",
          answer: "Pulse is our feedback collection tool that helps you validate your ideas with target audiences. It provides quantitative metrics on problem-solution fit, willingness to pay, and feature prioritization, along with qualitative feedback to improve your concept."
        }
      ]
    },
    {
      title: "For Investors",
      questions: [
        {
          question: "How does the project matching work?",
          answer: "Our algorithm matches projects to your interests based on several factors, including industry preferences, investment size, geographic focus, and past browsing behavior. Projects with higher match scores are more aligned with your stated investment criteria."
        },
        {
          question: "How can I contact a founder?",
          answer: "To contact a founder, navigate to their project page and click on the 'Message' button. This will open a direct messaging channel where you can ask questions, request additional information, or express your interest in their project."
        },
        {
          question: "Can I save projects for later review?",
          answer: "Yes, you can save any project by clicking the bookmark icon on the project card or project page. All saved projects can be accessed in the 'Saved Listings' section of your investor dashboard."
        }
      ]
    }
  ];

  // Video tutorial content
  const videoTutorials = [
    {
      id: 1,
      title: "Creating Your First Pitch",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      duration: "4:32"
    },
    {
      id: 2,
      title: "Navigating the Investor Dashboard",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      duration: "6:15"
    },
    {
      id: 3,
      title: "Understanding Analytics",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      duration: "7:48"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Find answers to your questions about using Pitch-it for creating pitches or discovering investment opportunities.
          </p>

          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for help articles..."
              className="pl-10 bg-white text-gray-900 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="absolute right-1.5 top-1.5"
              size="sm"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Popular Articles Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Popular Help Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit text-xs mb-2">{article.category}</Badge>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{article.readTime} read</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Read more</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Help Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.articles} articles</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#">
                        Browse Articles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="founders">For Founders</TabsTrigger>
              <TabsTrigger value="investors">For Investors</TabsTrigger>
            </TabsList>

            {faqSections.map((section, sectionIndex) => (
              <TabsContent
                key={sectionIndex}
                value={section.title === "General Questions" ? "general" :
                       section.title === "For Founders" ? "founders" : "investors"}
                className="space-y-4"
              >
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`faq-${sectionIndex}-${faqIndex}`}
                      className="border rounded-md px-4 mb-2"
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Video Tutorials */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Video Tutorials</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="#">View all tutorials</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <Video className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-lg">{video.title}</h3>
                  <Button variant="ghost" size="sm" className="pl-0 mt-2">
                    Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-16 bg-blue-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is ready to assist you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-white text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg mt-2">Chat Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Chat with our support team in real-time for immediate assistance
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>Start Chat</Button>
                </CardFooter>
              </Card>

              <Card className="bg-white text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg mt-2">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Send us an email and we&apos;ll get back to you within 24 hours
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">support@pitch-it.com</Button>
                </CardFooter>
              </Card>

              <Card className="bg-white text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg mt-2">Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Premium users can schedule a call with our expert team
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Schedule Call</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Pitch-it</h3>
              <p className="text-sm text-gray-500">
                Connecting innovative founders with investors looking for the next big opportunity.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Help Center</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Getting Started</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Account Settings</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Creating Pitches</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Finding Investors</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Blog</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Webinars</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">Case Studies</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-blue-600">API Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-500">support@pitch-it.com</li>
                <li className="text-gray-500">+1 (555) 123-4567</li>
                <li className="text-gray-500">Mon-Fri, 9am-5pm ET</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2023 Pitch-it. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
