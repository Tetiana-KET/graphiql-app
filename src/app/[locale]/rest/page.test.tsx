import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RestPage from './page';

vi.mock('./components/RestBody', () => ({
  __esModule: true,
  default: () => <div>RestBody Mock</div>,
}));

describe('RestPage component', () => {
  it('renders RestPage', async () => {
    render(RestPage());

    expect(screen.getAllByText('Method').length).toBe(2);
    expect(screen.getByText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('RestBody Mock')).toBeInTheDocument();
  });
});
