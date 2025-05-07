import React from 'react';
import { LandingHero } from '../components/client-components/page-specific/landing/landing-hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LandingHero />
    </main>
  );
}