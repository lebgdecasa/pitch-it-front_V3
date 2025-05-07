// src/app/project/[id]/virtual-vc/session/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PitchSimulation from '../../../../../components/client-components/pitch/pitch-simulation';

export default function VirtualVCSession({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleComplete = () => {
    router.push(`/project/${params.id}/virtual-vc/results`);
  };

  return (
    <div className="container py-6">
      <PitchSimulation projectId={params.id} onComplete={handleComplete} />
    </div>
  );
}
