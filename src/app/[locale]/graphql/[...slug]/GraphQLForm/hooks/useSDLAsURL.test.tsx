import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { vi } from 'vitest';
import { useSDLAsURL } from './useSDLAsURL';

const mockSetValue = vi.fn();
const mockWatch = vi.fn();

describe('useSDLAsURL Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the correct default values', () => {
    mockWatch.mockReturnValue('');

    const { result } = renderHook(() =>
      useSDLAsURL({ watch: mockWatch, setValue: mockSetValue }),
    );

    expect(result.current.isSDLAsURL).toBe(true);
    expect(result.current.URLValue).toBe('');
    expect(result.current.SDLValue).toBe('');
  });

  it('should toggle isSDLAsURL when handleSDLChange is called', async () => {
    mockWatch.mockReturnValue('');

    const { result } = renderHook(() =>
      useSDLAsURL({ watch: mockWatch, setValue: mockSetValue }),
    );

    await act(() => result.current.handleSDLChange());
    expect(result.current.isSDLAsURL).toBe(false);
  });

  it('should update sdl value when URLValue changes and isSDLAsURL is true', async () => {
    const { result } = renderHook(() =>
      useSDLAsURL({ watch: mockWatch, setValue: mockSetValue }),
    );
    expect(result.current.isSDLAsURL).toBeTruthy();
    act(() => result.current.handleSDLChange());
    expect(mockSetValue).toHaveBeenCalled();
  });
});
