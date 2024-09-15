import { describe, it, expect, vi } from 'vitest';
import { middleware } from '@/middleware';
import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
import i18nConfig from '../i18nConfig';

vi.mock('next-i18n-router', () => ({
  i18nRouter: vi.fn(),
}));

describe('middleware', () => {
  it('should call i18nRouter with correct arguments', () => {
    const mockRequest = {
      nextUrl: new URL('http://localhost/test'),
    } as NextRequest;

    middleware(mockRequest);

    expect(i18nRouter).toHaveBeenCalledWith(mockRequest, i18nConfig);
  });
});
