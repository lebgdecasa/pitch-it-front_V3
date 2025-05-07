'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../../ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '../../../ui/progress';
import { Badge } from '../../../ui/badge';
import { Mic, MicOff, Video, VideoOff, ThumbsUp, ThumbsDown, Timer, MessageCircle, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { mockInvestors, commonPitchQuestions, realtimeFeedbackPhrases } from '../../../mocks/virtual-vc-data';
import { cn } from '../../../lib/utils';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PitchSimulationProps {
  projectId?: string;
  onComplete?: (assessment: any) => void;
}

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'recording' | 'completed';
type FeedbackType = 'positive' | 'negative' | null;

const PitchSimulation: React.FC<PitchSimulationProps> = ({ projectId, onComplete }) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [activeInvestor, setActiveInvestor] = useState(mockInvestors[0]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);

  const router = useRouter();
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = [...commonPitchQuestions, ...activeInvestor.questions.slice(0, 3)];
  const currentQuestion = questions[currentQuestionIndex];

  // Setup webcam stream when camera is enabled
  useEffect(() => {
    if (cameraEnabled && connectionState === 'connected') {
      const setupWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: micEnabled
          });

          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing webcam:", error);
          setCameraEnabled(false);
        }
      };

      setupWebcam();

      return () => {
        // Clean up video stream when component unmounts or camera is disabled
        // Store reference to avoid the exhaustive-deps warning
        const videoElement = userVideoRef.current;
        const stream = videoElement?.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [cameraEnabled, micEnabled, connectionState]);

  // Handle timer for each question
  useEffect(() => {
    if (connectionState === 'recording' && currentQuestion) {
      setTimeRemaining(currentQuestion.timeAllocation);

      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [connectionState, currentQuestion, currentQuestionIndex]);

  // Generate random feedback during recording
  useEffect(() => {
    if (connectionState === 'recording') {
      const feedbackInterval = setInterval(() => {
        const shouldShowFeedback = Math.random() > 0.7; // 30% chance of showing feedback

        if (shouldShowFeedback) {
          const feedbackType = Math.random() > 0.6 ? 'positive' : 'negative';
          const phrases = realtimeFeedbackPhrases[feedbackType];
          const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

          setFeedback(feedbackType);
          setFeedbackMessage(randomPhrase);

          // Clear feedback after 2 seconds
          setTimeout(() => {
            setFeedback(null);
            setFeedbackMessage('');
          }, 2000);
        }
      }, 5000);

      return () => clearInterval(feedbackInterval);
    }
  }, [connectionState]);

  const handleConnect = useCallback(() => {
    setConnectionState('connecting');

    // Simulate connection process
    setTimeout(() => {
      setConnectionState('connected');
    }, 2000);
  }, []);

  const handleStart = useCallback(() => {
    setConnectionState('recording');
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);

      // Reset timer for next question
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      // End of simulation
      setConnectionState('completed');
    }
  }, [currentQuestionIndex, questions.length]);

  const handleComplete = useCallback(() => {
    // In a real implementation, this would send the recording and get an assessment
    // For now, navigate to the results page
    if (projectId) {
      router.push(`/project/${projectId}/virtual-vc/results`);
    }

    if (onComplete) {
      // Mock assessment result
      onComplete({
        score: 7.5,
        timestamp: new Date().toISOString()
      });
    }
  }, [projectId, router, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle media permission
  const handlePermissionGrant = async () => {
    try {
      // Request permissions
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraEnabled(true);
      setMicEnabled(true);
      setShowPermissionPrompt(false);
      handleConnect();
    } catch (error) {
      console.error("Error requesting permissions:", error);
      // Show fallback UI or error message here
      alert("We need camera and microphone access for the pitch simulation. Please grant permissions and try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Left panel - Video streams */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Virtual VC Pitch Session</h2>
          <div className="flex items-center gap-2">
            <Badge variant={connectionState === 'disconnected' ? 'destructive' :
                  connectionState === 'connecting' ? 'default' :
                  connectionState === 'completed' ? 'secondary' : 'success'}>
              {connectionState === 'disconnected' ? 'Not Connected' :
               connectionState === 'connecting' ? 'Connecting...' :
               connectionState === 'completed' ? 'Completed' : 'Connected'}
            </Badge>
            {connectionState === 'recording' && (
              <Badge variant="destructive" className="animate-pulse">
                Recording
              </Badge>
            )}
          </div>
        </div>

        {/* Video panel */}
        <Card className="mb-4 overflow-hidden relative">
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* VC Video */}
            <div className="rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
              {connectionState === 'disconnected' || connectionState === 'connecting' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  {connectionState === 'connecting' ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
                      <p className="text-gray-400">Connecting to virtual VC...</p>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={activeInvestor.avatar} alt={activeInvestor.name} />
                        <AvatarFallback>{activeInvestor.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-400">{activeInvestor.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{activeInvestor.title}</p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
                  <img
                    src={activeInvestor.avatar}
                    alt={activeInvestor.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium text-sm">{activeInvestor.name}</p>
                    <p className="text-xs opacity-80">{activeInvestor.title}</p>
                  </div>
                </>
              )}

              {/* Feedback indicator */}
              {feedback && (
                <div className={cn(
                  "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                  feedback === 'positive' ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-white"
                )}>
                  {feedback === 'positive' ? <ThumbsUp size={12} /> : <ThumbsDown size={12} />}
                  {feedbackMessage}
                </div>
              )}
            </div>

            {/* User Video */}
            <div className="rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
              {!cameraEnabled ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400">
                  <Video className="h-8 w-8 mb-2" />
                  <p className="text-sm">Camera disabled</p>
                </div>
              ) : (
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
              )}

              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-medium text-sm">You</p>
                <p className="text-xs opacity-80">Entrepreneur</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-muted px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={micEnabled ? "default" : "outline"}
                onClick={() => setMicEnabled(!micEnabled)}
                className="gap-1"
                disabled={connectionState === 'disconnected'}
              >
                {micEnabled ? <Mic size={16} /> : <MicOff size={16} />}
                {micEnabled ? 'Mute' : 'Unmute'}
              </Button>

              <Button
                size="sm"
                variant={cameraEnabled ? "default" : "outline"}
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className="gap-1"
                disabled={connectionState === 'disconnected'}
              >
                {cameraEnabled ? <Video size={16} /> : <VideoOff size={16} />}
                {cameraEnabled ? 'Stop Video' : 'Start Video'}
              </Button>
            </div>

            <div>
              {connectionState === 'disconnected' && (
                <Button onClick={handleConnect}>Connect</Button>
              )}

              {connectionState === 'connected' && (
                <Button onClick={handleStart}>Start Pitch</Button>
              )}

              {connectionState === 'recording' && (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                </Button>
              )}

              {connectionState === 'completed' && (
                <Button onClick={handleComplete}>View Results</Button>
              )}
            </div>
          </div>

          {/* Permission prompt overlay */}
          {showPermissionPrompt && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <Card className="w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">Camera & Microphone Access</h3>
                <p className="text-gray-500 mb-6">
                  This simulation requires access to your camera and microphone to provide the virtual pitch experience.
                  Your recording will be analyzed to provide pitch feedback.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowPermissionPrompt(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePermissionGrant}>
                    Allow Access
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </Card>

        {/* Question & Timer panel */}
        {connectionState === 'recording' && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Current Question</h3>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-amber-500" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            <p className="text-lg mb-4">{currentQuestion.text}</p>

            <div className="space-y-3">
              <Progress
                value={(currentQuestionIndex / questions.length) * 100}
                className="h-2"
              />
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>Focus on: {currentQuestion.expectedTopics.join(', ')}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Right panel - Information and tips */}
      <div className="lg:w-1/3 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Pitch Tips
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              Maintain eye contact with the camera to create connection
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              Speak clearly and vary your tone to maintain engagement
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              Use concise answers focused on the key points
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              Support your claims with data and examples
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              Listen carefully to the full question before answering
            </li>
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">About Your Investor</h3>
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={activeInvestor.avatar} alt={activeInvestor.name} />
              <AvatarFallback>{activeInvestor.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{activeInvestor.name}</p>
              <p className="text-sm text-gray-500">{activeInvestor.title}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">{activeInvestor.bio}</p>
            <div>
              <span className="text-xs font-medium">Investment style:</span>
              <Badge variant="secondary" className="ml-2">{activeInvestor.style}</Badge>
            </div>
            <div>
              <span className="text-xs font-medium">Preferred industries:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeInvestor.preferredIndustries.map(industry => (
                  <Badge key={industry} variant="secondary" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {connectionState === 'recording' && (
          <Card className="p-4 bg-muted">
            <h3 className="font-semibold mb-2">Real-time AI Analysis</h3>
            <p className="text-xs text-gray-500 mb-3">
              Our AI is analyzing your pitch performance in real-time
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Clarity</span>
                  <span>Good</span>
                </div>
                <Progress value={75} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Confidence</span>
                  <span>Excellent</span>
                </div>
                <Progress value={90} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Content Relevance</span>
                  <span>Average</span>
                </div>
                <Progress value={65} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Engagement</span>
                  <span>Good</span>
                </div>
                <Progress value={80} className="h-1.5" />
              </div>
            </div>
          </Card>
        )}

        {connectionState === 'completed' && (
          <Card className="p-4 border-green-200 bg-green-50">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <Check className="h-5 w-5" />
              <h3 className="font-semibold">Pitch Completed</h3>
            </div>
            <p className="text-sm text-green-700 mb-4">
              Your pitch simulation has been completed successfully. View your results to see detailed feedback.
            </p>
            <Button onClick={handleComplete} className="w-full">
              View Detailed Results
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PitchSimulation;
