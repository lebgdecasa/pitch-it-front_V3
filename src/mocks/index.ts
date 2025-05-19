// src/mocks/index.ts

import { v4 as uuidv4 } from 'uuid';
import { User, Project, ProjectStage, Pitch, PitchDeck, PitchDeckSlide, Feedback, ChatMessage, ChatPersona } from '../types';

// Create a mock user
export const initialMockUser: User = {
  id: 'user-1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  plan: 'free',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  projectsCount: 3
};

// Create default mock pitch
export const createDefaultPitch = (fullDescription?: string): Pitch => ({
  problem: 'Small businesses struggle to compete with larger companies due to limited marketing budgets.',
  solution: 'Our platform provides cost-effective, AI-powered marketing tools specifically designed for small businesses.',
  targetMarket: 'Small to medium-sized businesses with 5-50 employees across various industries.',
  businessModel: 'Subscription-based SaaS with tiered pricing based on features and usage.',
  competition: 'Hubspot, Mailchimp, and other marketing platforms that are often too complex or expensive for small businesses.',
  uniqueSellingPoint: 'AI-driven marketing automation that requires minimal setup and expertise, at a price point accessible to small businesses.',
  marketingStrategy: 'Content marketing focusing on small business challenges, partnerships with SMB service providers, and a freemium model to drive adoption.',
  fullDescription: fullDescription || ''
});

// Create mock pitch deck slides
export const createMockPitchDeck = (): PitchDeck => {
  const slides: PitchDeckSlide[] = [
    {
      id: uuidv4(),
      type: 'cover',
      content: {
        title: 'SmartMarketer',
        subtitle: 'AI-Powered Marketing for Small Businesses',
        presenter: 'Jane Smith, Founder & CEO'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'problem',
      content: {
        title: 'The Problem',
        description: 'Small businesses struggle to compete with larger companies due to limited marketing budgets and expertise.',
        point1: 'Marketing tools are too expensive',
        point2: 'Require specialized knowledge',
        point3: 'Time-consuming to manage'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'solution',
      content: {
        title: 'Our Solution',
        description: 'AI-powered marketing that\'s affordable, easy to use, and effective.',
        point1: 'Automated content creation',
        point2: 'Smart audience targeting',
        point3: 'Performance analytics'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'market',
      content: {
        title: 'Market Opportunity',
        description: '32.5 million small businesses in the US alone, with a $15B+ market for SMB marketing tools.',
        stat1: '32.5M small businesses in the US',
        stat2: '$15B+ market for SMB marketing tools',
        stat3: '78% of small businesses struggle with marketing'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'product',
      content: {
        title: 'Product Overview',
        feature1: 'AI Content Generator',
        feature2: 'Campaign Automation',
        feature3: 'Customer Insights Dashboard',
        description: 'Our platform handles the entire marketing funnel from content creation to conversion tracking.'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'traction',
      content: {
        title: 'Traction',
        metric1: '500 beta users',
        metric2: '35% monthly growth',
        metric3: '89% customer retention',
        description: 'Strong early adoption with minimal marketing spend.'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'team',
      content: {
        title: 'Our Team',
        member1: 'Jane Smith, Founder & CEO (ex-Google)',
        member2: 'John Doe, CTO (ex-Amazon)',
        member3: 'Sarah Lee, CMO (ex-Hubspot)',
        description: 'Combined 25+ years in marketing tech and AI.'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'competition',
      content: {
        title: 'Competitive Landscape',
        competitor1: 'Hubspot: Enterprise-focused, complex, expensive',
        competitor2: 'Mailchimp: Email-centric, limited AI capabilities',
        competitor3: 'Constant Contact: Outdated technology, poor automation',
        advantage: 'We offer enterprise-level AI marketing at SMB-friendly prices and complexity.'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'business-model',
      content: {
        title: 'Business Model',
        pricing1: 'Starter: $29/mo - Basic AI tools & campaign analytics',
        pricing2: 'Pro: $79/mo - Advanced AI features & multiple campaigns',
        pricing3: 'Business: $199/mo - Full automation suite & white labeling',
        projection: 'Projected $1.2M ARR by end of year'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'financials',
      content: {
        title: 'Financials & Projections',
        current: 'Current: $20K MRR, growing 35% monthly',
        projection: 'Year 1: $1.2M ARR',
        projection2: 'Year 3: $10M+ ARR',
        efficiency: 'CAC: $250, LTV: $2,800, 11x LTV:CAC ratio'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'ask',
      content: {
        title: 'Fundraising',
        ask: 'Raising $2.5M Seed Round',
        use1: 'Engineering: Expand AI capabilities',
        use2: 'Marketing: Scale customer acquisition',
        use3: 'Sales: Build B2B sales team',
        timeline: '18-month runway to Series A metrics'
      },
      order: 0
    },
    {
      id: uuidv4(),
      type: 'contact',
      content: {
        title: 'Thank You',
        name: 'Jane Smith',
        email: 'jane@smartmarketer.ai',
        phone: '(555) 123-4567',
        website: 'www.smartmarketer.ai'
      },
      order: 0
    }
  ];

  return { slides };
};

// Create mock feedback
export const createMockFeedback = (): Feedback[] => [
  {
    id: uuidv4(),
    vcName: 'Sequoia Capital',
    overallScore: 8,
    strengthPoints: [
      'Strong founding team with relevant experience',
      'Clear market need and pain point',
      'Compelling initial traction metrics'
    ],
    improvementPoints: [
      'Consider more aggressive go-to-market strategy',
      'Expand on competitive moat and AI capabilities',
      'Clarify customer acquisition costs and strategy'
    ],
    notes: 'Promising concept addressing a real need in the SMB market. Would like to see more details on technology differentiation.',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    vcName: 'Andreessen Horowitz',
    overallScore: 7,
    strengthPoints: [
      'Attractive business model with strong unit economics',
      'Large addressable market with clear need',
      'Simple yet effective solution for a common problem'
    ],
    improvementPoints: [
      'Need more details on AI technology stack',
      'Consider vertical-specific strategies',
      'Expand on international growth potential'
    ],
    notes: 'The SMB marketing space is crowded but your focus on AI simplicity is compelling. Would like to see more product demos and technical details.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Create a new project
export const createNewProject = (
  userId: string,
  name: string = 'New Project',
  description: string = 'A new business idea',
  industry: string = 'Technology',
  fullDescription: string = ''
): Project => {
  return {
    id: uuidv4(),
    userId,
    name,
    description,
    industry,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stage: ProjectStage.IDEA,
    pitch: createDefaultPitch(fullDescription)
  };
};

// Create initial mock projects
export const initialMockProjects: Project[] = [
  {
    id: 'project-1',
    userId: 'user-1',
    name: 'SmartMarketer',
    description: 'AI-powered marketing platform for small businesses',
    industry: 'Technology',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    stage: ProjectStage.SERIES_C,
    pitch: createDefaultPitch(),
    pitchDeck: createMockPitchDeck(),
    feedback: createMockFeedback(),
    locked: true
  },
  {
    id: 'project-2',
    userId: 'user-1',
    name: 'HealthTrack',
    description: 'Mobile app for personal health monitoring and wellness tracking',
    industry: 'Healthcare',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    stage: ProjectStage.SEED,
    pitch: {
      problem: 'People struggle to maintain consistent health habits and track their wellness progress effectively.',
      solution: 'A mobile app that integrates with wearables to provide personalized health insights and recommendations.',
      targetMarket: 'Health-conscious individuals aged 25-45 who use fitness trackers and smart devices.',
      businessModel: 'Freemium model with premium subscription for advanced features and personalized coaching.',
      competition: 'Apple Health, Google Fit, MyFitnessPal, and other health tracking apps.',
      uniqueSellingPoint: 'AI-powered personalization that adapts to individual health patterns and provides actionable insights.',
      marketingStrategy: 'Partnerships with fitness influencers, content marketing focused on wellness, and app store optimization.'
    },
    feedback: [
      {
        id: uuidv4(),
        vcName: 'Health Ventures',
        overallScore: 7,
        strengthPoints: [
          'Growing market for digital health solutions',
          'Strong integration with existing health devices',
          'Clear monetization strategy'
        ],
        improvementPoints: [
          'Address privacy concerns more explicitly',
          'Detail regulatory compliance approach',
          'Expand on customer acquisition strategy'
        ],
        notes: 'Interesting concept in a growing market. Consider HIPAA compliance and data security as key differentiators.',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    locked: true
  },
  {
    id: 'project-3',
    userId: 'user-1',
    name: 'EduSpark',
    description: 'Interactive learning platform for K-12 students using gamification',
    industry: 'Education',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    stage: ProjectStage.PROTOTYPE,
    locked: true,
    pitch: {
      problem: 'Traditional learning methods fail to engage students, resulting in poor retention and lack of interest.',
      solution: 'A gamified learning platform that makes education interactive and rewards progress.',
      targetMarket: 'K-12 schools, parents of school-age children, and educational institutions.',
      businessModel: 'B2B sales to schools and districts, plus B2C subscription model for parents.',
      competition: 'Khan Academy, Duolingo, and traditional educational software providers.',
      uniqueSellingPoint: 'Adaptive learning paths based on individual progress and learning styles with game mechanics that increase engagement.',
      marketingStrategy: 'Partnerships with educational institutions, teacher advocacy, and direct-to-parent digital marketing.'
    },
    pitchDeck: {
      slides: [
        {
          id: uuidv4(),
          type: 'cover',
          content: {
            title: 'EduSpark',
            subtitle: 'Making Learning Fun Again',
            presenter: 'Jane Smith, Founder'
          },
          order: 0
        },
        {
          id: uuidv4(),
          type: 'problem',
          content: {
            title: 'The Problem',
            description: 'Students are disengaged with traditional learning methods',
            point1: 'Low retention rates',
            point2: 'Lack of personalization',
            point3: 'Decreasing test scores nationally'
          },
          order: 0
        },
        {
          id: uuidv4(),
          type: 'solution',
          content: {
            title: 'Our Solution',
            description: 'Gamified learning that adapts to individual students',
            point1: 'Adaptive learning paths',
            point2: 'Game-based rewards and achievements',
            point3: 'Data-driven insights for teachers and parents'
          },
          order: 0
        }
      ]
    }
  },
  {
    id: 'project-4',
    userId: 'user-1',
    locked: false,
    name: 'EpiDub',
    description: 'AI-powered dubbing platform for content creators and educators',
    industry: 'Technology / Sound Treatment',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    stage: ProjectStage.MVP,
    pitch: {problem: "Content creators and wellness educators struggle to expand globally without losing their authentic voice and emotional connection in multilingual content.",
      solution: "An AI-powered dubbing tool that preserves the creator's original voice tone and emotion while translating it seamlessly into multiple languages.",
      targetMarket: "Influencers, content creators, and wellness educators looking to scale their reach across global audiences on platforms like YouTube, Instagram, TikTok, and wellness apps.",
      businessModel: "Subscription-based model with tiered pricing depending on video minutes, languages needed, and advanced voice customization features.",
      competition: "Traditional dubbing services, generic AI voiceover tools, and manual re-recording methods.",
      uniqueSellingPoint: "Authenticity-preserving AI that enhances the original voice for natural, emotional multilingual dubbing, eliminating the robotic sound common in traditional tools.",
      marketingStrategy: "Collaborations with influencers, targeted advertising on creator platforms, showcasing side-by-side demos of dubbed vs. original voice, and partnerships with wellness and educational content networks."
    },
    pitchDeck: {
      slides: [
        {
          id: uuidv4(),
          type: 'cover',
          content: {
            title: 'EpiDub',
            subtitle: 'Authentic AI Dubbing for Global Creators',
            presenter: 'Karim Amor, Founder & CEO'
          },
          order: 1
        },
        {
          id: uuidv4(),
          type: 'problem',
          content: {
            title: 'The Problem',
            description: 'Content creators and wellness educators struggle to expand globally without losing their authentic voice and emotional connection.',
            point1: 'Traditional dubbing loses original emotion',
            point2: 'AI voiceovers sound robotic and unnatural',
            point3: 'Manual re-recording is time-consuming and costly'
          },
          order: 2
        },
        {
          id: uuidv4(),
          type: 'solution',
          content: {
            title: 'Our Solution',
            description: 'AI-powered dubbing that preserves the creator\'s original voice, tone, and emotion across multiple languages.',
            point1: 'Voice authenticity retention',
            point2: 'Emotionally rich multilingual dubbing',
            point3: 'Fast, affordable, and seamless process'
          },
          order: 3
        },
        {
          id: uuidv4(),
          type: 'market',
          content: {
            title: 'Market Opportunity',
            description: 'The creator economy is booming globally, and authentic content localization is in high demand.',
            stat1: '200M+ global creators across platforms',
            stat2: '$250B+ creator economy market by 2030',
            stat3: '72% of creators want to expand to global audiences'
          },
          order: 4
        },
        {
          id: uuidv4(),
          type: 'product',
          content: {
            title: 'Product Overview',
            feature1: 'Voice Emotion AI Engine',
            feature2: 'Multilingual Seamless Dubbing',
            feature3: 'Customizable Voice Profiles',
            description: 'EpiDub empowers creators to dub their videos into multiple languages while preserving their unique voice identity and emotional resonance.'
          },
          order: 5
        },
        {
          id: uuidv4(),
          type: 'traction',
          content: {
            title: 'Traction',
            metric1: '1,000+ videos processed in beta',
            metric2: '45% monthly growth',
            metric3: '92% creator satisfaction rate',
            description: 'Strong demand from wellness educators and YouTube creators during private beta.'
          },
          order: 6
        },
        {
          id: uuidv4(),
          type: 'team',
          content: {
            title: 'Our Team',
            member1: 'Karim Amor, Founder & CEO (ex-Google)',
            member2: 'Abdeslam Jakjoud, CTO (ex-DeepMind)',
            member3: 'Hamza Fatih, CMO (ex-TikTok)',
            description: '20+ years combined experience in AI, audio engineering, and creator economy platforms.'
          },
          order: 7
        },
        {
          id: uuidv4(),
          type: 'competition',
          content: {
            title: 'Competitive Landscape',
            competitor1: 'Traditional dubbing studios: Slow, expensive, manual',
            competitor2: 'Generic AI voiceovers: Robotic, emotionless',
            competitor3: 'Manual re-recordings: Labor-intensive, costly',
            advantage: 'EpiDub uniquely preserves authenticity, emotion, and creator identity, making global expansion effortless.'
          },
          order: 8
        },
        {
          id: uuidv4(),
          type: 'business-model',
          content: {
            title: 'Business Model',
            pricing1: 'Starter: $19/mo - 60 minutes dubbing/month',
            pricing2: 'Pro: $59/mo - 200 minutes + advanced voice tuning',
            pricing3: 'Business: $149/mo - Unlimited dubbing & enterprise integrations',
            projection: 'Projected $800K ARR within 12 months post-launch'
          },
          order: 9
        },
        {
          id: uuidv4(),
          type: 'financials',
          content: {
            title: 'Financials & Projections',
            current: 'Current: 200 paid beta users, growing 45% monthly',
            projection: 'Year 1: $800K ARR',
            projection2: 'Year 3: $7M+ ARR',
            efficiency: 'CAC: $180, LTV: $2,400, 13x LTV:CAC ratio'
          },
          order: 10
        },
        {
          id: uuidv4(),
          type: 'ask',
          content: {
            title: 'Fundraising',
            ask: 'Raising $2M Seed Round',
            use1: 'Engineering: Advance Voice Emotion AI',
            use2: 'Marketing: Creator acquisition campaigns',
            use3: 'Product: Expand platform integrations (YouTube, TikTok, wellness apps)',
            timeline: '18-month runway to Series A readiness'
          },
          order: 11
        },
        {
          id: uuidv4(),
          type: 'contact',
          content: {
            title: 'Thank You',
            name: 'Karim Amor',
            email: 'karim@epidub.ai',
            phone: '(555) 789-1234',
            website: 'www.epidub.ai'
          },
          order: 12
        }
      ]
        },
    feedback: createMockFeedback()
  }

];

// Create mock chat personas
export const mockChatPersonas: ChatPersona[] = [
  {
    id: 'persona-1',
    name: 'Alan the Animator',
    role: 'Freelance Animator and Content Creator',
    avatarUrl: '/assets/avatars/alex-chen.jpg'
  },
  {
    id: 'persona-2',
    name: 'Brenda the Branding Expert',
    role: 'Marketing Manager at a Tech Startup',
    avatarUrl: '/assets/avatars/sarah-johnson.jpg'
  },
  {
    id: 'persona-3',
    name: 'Marcus the Content Creator',
    role: 'Independent Online Educator',
    avatarUrl: '/assets/avatars/marcus-williams.jpg'
  },
  {
    id: 'persona-4',
    name: 'Danielle the Digital Nomad',
    role: 'customer',
    avatarUrl: '/assets/avatars/sophie-laurent.jpg'
  }
];

// Create mock chat messages
export const createMockChatMessages = (projectId: string): ChatMessage[] => [
  {
    id: uuidv4(),
    persona: 'founder',
    content: 'Hello everyone! I\'m excited to share my startup idea with you today.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    avatarUrl: '/assets/avatars/founder.png'
  },
  {
    id: uuidv4(),
    persona: 'investor',
    content: 'Thanks for presenting. I\'m interested in your market sizing. How did you arrive at your TAM figures?',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    avatarUrl: '/assets/avatars/investor.png'
  },
  {
    id: uuidv4(),
    persona: 'founder',
    content: 'Great question. We analyzed industry reports from Gartner and conducted our own market research with 200 potential customers.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
    avatarUrl: '/assets/avatars/founder.png'
  },
  {
    id: uuidv4(),
    persona: 'mentor',
    content: 'Your business model makes sense, but have you considered alternative revenue streams beyond subscription?',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    avatarUrl: '/assets/avatars/mentor.png'
  },
  {
    id: uuidv4(),
    persona: 'customer',
    content: 'As a potential user, I\'m concerned about the learning curve. How easy is it to get started with your product?',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatarUrl: '/assets/avatars/customer.png'
  },
  {
    id: uuidv4(),
    persona: 'founder',
    content: 'That\'s a priority for us. Our onboarding process takes less than 5 minutes, and we offer templates to help users get immediate value.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
    avatarUrl: '/assets/avatars/founder.png'
  }
];

// Re-export project data
export { mockProjectData as projectData } from './project-data';
