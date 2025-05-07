// src/app/project/[id]/virtual-vc/session/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Video, VideoOff, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Card } from '@/ui/card';
import { ScrollArea } from '../../../../../components/ui/scroll-area';

export default function VirtualVCSession({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [messages] = useState([
    { sender: 'Investor', text: 'Hello, please start your pitch.' },
    { sender: 'You', text: 'Thank you for your time. I\'d like to present...' },
  ]);

  const endSession = () => {
    router.push(`/project/${params.id}/virtual-vc/results`);
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-6 flex flex-col">
      <div className="flex-1 grid md:grid-cols-2 gap-6 mb-6">
        {/* Video Streams */}
        <Card className="relative">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              poster="/assets/investor-stream-placeholder.jpg"
            />
            <div className="absolute bottom-4 left-4 text-white font-medium">
              Investor
            </div>
          </div>
        </Card>

        <Card className="relative">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              poster="/assets/user-stream-placeholder.jpg"
            />
            <div className="absolute bottom-4 left-4 text-white font-medium">
              You
            </div>
          </div>
        </Card>
      </div>

      {/* Controls and Chat */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCameraOff(!isCameraOff)}
            >
              {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
            <Button onClick={endSession} className="gap-2">
              End Session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5" />
            <h3 className="font-medium">Message Log</h3>
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{message.sender}:</span>{' '}
                  {message.text}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
