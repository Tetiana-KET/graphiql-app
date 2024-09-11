import { render, screen } from '@testing-library/react';
import { TFunction } from 'i18next';
import { DeveloperCardProps } from '@/components/DeveloperCard/DeveloperCard';
import { techStack } from '@/consts/techStack';
import { teamMembersData } from '@/consts/teamData';
import Image from 'next/image';
import WelcomeMainContent from './WelcomeMainContent';
import { mockDeveloperData } from '../../../../../__tests__/msw/mock';

vi.mock('@/consts/techStack', () => ({
  techStack: vi.fn(),
}));

vi.mock('@/consts/teamData', () => ({
  teamMembersData: vi.fn(),
}));

vi.mock('@/components/SectionDivider/SectionDivider', () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid={`sectionDivider-${title}`}>{title}</div>
  ),
}));

vi.mock('@/components/TechCard/TechnologyCard', () => ({
  default: ({
    title,
    imgSrc,
    description,
  }: {
    title: string;
    imgSrc: string;
    description: string;
  }) => (
    <div data-testid={`technologyCard-${title}`}>
      <h3>{title}</h3>
      <Image src={imgSrc} alt={title} width={250} height={250} />
      <p>{description}</p>
    </div>
  ),
}));

vi.mock('@/components/DeveloperCard/DeveloperCard', () => ({
  default: ({ developer }: DeveloperCardProps) => (
    <div data-testid={`developerCard-${developer.id}`} />
  ),
}));

const mockTFunction = ((key: string) => key) as TFunction<
  ['translation', ...string[]],
  undefined
>;

describe('WelcomeMainContent component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sections and cards correctly', () => {
    vi.mocked(techStack).mockReturnValue([
      {
        title: 'React',
        imgSrc: '/react.jpg',
        description: 'A JavaScript library for building user interfaces',
      },
    ]);

    vi.mocked(teamMembersData).mockReturnValue([mockDeveloperData]);

    render(<WelcomeMainContent t={mockTFunction} />);

    expect(
      screen.getByTestId('sectionDivider-welcome:title1'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('sectionDivider-welcome:title2'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('sectionDivider-welcome:title3'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('sectionDivider-welcome:title4'),
    ).toBeInTheDocument();

    expect(screen.getByTestId('technologyCard-React')).toBeInTheDocument();
    expect(
      screen.getByText('A JavaScript library for building user interfaces'),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('developerCard-DeveloperName'),
    ).toBeInTheDocument();
  });
});
