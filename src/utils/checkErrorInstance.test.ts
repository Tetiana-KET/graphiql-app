import { FirebaseError } from 'firebase/app';
import { enqueueSnackbar } from 'notistack';
import { describe, expect, it, vi } from 'vitest';
import { checkErrorInstance } from './checkErrorInstance';

vi.mock('notistack', () => ({
  enqueueSnackbar: vi.fn(),
}));

describe('checkErrorInstance util', () => {
  it('should show "User not found" error for auth/user-not-found', () => {
    const error = new FirebaseError('auth/user-not-found', 'User not found');

    checkErrorInstance(error);

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'User with the specified email address is not found',
      { variant: 'error' },
    );
  });

  it('should show "Invalid credential" error for auth/invalid-credential', () => {
    const error = new FirebaseError(
      'auth/invalid-credential',
      'Invalid credential',
    );

    checkErrorInstance(error);

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'User with the specified credential is not found',
      { variant: 'error' },
    );
  });

  it('should handle "Wrong password" error for auth/wrong-password', () => {
    const error = new FirebaseError('auth/wrong-password', 'Wrong password');

    checkErrorInstance(error);

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'Wrong password. Please try again.',
      { variant: 'error' },
    );
  });

  it('should handle non-FirebaseError instance', () => {
    const error = new Error('Generic error');

    checkErrorInstance(error);

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'An error occurred: "Generic error"',
      { variant: 'error' },
    );
  });

  it('should handle unknown error', () => {
    checkErrorInstance('unknown error');

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'An unexpected error occurred!',
      { variant: 'error' },
    );
  });
});
