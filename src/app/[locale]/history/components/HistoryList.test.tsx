import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { mockGraphQLRequestHistoryRecord } from '../../../../../__tests__/msw/mock';
import HistoryList from './HistoryList';

let mockHistoryReturnValue = [mockGraphQLRequestHistoryRecord];

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: vi.fn((key) => key),
  }),
}));

vi.mock('@/hooks/useHistory', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks/useHistory')>();
  return {
    ...actual,
    useHistory: () => ({
      get: () => mockHistoryReturnValue,
      clear: vi.fn(),
    }),
  };
});

describe('HistoryList Component', () => {
  it('HistoryList Component shows special text for empty history', () => {
    mockHistoryReturnValue = [];

    render(<HistoryList />);
    const emptyHistoryMessage = screen.getByText('history:emptyHistoryMessage');
    expect(emptyHistoryMessage).toBeInTheDocument();
  });

  beforeEach(() => {
    mockHistoryReturnValue = [mockGraphQLRequestHistoryRecord];
    vi.resetAllMocks();
  });

  it('Change page on click on related button', async () => {
    render(<HistoryList />);
    const restoreButton = screen.getByText(
      mockGraphQLRequestHistoryRecord.formData.url,
    );
    expect(restoreButton).toBeInTheDocument();
  });
});
