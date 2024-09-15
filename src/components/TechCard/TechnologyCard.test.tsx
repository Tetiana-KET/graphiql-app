import { render, screen } from '@testing-library/react';
import TechnologyCard from './TechnologyCard';
import { mockTechnologyCard } from '../../../__tests__/msw/mock';

describe('TechnologyCard', () => {
  it('is rendered with correct context', () => {
    render(<TechnologyCard {...mockTechnologyCard} />);

    expect(screen.getByTestId('technologyCardTitle')).toBeInTheDocument();
    expect(screen.getByTestId('technologyCardDescription')).toBeInTheDocument();

    expect(screen.getByTestId('technologyCardTitle')).toHaveTextContent(
      `${mockTechnologyCard.title}`,
    );
    expect(screen.getByTestId('technologyCardDescription')).toHaveTextContent(
      `${mockTechnologyCard.description}`,
    );
  });
});
