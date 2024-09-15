import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { mockGraphQLRequestHistoryRecord } from '../../../../../__tests__/msw/mock';
import HistoryList from './HistoryList';

let mockHistoryReturnValue = [mockGraphQLRequestHistoryRecord];
const mockMultipleHistoryRecords = [
  {
    ...mockGraphQLRequestHistoryRecord,
    id: '2',
    date: '2023-01-02',
    time: 200,
  },
  {
    ...mockGraphQLRequestHistoryRecord,
    id: '1',
    date: '2023-01-01',
    time: 100,
  },
];

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
      clear: () => {
        mockHistoryReturnValue = [];
      },
    }),
  };
});

describe('HistoryList Component', () => {
  beforeEach(() => {
    mockHistoryReturnValue = [mockGraphQLRequestHistoryRecord];
    vi.resetAllMocks();
  });

  it('shows special text for empty history', () => {
    mockHistoryReturnValue = [];

    render(<HistoryList />);
    const emptyHistoryMessage = screen.getByText((_, element) => {
      return element?.textContent === 'history:emptyHistoryMessage';
    });
    expect(emptyHistoryMessage).toBeInTheDocument();
  });

  it('displays history records', () => {
    render(<HistoryList />);
    const historyRecord = screen.getByText(
      mockGraphQLRequestHistoryRecord.formData.url,
    );
    expect(historyRecord).toBeInTheDocument();
  });

  it('changes sort order when switch is toggled', () => {
    render(<HistoryList />);
    const switchElement = screen.getByTestId('sort-switcher');
    fireEvent.click(switchElement);
    expect(
      screen.getByText('history:sortBy: history:requestTime'),
    ).toBeInTheDocument();
  });

  it('clears history when clear button is clicked', () => {
    render(<HistoryList />);
    const clearButton = screen.getByText('common:Clear');
    fireEvent.click(clearButton);
    const emptyHistoryMessage = screen.getByText('history:emptyHistoryMessage');
    expect(emptyHistoryMessage).toBeInTheDocument();
    expect(mockHistoryReturnValue.length).toBe(0);
  });

  it('displays restore button for each history record', () => {
    render(<HistoryList />);
    const restoreButton = screen.getByText(
      mockGraphQLRequestHistoryRecord.formData.url,
    );
    expect(restoreButton).toBeInTheDocument();
  });

  it('renders the correct number of history records', () => {
    render(<HistoryList />);
    const historyRecords = screen.getAllByText(
      mockGraphQLRequestHistoryRecord.formData.url,
    );
    expect(historyRecords.length).toBe(mockHistoryReturnValue.length);
  });

  it('renders the correct sort order based on isDate state', () => {
    render(<HistoryList />);
    const switchElement = screen.getByTestId('sort-switcher');
    fireEvent.click(switchElement);
    const sortedRecords = screen.getAllByText(
      mockGraphQLRequestHistoryRecord.formData.url,
    );
    expect(sortedRecords.length).toBe(mockHistoryReturnValue.length);
  });

  it('sorts history records by time', () => {
    mockHistoryReturnValue = mockMultipleHistoryRecords;

    render(<HistoryList />);
    const switchElement = screen.getByTestId('sort-switcher');
    fireEvent.click(switchElement);

    const sortedRecords = screen.getAllByText('history:requestDate:');
    expect(sortedRecords[0].parentNode?.textContent).toContain('100ms');
    expect(sortedRecords[1].parentNode?.textContent).toContain('200ms');
  });
});
