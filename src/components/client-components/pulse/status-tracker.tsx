import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

type PulseStatus = 'pending' | 'recruiting' | 'in_progress' | 'analyzing' | 'complete' | 'error';

interface StatusTrackerProps {
  status: PulseStatus;
  participantsTotal: number;
  participantsCompleted: number;
}

const StatusTracker: React.FC<StatusTrackerProps> = ({ 
  status, 
  participantsTotal, 
  participantsCompleted 
}) => {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [websocketMessage, setWebsocketMessage] = useState<string | null>(null);
  
  // Simulate WebSocket events
  useEffect(() => {
    // Initial delay to simulate connection setup
    const timer = setTimeout(() => {
      setAnimateProgress(true);
      
      // Simulate different websocket messages based on status
      const messageInterval = setInterval(() => {
        const messages = {
          pending: [
            "Processing payment...",
            "Setting up research parameters...",
            "Building participant screener..."
          ],
          recruiting: [
            "Recruiting participants matching your criteria...",
            "12 participants in screening process...",
            "Participant from 'Tech-savvy Professionals' segment invited..."
          ],
          in_progress: [
            "Participant #4 completed survey...",
            "Scheduling interview with participant #7...",
            "Remote testing session with participant #3 in progress..."
          ],
          analyzing: [
            "Analyzing feedback from participant #12...",
            "Generating sentiment analysis...",
            "Clustering feedback patterns..."
          ],
          complete: [
            "Report available! Click to view insights...",
            "All participant sessions complete",
            "Actionable insights ready for review"
          ],
          error: [
            "Error with participant recruitment. Our team is fixing it.",
            "Temporary delay in processing responses.",
            "Connection restored. Continuing analysis."
          ]
        };
        
        // Get random message for current status
        const statusMessages = messages[status];
        const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
        
        setWebsocketMessage(randomMessage);
      }, 5000); // New message every 5 seconds
      
      return () => clearInterval(messageInterval);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [status]);
  
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Preparing Research',
          color: 'bg-amber-100 text-amber-800',
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          progress: 10
        };
      case 'recruiting':
        return {
          label: 'Recruiting Participants',
          color: 'bg-blue-100 text-blue-800',
          icon: <Users className="h-5 w-5 text-blue-500" />,
          progress: 30
        };
      case 'in_progress':
        return {
          label: 'Testing In Progress',
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-5 w-5 text-blue-500" />,
          progress: 50
        };
      case 'analyzing':
        return {
          label: 'Analyzing Results',
          color: 'bg-purple-100 text-purple-800', 
          icon: <Clock className="h-5 w-5 text-purple-500" />,
          progress: 80
        };
      case 'complete':
        return {
          label: 'Research Complete',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          progress: 100
        };
      case 'error':
        return {
          label: 'Processing Issue',
          color: 'bg-red-100 text-red-800',
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          progress: participantsCompleted / participantsTotal * 100
        };
      default:
        return {
          label: 'Unknown Status',
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-5 w-5 text-gray-500" />,
          progress: 0
        };
    }
  };
  
  const { label, color, icon, progress } = getStatusInfo();
  const progressPercentage = status !== 'complete' 
    ? Math.min(progress, (participantsCompleted / participantsTotal) * 100)
    : 100;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Real-World Pulse Status</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
          {icon}
          <span className="ml-1">{label}</span>
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-sm font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: animateProgress ? `${progressPercentage}%` : '0%' }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">Participants</span>
        <span className="text-sm font-medium text-gray-900">
          {participantsCompleted} of {participantsTotal} complete
        </span>
      </div>
      
      {/* WebSocket style live updates */}
      <div className="bg-gray-50 rounded p-3 text-sm">
        <div className="flex items-start">
          <div className="min-w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
          <div>
            <div className="text-gray-600">
              {websocketMessage || "Connected to research status feed..."}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;