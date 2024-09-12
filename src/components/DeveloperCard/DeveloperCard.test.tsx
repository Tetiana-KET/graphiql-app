import { render, screen } from '@testing-library/react';
import DeveloperCard from './DeveloperCard';
import { mockDeveloperData } from '../../../__tests__/msw/mock';

describe('DeveloperCard', () => {
  it('is rendered with correct context', () => {
    render(<DeveloperCard developer={mockDeveloperData} />);

    expect(screen.getByTestId('developerCard')).toBeInTheDocument();
    const gitHubLink = screen.getByTestId('developerHeader').querySelector('a');
    expect(gitHubLink).toHaveAttribute('href', `${mockDeveloperData.github}`);

    expect(screen.getByTestId('developerName')).toHaveTextContent(
      `${mockDeveloperData.name}`,
    );
    expect(screen.getByTestId('developerRole')).toHaveTextContent(
      `${mockDeveloperData.role}`,
    );
    expect(screen.getByTestId('developerContribution')).toHaveTextContent(
      `${mockDeveloperData.contribution}`,
    );
  });
});
