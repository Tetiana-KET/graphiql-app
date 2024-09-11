import { fireEvent, render, screen } from '@testing-library/react';

import { mockGraphQLRequestHistoryRecord } from '../../../../../../__tests__/msw/mock';
import { HistoryRecord } from './HistoryRecord';

describe('HistoryRecord Component', () => {
  it('HistoryRecord Component renders as expected', () => {
    render(<HistoryRecord record={mockGraphQLRequestHistoryRecord} />);
    const requestType = screen.getByText('GRAPHQL');
    expect(requestType).toBeInTheDocument();
  });
  it.skip('Change page on click on related button', () => {
    render(<HistoryRecord record={mockGraphQLRequestHistoryRecord} />);
    const restoreButton = screen.getByText('history:restore');
    fireEvent.click(restoreButton);
  });
});
