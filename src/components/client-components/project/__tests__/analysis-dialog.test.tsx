import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AnalysisDialog from '../analysis-dialog';
import '@testing-library/jest-dom';

// Mock the data
const mockProjectId = 'project-1';
const mockProjectName = 'EcoBottle';
const mockAnalysis = {
  summary: "The EcoBottle concept strongly resonates within eco-conscious communities.",
  keyInsights: [
    {
      text: "86% of discussions about reusable bottles mention sustainability as a primary purchase driver",
      relevance: 0.95,
      source: "Reddit r/ZeroWaste"
    },
    {
      text: "Design aesthetics are mentioned in 62% of positive comments",
      relevance: 0.85,
      source: "Instagram"
    }
  ],
  demographics: {
    ageGroups: [
      { name: "18-24", percentage: 0.32, sentiment: { positive: 0.75, neutral: 0.15, negative: 0.1 } },
      { name: "25-34", percentage: 0.41, sentiment: { positive: 0.68, neutral: 0.22, negative: 0.1 } }
    ],
    genderDistribution: [
      { name: "Female", percentage: 0.58, sentiment: { positive: 0.72, neutral: 0.18, negative: 0.1 } },
      { name: "Male", percentage: 0.41, sentiment: { positive: 0.61, neutral: 0.24, negative: 0.15 } }
    ],
    occupations: [
      { name: "Students", percentage: 0.27 },
      { name: "Professionals", percentage: 0.35 }
    ],
    interests: [
      { name: "Sustainability", percentage: 0.72 },
      { name: "Fitness/Health", percentage: 0.58 }
    ]
  },
  sentimentAnalysis: {
    overall: { positive: 0.67, neutral: 0.21, negative: 0.12 }
  },
  themes: [
    {
      theme: "Environmental Impact",
      count: 1243,
      sentiment: { positive: 0.82, neutral: 0.13, negative: 0.05 },
      keywords: ["plastic-free", "ocean plastic", "carbon footprint"]
    }
  ],
  recommendations: [
    "Emphasize sustainable manufacturing practices in marketing materials",
    "Develop a range of color options and designs"
  ]
};

// Mock the necessary components
jest.mock('../../../ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }) => (
    open ? <div data-testid="mock-dialog">{children}</div> : null
  ),
  DialogContent: ({ children }) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }) => <div data-testid="dialog-title">{children}</div>,
  DialogDescription: ({ children }) => <div data-testid="dialog-description">{children}</div>
}));

jest.mock('../../../ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange }) => (
    <div data-testid="tabs" data-value={value}>
      {children}
    </div>
  ),
  TabsList: ({ children }) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value, onClick }) => (
    <button data-testid={`tab-${value}`} onClick={() => onClick && onClick()}>
      {children}
    </button>
  ),
  TabsContent: ({ children, value }) => (
    <div data-testid={`tab-content-${value}`}>{children}</div>
  )
}));

jest.mock('../../../ui/tooltip', () => ({
  TooltipProvider: ({ children }) => <div data-testid="tooltip-provider">{children}</div>,
  Tooltip: ({ children }) => <div data-testid="tooltip">{children}</div>,
  TooltipTrigger: ({ children, asChild }) => (
    <div data-testid="tooltip-trigger">{children}</div>
  ),
  TooltipContent: ({ children }) => <div data-testid="tooltip-content">{children}</div>
}));

describe('AnalysisDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the analysis button correctly', () => {
    render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    expect(screen.getByText('View Netnographic Analysis')).toBeInTheDocument();
  });

  it('opens the dialog when button is clicked', async () => {
    render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    // Click the button to open the dialog
    const button = screen.getByText('View Netnographic Analysis');
    fireEvent.click(button);
    
    // Check if dialog content is displayed
    await waitFor(() => {
      expect(screen.getByTestId('mock-dialog')).toBeInTheDocument();
    });
  });

  it('displays the correct project name in the dialog title', async () => {
    render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    // Open the dialog
    const button = screen.getByText('View Netnographic Analysis');
    fireEvent.click(button);
    
    // Check if the project name is in the title
    await waitFor(() => {
      expect(screen.getByTestId('dialog-title')).toHaveTextContent(`Netnographic Analysis for ${mockProjectName}`);
    });
  });

  it('shows the overview tab content by default', async () => {
    render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    // Open the dialog
    const button = screen.getByText('View Netnographic Analysis');
    fireEvent.click(button);
    
    // Check if the tabs component has the default value of 'overview'
    await waitFor(() => {
      const tabsElement = screen.getByTestId('tabs');
      expect(tabsElement).toHaveAttribute('data-value', 'overview');
    });
  });

  it('displays summary and key insights in the overview tab', async () => {
    render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    // Open the dialog
    const button = screen.getByText('View Netnographic Analysis');
    fireEvent.click(button);
    
    // Check for summary and key insights content
    await waitFor(() => {
      expect(screen.getByText(mockAnalysis.summary)).toBeInTheDocument();
      expect(screen.getByText(mockAnalysis.keyInsights[0].text)).toBeInTheDocument();
      expect(screen.getByText(mockAnalysis.keyInsights[1].text)).toBeInTheDocument();
    });
  });

  it('closes the dialog when the close button is clicked', async () => {
    const { rerender } = render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    // Open the dialog
    const openButton = screen.getByText('View Netnographic Analysis');
    fireEvent.click(openButton);
    
    // Verify dialog is open
    await waitFor(() => {
      expect(screen.getByTestId('mock-dialog')).toBeInTheDocument();
    });
    
    // Find and click the close button
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    // For this test to work with our mocked Dialog, we need to manually rerender
    // to simulate the state update
    rerender(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={mockAnalysis}
      />
    );
    
    // Verify dialog is closed
    expect(screen.queryByTestId('mock-dialog')).not.toBeInTheDocument();
  });

  it('returns null if analysis data is not provided', () => {
    const { container } = render(
      <AnalysisDialog 
        projectId={mockProjectId}
        projectName={mockProjectName}
        analysis={undefined}
      />
    );
    
    // The component should not render anything if analysis is undefined
    expect(container.firstChild).toBeNull();
  });
});