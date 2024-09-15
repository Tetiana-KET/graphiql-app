import { ApiService } from '@/services/api';
import { SerializerService } from '@/services/serializer';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  mockDocumentationResponse,
  mockGraphQLFormData,
} from '../../../../../__tests__/msw/mock';
import GraphResponsePage from './page';

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name
  default: React.forwardRef<HTMLDivElement, unknown>((_props, ref) => (
    <div ref={ref as React.LegacyRef<HTMLDivElement>}>CodeMirror Mock</div>
  )),
}));
vi.mock('@/services/api', () => ({
  ApiService: {
    fetch: vi.fn(),
  },
}));

vi.mock('@/services/serializer', () => ({
  SerializerService: {
    deserialize: vi.fn(),
  },
}));

describe('GraphResponsePage component', () => {
  beforeEach(() => {
    vi.mocked(SerializerService.deserialize).mockReturnValue({
      formData: mockGraphQLFormData,
      request: { method: 'Get' },
    });
    vi.mocked(ApiService.fetch).mockResolvedValue(mockDocumentationResponse);
  });

  it('renders GraphResponsePage with valid data', async () => {
    render(
      await GraphResponsePage({ params: { slug: ['slug'] }, searchParams: {} }),
    );

    expect(await screen.getByText('URL')).toBeInTheDocument();
    expect(await screen.getByText('SDL')).toBeInTheDocument();
  });

  it('renders Invalid URL for invalid deserialized data', async () => {
    vi.mocked(SerializerService.deserialize).mockReturnValue(null);

    render(
      await GraphResponsePage({ params: { slug: ['slug'] }, searchParams: {} }),
    );

    expect(await screen.findByText('Invalid URL')).toBeInTheDocument();
  });

  it('calls ApiService.fetch with correct arguments', async () => {
    render(
      await GraphResponsePage({ params: { slug: ['slug'] }, searchParams: {} }),
    );

    expect(ApiService.fetch).toHaveBeenCalled();
    expect(ApiService.fetch).toHaveBeenCalledWith(mockGraphQLFormData.url, {
      method: 'Get',
    });
    expect(ApiService.fetch).toHaveBeenCalledWith(
      mockGraphQLFormData.sdl,
      expect.objectContaining({ body: expect.any(String) }),
    );
  });
});
