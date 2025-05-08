// src/components/client-components/layout/navigation.ts
import { Home, MessageCircle, FileText, Lightbulb, BarChart2, Video, Settings, ArrowLeft } from 'lucide-react';

export const mainNavItems = [
  {
    icon: Home,
    label: 'Overview',
    href: '/project/:id'
  },
  {
    icon: MessageCircle,
    label: 'Personas Chat',
    href: '/project/:id/chat'
  },
  {
    icon: FileText,
    label: 'Pitch Deck',
    href: '/project/:id/deck'
  },
  {
    icon: Lightbulb,
    label: 'Insights',
    href: '/project/:id/insights'
  },
  {
    icon: BarChart2,
    label: 'Pulse',
    href: '/project/:id/pulse'
  },
  {
    icon: Video,
    label: 'Virtual VC',
    href: '/project/:id/virtual-vc/setup'
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/project/:id/settings'
  },
];

export const backNavItem = {
  icon: ArrowLeft,
  label: '← Back to My Projects',
  href: '/dashboard'
};
