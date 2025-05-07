import React from 'react';
import { render } from '@testing-library/react';
import PersonaCard from '../PersonaCard';
import { ChatPersona } from '../../../../types';

describe('PersonaCard', () => {
  const mockPersona: ChatPersona = {
    id: 'test-persona-1',
    name: 'Alex Chen',
    role: 'investor',
    avatarUrl: '/assets/avatars/investor.png'
  };

  const defaultProps = {
    persona: mockPersona,
    isSelected: false,
    onSelect: jest.fn(),
    onShowDetails: jest.fn(),
    jobTitle: 'Angel Investor',
    needsSnippet: 'Looking for innovative solutions with clear market potential.'
  };

  it('renders correctly when not selected', () => {
    const { container } = render(<PersonaCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when selected', () => {
    const { container } = render(
      <PersonaCard 
        {...defaultProps}
        isSelected={true}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays the correct persona information', () => {
    const { getByText } = render(<PersonaCard {...defaultProps} />);
    
    expect(getByText('Alex Chen')).toBeInTheDocument();
    expect(getByText('Angel Investor')).toBeInTheDocument();
    expect(getByText('Looking for innovative solutions with clear market potential.')).toBeInTheDocument();
    expect(getByText('Chat with Alex')).toBeInTheDocument();
  });

  it('shows "Selected" button text when selected', () => {
    const { getByText } = render(
      <PersonaCard 
        {...defaultProps}
        isSelected={true}
      />
    );
    
    expect(getByText('Selected')).toBeInTheDocument();
  });
});