'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, signInWithGoogle } from '@/firebase';
import { useHandleSignIn } from '@/hooks/useHandleSignIn';
import { Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './page.module.scss';

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, errors, isValid } =
    useHandleSignIn(t);

  useEffect(() => {
    if (user) {
      redirect('/');
    }

    if (error) {
      // TODO: some error notification
      console.error(error);
    }
  }, [user, error]);

  if (loading) {
    return <Spinner color="secondary" />;
  }

  return (
    <div className={styles.login}>
      <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginTextBoxWrap}>
          <input
            type="text"
            className={styles.loginTextBox}
            {...register('email')}
            placeholder={t('auth:mail')}
          />
          <p className={styles.validationError}>
            {errors.email && errors.email.message}
          </p>

          <input
            type="password"
            className={styles.loginTextBox}
            {...register('password')}
            placeholder={t('auth:pass')}
          />

          <p className={styles.validationError}>
            {errors.password && errors.password.message}
          </p>
        </div>

        <button type="submit" className={styles.loginBtn} disabled={!isValid}>
          {t('layout:signIn')}
        </button>
        <button
          type="button"
          className={`${styles.loginGoogle} ${styles.loginBtn}`}
          onClick={signInWithGoogle}
        >
          {t('layout:signIn')} {t('common:withGoogle')}
        </button>
        <div>
          {t('auth:noAcc')}{' '}
          <Link href="/signUp" className="font-black hover:underline">
            {t('layout:signUp')}
          </Link>
        </div>
      </form>
    </div>
  );
}
