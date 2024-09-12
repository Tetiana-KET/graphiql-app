import { describe, it, expect, vi } from 'vitest';
import { redirect } from 'next/navigation';
import NotFound from '@/app/[locale]/[others]/page';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('NotFound', () => {
  it('should call redirect', async () => {
    await NotFound();

    expect(redirect).toHaveBeenCalledWith('/notFound');
  });
});
