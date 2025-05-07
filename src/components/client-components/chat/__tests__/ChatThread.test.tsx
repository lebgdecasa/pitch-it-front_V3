import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatThread } from '../ChatThread';
import { mockChatPersonas } from '../../../../mocks';

// Mock the date-fns library
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => '5 minutes ago'),
}));

// Mock the createMockChatMessages function
jest.mock('../../../../mocks', () => ({
  mockChatPersonas: [
    {
      id: 'persona-1',
      name: 'Alex Chen',
      role: 'investor',
      avatarUrl: '/assets/avatars/investor.png'
    },
    {
      id: 'persona-4',
      name: 'Jane Smith',
      role: 'founder',
      avatarUrl: '/assets/avatars/founder.png'
    }
  ],
  createMockChatMessages: jest.fn(() => [
    {
      id: '1',
      persona: 'investor',
      content: 'Tell me about your business model',
      timestamp: '2023-01-01T12:00:00.000Z',
      avatarUrl: '/assets/avatars/investor.png'
    },
    {
      id: '2',
      persona: 'founder',
      content: 'We use a subscription-based model',
      timestamp: '2023-01-01T12:05:00.000Z',
      avatarUrl: '/assets/avatars/founder.png'
    }
  ])
}));

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('ChatThread', () => {
  const mockProps = {
    projectId: 'project-1',
    personaId: 'persona-1',
    onSelectDifferentPersona: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders chat thread with messages', () => {
    render(<ChatThread {...mockProps} />);
    
    // Check if persona name is displayed
    expect(screen.getByText('Alex Chen')).toBeInTheDocument();
    
    // Check if messages are displayed
    expect(screen.getByText('Tell me about your business model')).toBeInTheDocument();
    expect(screen.getByText('We use a subscription-based model')).toBeInTheDocument();
  });

  it('allows sending a new message', async () => {
    render(<ChatThread {...mockProps} />);
    
    // Get the input field
    const input = screen.getByPlaceholderText('Type your message...');
    
    // Type a message and send it
    fireEvent.change(input, { target: { value: 'This is a test message' } });
    fireEvent.click(screen.getByRole('button'));
    
    // Check if the new message appears in the thread
    await waitFor(() => {
      expect(screen.getByText('This is a test message')).toBeInTheDocument();
    });
    
    // Check if an AI response is generated after sending a message
    await waitFor(() => {
      const responseElements = screen.getAllByText(/investment decision|alternative revenue streams|market size estimates/i);
      expect(responseElements.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it('shows "All Personas" button that calls onSelectDifferentPersona when clicked', () => {
    render(<ChatThread {...mockProps} />);
    
    // Find and click the "All Personas" button
    const button = screen.getByText('All Personas');
    fireEvent.click(button);
    
    // Check if the callback was called
    expect(mockProps.onSelectDifferentPersona).toHaveBeenCalled();
  });
});