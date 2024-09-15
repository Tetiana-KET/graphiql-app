import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SerializerService } from '@/services/serializer';
import { ApiService } from '@/services/api';
import { mockRestFormData } from '../../../../../__tests__/msw/mock';
import RestResponsePage from './page';

vi.mock('../components/RestBody', () => ({
  __esModule: true,
  default: () => <div>RestBody Mock</div>,
}));

vi.mock('@/services/api', () => ({
  ApiService: {
    fetch: vi.fn(() => ({})),
  },
}));

vi.mock('@/services/serializer', () => ({
  SerializerService: {
    deserialize: vi.fn(() => ({
      formData: mockRestFormData,
      request: { method: 'Post' },
    })),
  },
}));

describe('RestResponsePage component', () => {
  it('renders RestResponsePage', async () => {
    render(
      await RestResponsePage({ params: { slug: ['slug'] }, searchParams: {} }),
    );

    expect(screen.getAllByText('Method').length).toBe(2);
    expect(screen.getByText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('RestBody Mock')).toBeInTheDocument();
  });

  it('renders invalid url', async () => {
    vi.mocked(SerializerService.deserialize).mockReturnValue(null);

    render(
      await RestResponsePage({ params: { slug: ['slug'] }, searchParams: {} }),
    );

    expect(await screen.findByText('Invalid URL')).toBeInTheDocument();
  });

  it('calls ApiService.fetch with correct arguments', async () => {
    render(
      await RestResponsePage({ params: { slug: ['slug'] }, searchParams: {} }),
    );

    expect(ApiService.fetch).toHaveBeenCalled();
    expect(ApiService.fetch).toHaveBeenCalledWith(mockRestFormData.url, {
      method: 'Post',
    });
  });
});
