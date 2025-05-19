// src/app/project/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Edit, Download, Users, AlertTriangle, Lightbulb, Briefcase, Swords, Sparkles, Megaphone } from 'lucide-react';
import ShareTeamDialog from '@/components/project/ShareTeamDialog';
import ActionButtons from '../../../components/project/ActionButtons';
import analysisByProjectId from '../../../mocks/analysis-data';
import { AnalysisSection } from '../../../components/project/dashboard/AnalysisSection';
import { Button } from '../../../components/ui/button';
import { useAppContext } from '../../../providers/app-provider';
import { ProjectStage } from '../../../types';
import { MetricsBadges } from '../../../components/client-components/project/metrics-badges';
import PersonaCard from '../../../components/client-components/persona/PersonaCard';
import PersonaModal from '../../../components/client-components/persona/PersonaModal';
import { GroupChat } from '../../../components/project/chat/GroupChat';
import { mockChatPersonas } from '../../../mocks';
import { financialMetrics } from '../../../mocks/financial-metrics';

// Component for showing pitch details in a clean way
const PitchDetail = ({ label, value, icon: Icon, color }: { label: string; value: string; icon?: React.ElementType; color?: string }) => (
  <div className="mb-4">
    <div className="flex items-center mb-1">
      {Icon && <Icon className={`h-4 w-4 mr-2 ${color || "text-gray-500"}`} />}
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    </div>
    <p className="text-gray-800 ml-6">{value || "Not defined yet"}</p>
  </div>
);

// Sample persona details for enhancing the mock data
const personaDetails = [
  {
    jobTitle: "Freelance Animator and Content Creator",
    needsSnippet: "Seeks efficient and creative tools to streamline animation and storytelling.",
    needsDetails: "Needs to create engaging animated podcasts quickly and efficiently, maintain a consistent brand voice, experiment with different character voices without hiring voice actors, save time on scriptwriting and emotion adaptation, and build a loyal audience.",
    background: "Represents the growing segment of independent animators and content creators who constantly seek efficient, creative tools. Early adopters of new technologies, they influence peers through their work and innovation.",
    goals: ["Produce high-quality content faster", "Expand audience reach", "Maintain creative control and brand consistency"],
    challenges: ["Time-consuming animation and voice production", "High costs for professional voice actors", "Limited emotional range of standard AI voices"],
    preferredCommunication: "Animation forums, YouTube animation communities, Patreon, Discord servers for animators, online animation courses."
  },
  {
    jobTitle: "Marketing Manager at a Tech Startup",
    needsSnippet: "Aims to integrate podcasts into brand marketing with minimal friction.",
    needsDetails: "Needs to create high-quality branded podcasts, maintain a consistent brand voice, experiment with different voice styles, save time on scriptwriting and emotional adaptation, track podcast performance metrics, and generate leads through audio content.",
    background: "Represents the growing trend of marketers using podcasts as a strategic channel for brand building and lead generation. They require tools that align tightly with brand standards and provide measurable ROI.",
    goals: ["Enhance brand presence through audio content", "Generate qualified leads via podcasts", "Maintain strong brand voice and authenticity"],
    challenges: ["Producing quality content consistently under time pressure", "Maintaining emotional authenticity in AI-generated voices", "Measuring and optimizing podcast performance"],
    preferredCommunication: "Marketing conferences, marketing blogs, LinkedIn marketing groups, podcasting communities, online marketing courses."
  },
  {
    jobTitle: "Independent Online Educator",
    needsSnippet: "Wants scalable, time-saving solutions to grow educational content output.",
    needsDetails: "Needs to create engaging educational podcasts quickly and efficiently, maintain a consistent and personal teaching style, experiment with different voice styles, save time on scriptwriting and emotion adaptation, build a loyal student base, and generate sustainable revenue.",
    background: "Represents the booming online education economy, looking for scalable tools to produce authentic, high-quality educational content while keeping direct connection with students.",
    goals: ["Expand reach with more content formats", "Deliver high-quality lessons efficiently", "Build loyal communities of learners"],
    challenges: ["Managing time across content creation and student engagement", "Maintaining authentic teaching style with automation", "Standing out in a saturated education market"],
    preferredCommunication: "Online education platforms, educational forums, social media groups for educators, podcasting communities, online course marketplaces."
  },
  {
    jobTitle: "Freelance Podcaster and Travel Blogger",
    needsSnippet: "Needs portable, flexible tools to create authentic travel storytelling from anywhere.",
    needsDetails: "Needs to create high-quality travel podcasts remotely, maintain a consistent brand voice, experiment with different voice styles without needing extensive setups, save time on scriptwriting and emotion adaptation, build a loyal global following, and monetize content effectively.",
    background: "Represents the fast-growing digital nomad lifestyle, creating content while traveling. They need lightweight, adaptable tools to produce professional storytelling across diverse locations.",
    goals: ["Produce compelling podcasts while traveling", "Maintain audience connection from remote locations", "Monetize content sustainably"],
    challenges: ["Limited access to professional recording resources while traveling", "High costs and logistics of voice acting remotely", "Maintaining authenticity with AI-generated voices"],
    preferredCommunication: "Travel blogs, podcasting communities, social media groups for digital nomads, online travel forums, remote work platforms."
  }
];

// Define the StageUIDetail interface
interface StageUIDetail {
  color: string;
  label: string;
  description: string;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { state } = useAppContext();
  const { projects } = state;
  const project = projects.find(p => p.id === params.id);

  // State for persona selection and modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewingPersona, setViewingPersona] = useState<number | null>(null);
  const [showGroupChat, setShowGroupChat] = useState(false);

  if (!project) {
    // If the project is not found, redirect to a 404 page
    console.error(`Project with ID '${params.id}' not found.`);
    notFound();
  }

  const stageInfo: Partial<Record<ProjectStage, StageUIDetail>> = {
    [ProjectStage.IDEA]: {
      color: 'bg-blue-100 text-blue-800',
      label: 'IDEA',
      description: 'Define your business idea and core concept.'
    },
    [ProjectStage.SERIES_A]: { // Added
      color: 'bg-purple-100 text-purple-800',
      label: 'SERIES A',
      description: 'Validate your idea and test assumptions.'
    },
    [ProjectStage.PROTOTYPE]: {
      color: 'bg-blue-100 text-gray-800', // Note: dashboard uses purple for validation, consider if this should be different
      label: 'PROTOTYPE',
      description: 'Create a prototype to test your idea.'
    },
    [ProjectStage.SERIES_B]: { // This was missing from your original ProjectPage stageInfo, but present in dashboard's ProjectCard
      color: 'bg-amber-100 text-amber-800',
      label: 'SERIES B',
      description: 'Prepare your pitch deck for presentation.' // Added from dashboard's ProjectCard, you might have this as DECK_CREATION
    },
    [ProjectStage.PRE_SEED]: { // Renamed from PITCH_DECK in dashboard's ProjectCard if this is the intended mapping
      color: 'bg-amber-100 text-amber-800',
      label: 'PRE-SEED',
      description: 'Create your pitch presentation.'
    },
    [ProjectStage.MVP]: {
      color: 'bg-green-100 text-green-800',
      label: 'MVP',
      description: 'Perfect your pitch and presentation.'
    },
    [ProjectStage.SERIES_C]: { // Added
      color: 'bg-green-100 text-green-800',
      label: 'SERIES C',
      description: 'Your project is ready for investor review.'
    }
    // Add other stages like TESTING if they are used and need a detail page view
  };

  const currentStageDetails = stageInfo[project.stage];

  if (!currentStageDetails) {
    // This case implies that the project's stage is not configured for display.
    // Calling notFound() is a reasonable way to handle this, similar to project not found.
    console.error(`Display details for project stage '${project.stage}' are not defined.`);
    notFound();
  }
  const { color, label, description } = currentStageDetails;

  // Determine the next stage for the project
  const getNextStage = () => {
    switch (project.stage) {
      case ProjectStage.IDEA:
        return ProjectStage.IDEA;
      case ProjectStage.PROTOTYPE:
        return ProjectStage.PROTOTYPE;
      case ProjectStage.PRE_SEED:
        return ProjectStage.PRE_SEED;
      case ProjectStage.SEED:
        return ProjectStage.SEED;
      case ProjectStage.MVP:
        return ProjectStage.MVP;
      case ProjectStage.SERIES_A:
        return ProjectStage.SERIES_A;
      case ProjectStage.SERIES_B:
        return ProjectStage.SERIES_B;
      case ProjectStage.SERIES_C:
        return ProjectStage.SERIES_C;
      default:
        return null;
    }
  };

  // Handle persona selection
  const handleSelectPersona = (index: number) => {
    setSelectedIndex(index);
    console.log(`navigate to /project/${params.id}/chat?persona=${index}`);
  };

  // Handle modal open/close
  const handleShowPersonaDetails = (index: number) => {
    setViewingPersona(index);
  };

  const handleCloseModal = () => {
    setViewingPersona(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Back link and project title */}
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center mt-2">
              <span className={`${color} text-xs px-2 py-1 rounded-full font-medium mr-2`}>{label}</span>
              <span className="text-gray-500 text-sm">{description}</span>
            </div>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/project/${project.id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            <ShareTeamDialog
              projectId={project.id}
              projectName={project.name}
              variant="outline"
              size="sm"
            />
            {(project.stage === ProjectStage.PRE_SEED || project.stage === ProjectStage.MVP || project.stage === ProjectStage.SEED) && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download Deck
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Project details */}
        <div className="lg:col-span-2">
          {/* Metrics Badges */}
          <div className="mb-6">
            <MetricsBadges
              cac={financialMetrics.cac}
              cltv={financialMetrics.cltv}
              ratio={financialMetrics.cacCltvRatio}
              tam={financialMetrics.tam}
              potentialEarnings={financialMetrics.potentialEarnings}
              marketGrowthRate={financialMetrics.marketGrowthRate}
              projectedMarketShare={financialMetrics.projectedMarketShare}
              averageGrossMargin={financialMetrics.averageGrossMargin}
              typicalCacPayback={financialMetrics.typicalCacPayback}
              avgTimeToMvp={financialMetrics.avgTimeToMvp}
              avgTimeToFirstRevenue={financialMetrics.avgTimeToFirstRevenue}
              avgSalesCycleLength={financialMetrics.avgSalesCycleLength}
              seedToLaunchWindow={financialMetrics.seedToLaunchWindow}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>

            {/* Display fullDescription if available */}
            {project.pitch.fullDescription && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Full Project Description</h3>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {project.pitch.fullDescription}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <PitchDetail label="Problem" value={project.pitch.problem} icon={AlertTriangle} color="text-red-300" />
              <PitchDetail label="Solution" value={project.pitch.solution} icon={Lightbulb} color="text-blue-300" />
              <PitchDetail label="Target Market" value={project.pitch.targetMarket} icon={Users} color="text-green-300" />
              <PitchDetail label="Business Model" value={project.pitch.businessModel} icon={Briefcase} color="text-yellow-300" />
              <PitchDetail label="Competition" value={project.pitch.competition} icon={Swords} color="text-purple-300" />
              <PitchDetail label="Unique Selling Point" value={project.pitch.uniqueSellingPoint} icon={Sparkles} color="text-pink-300" />
              <PitchDetail label="Marketing Strategy" value={project.pitch.marketingStrategy} icon={Megaphone} color="text-indigo-300" />
            </div>
          </div>

          {/* Analysis Section */}
          <div className="mb-6">
            <AnalysisSection
              analyses={analysisByProjectId[project.id] || []}
              onAnalysisClick={(analysis) => {
                console.log('Analysis clicked:', analysis);
              }}
            />
          </div>

          {/* Target Personas Section */}
{/* Personas Section */}
<div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal Customers</h2>
            {!showGroupChat && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockChatPersonas.map((persona, index) => {
                    const details = personaDetails[index % personaDetails.length];
                    const enhancedPersona = {
                      ...persona,
                      primaryDetail: details.background,
                      description: details.needsDetails,
                      accentColor: "#6366f1", // You can set a color or map dynamically
                      needsSnippet: details.needsSnippet,
                      jobTitle: details.jobTitle,
                    };
                    return (
                      <PersonaCard
                        key={persona.id}
                        persona={enhancedPersona}
                        onShowDetails={() => handleShowPersonaDetails(index)}
                      />
                    );
                  })}
                </div>
                <Button
                  onClick={() => window.location.href = `/project/${params.id}/chat`}
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 text-lg"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Chat with Personas
                </Button>
              </>
            )}
            {showGroupChat && (
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowGroupChat(false)}
                  className="mb-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to Personas
                </Button>
                <GroupChat />
              </div>
            )}
          </div>          {/* Pitch Deck Preview */}
          {(project.stage === ProjectStage.PRE_SEED || project.stage === ProjectStage.MVP) && project.pitchDeck?.slides.length ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pitch Deck</h2>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/project/${project.id}/deck`}>Edit Deck</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.pitchDeck.slides.slice(0, 6).map((slide) => (
                  <div key={slide.id} className="aspect-[16/9] bg-gray-100 rounded border flex items-center justify-center p-2">
                    <div className="text-center">
                      <p className="font-medium">{slide.content.title || "Slide"}</p>
                      <p className="text-xs text-gray-500">{slide.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Right column: Action Buttons */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <ActionButtons projectId={project.id} />
          </div>
        </div>
      </div>

      {/* Persona Modal */}
{/* Persona Modal */}
{viewingPersona !== null && (
        <PersonaModal
          persona={mockChatPersonas[viewingPersona]}
          isOpen={viewingPersona !== null}
          onClose={handleCloseModal}
          jobTitle={personaDetails[viewingPersona % personaDetails.length].jobTitle}
          needsDetails={personaDetails[viewingPersona % personaDetails.length].needsDetails}
          background={personaDetails[viewingPersona % personaDetails.length].background}
          goals={personaDetails[viewingPersona % personaDetails.length].goals}
          challenges={personaDetails[viewingPersona % personaDetails.length].challenges}
          preferredCommunication={personaDetails[viewingPersona % personaDetails.length].preferredCommunication}
        />
      )}
    </div>
  );
}
