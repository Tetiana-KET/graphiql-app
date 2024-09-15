import { describe, it, expect, vi } from 'vitest';
import { ApiService } from '@/services/api';
import { ApiResponse } from '@/models/ApiResponse';
import { HttpStatusCode } from '@/enums/HttpStatusCode';

describe('ApiService', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockRequest: RequestInit = { method: 'GET' };

  it('should return a valid ApiResponse on successful fetch', async () => {
    const mockResponse = {
      status: 200,
      json: vi.fn().mockResolvedValue({ key: 'value' }),
    };
    global.fetch = vi
      .fn()
      .mockResolvedValue(mockResponse as unknown as Response);

    const result: ApiResponse = await ApiService.fetch(mockUrl, mockRequest);

    expect(result).toHaveProperty('id');
    expect(result.data).toEqual({ key: 'value' });
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(result.error).toBeNull();
    expect(result.time).toBeGreaterThanOrEqual(0);
  });

  it('should handle fetch errors correctly', async () => {
    const mockError = new Error('Fetch error');
    global.fetch = vi.fn().mockRejectedValue(mockError);

    const result: ApiResponse = await ApiService.fetch(mockUrl, mockRequest);

    expect(result).toHaveProperty('id');
    expect(result.data).toBeNull();
    expect(result.status).toBeNull();
    expect(result.error).toEqual(JSON.parse(JSON.stringify(mockError)));
    expect(result.time).toBeGreaterThanOrEqual(0);
  });

  it('should return empty data for methods in EMPTY_METHODS', async () => {
    const mockResponse = {
      status: 200,
      json: vi.fn(),
    };
    global.fetch = vi
      .fn()
      .mockResolvedValue(mockResponse as unknown as Response);

    const result: ApiResponse = await ApiService.fetch(mockUrl, {
      method: 'HEAD',
    });

    expect(result).toHaveProperty('id');
    expect(result.data).toEqual({});
    expect(result.status).toBe(HttpStatusCode.OK);
    expect(result.error).toBeNull();
    expect(result.time).toBeGreaterThanOrEqual(0);
  });
});
