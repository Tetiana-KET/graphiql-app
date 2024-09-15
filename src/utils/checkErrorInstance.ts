import { FirebaseError } from 'firebase/app';
import { enqueueSnackbar } from 'notistack';

export function checkErrorInstance(err: unknown) {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/user-not-found':
        enqueueSnackbar('User with the specified email address is not found', {
          variant: 'error',
        });
        break;
      case 'auth/invalid-credential':
        enqueueSnackbar('User with the specified credential is not found', {
          variant: 'error',
        });
        break;
      case 'auth/wrong-password':
        enqueueSnackbar('Wrong password. Please try again.', {
          variant: 'error',
        });
        break;
      case 'auth/email-already-in-use':
        enqueueSnackbar(
          'The email address is already in use by another user.',
          { variant: 'error' },
        );
        break;
      case 'auth/invalid-email':
        enqueueSnackbar('The email address is not formatted correctly.', {
          variant: 'error',
        });
        break;
      case 'auth/weak-password':
        enqueueSnackbar('The password is too weak.', { variant: 'warning' });
        break;
      default:
        enqueueSnackbar(`An error occurred: "${err.message}"`, {
          variant: 'error',
        });
    }
  } else if (err instanceof Error) {
    enqueueSnackbar(`An error occurred: "${err.message}"`, {
      variant: 'error',
    });
  } else {
    enqueueSnackbar(`An unexpected error occurred!`, {
      variant: 'error',
    });
  }
}
